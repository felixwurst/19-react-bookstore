import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
// components
import PopUpModal from './PopUpModal'
import Breadcrumb from './Breadcrumb'
// services
import { loginPost } from '../services/api'
// redux
import { connect } from "react-redux"
import { setUserAction } from '../actions'

const Login = (props) => {
    const history = useHistory()

    const initialState = {
        email: '',
        password: '',
        showErrorModal: false,
        errorModalContent: null,
        badgeContent: null
    }
    const [myState, setMyState] = useState(initialState)

    // run at initial render and sets user to null
    useEffect(() => {
        props.setUserAction(null)
    }, [])

    const onLoginBtnClick = e => {
        e.preventDefault()
        // console.log(myState)
        if (!myState.email.trim() || !myState.password) {
            const errorModalList = (
                <ul>
                    {!myState.email.trim() ? <li>Please enter an email</li> : null}
                    {!myState.password ? <li>Please enter a password</li> : null}
                </ul>
            )
            setMyState({
                ...myState,
                showErrorModal: true,
                errorModalContent: errorModalList
            })
        }
        else {
            loginPost(myState.email, myState.password).then(data => {
                // console.log(data)
                // 1 login successful
                // 2 server error
                // 3 email is wrong
                // 4 password is wrong
                switch (data) {
                    case 1:
                        props.setUserAction(myState.email)
                        // redirect to admin panel
                        history.push('/admin')
                        // console.log(history);
                        break;
                    case 2:
                        setMyState({
                            ...myState,
                            badgeContent: <div className='alert alert-danger' role="alert">Server error, please contact the admin!</div>
                        })
                        break;
                    case 3:
                        setMyState({
                            ...myState,
                            badgeContent: <div className='alert alert-danger' role="alert">Your email is wrong, please try again!</div>
                        })
                        break;
                    case 4:
                        setMyState({
                            ...myState,
                            badgeContent: <div className='alert alert-danger' role="alert">Your password is wrong, please try again!</div>
                        })
                        break;
                    default:
                        break;
                }
            }).catch(err => {
                console.log(err)
                setMyState({
                    ...myState,
                    badgeContent: <div className="alert alert-danger" role="alert">Can not send the registration data to server</div>
                })
            })
        }
    }
    return (
        <React.Fragment>
            <PopUpModal
                className="bg-danger"
                title="Error"
                show={myState.showErrorModal}
                close={() => setMyState({ ...myState, showErrorModal: false })}
            >{myState.errorModalContent}
            </PopUpModal>
            <Breadcrumb returnRoute="home" currentRoute="Login" />
            <section className="static about-sec">
                <div className="container">
                    <h1>My Account / Login</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est placeat ducimus vel autem culpa veritatis. Rem, culpa voluptas dolore quam, eos saepe, harum repudiandae tempore doloribus iusto sapiente maiores nemo.Illo magnam asperiores debitis quas laborum repudiandae cumque suscipit.</p>
                    <div className="form">
                        <form>
                            <div className="row">
                                {/* badge */}
                                <div className="col-lg-12 col-md-12">
                                    {myState.badgeContent}
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        required
                                        onChange={e => setMyState({ ...myState, email: e.target.value })}
                                        value={myState.email}
                                    />
                                    <span className="required-star">*</span>
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="password"
                                        placeholder="Enter Your Password"
                                        required
                                        onChange={e => setMyState({ ...myState, password: e.target.value })}
                                        value={myState.password}
                                    />
                                    <span className="required-star">*</span>
                                </div>
                                <div className="col-lg-8 col-md-12">
                                    <button
                                        className="btn black"
                                        onClick={onLoginBtnClick}
                                    >Login
                                    </button>
                                    <h5>Not Registered? <Link to="/register">Register Here</Link></h5>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
// connects setUserAction to Login function
export default connect(null, { setUserAction })(Login)
