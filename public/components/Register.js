import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
// components
import PopUpModal from './PopUpModal'
import Breadcrumb from './Breadcrumb'
// services
import { registerPost } from '../services/api'
// modules
import validator from 'validator'

export default class Register extends Component {
    state = {
        email: '',
        password: '',
        repassword: '',
        showErrorModal: false,
        errorModalContent: null,
        badgeContent: null
    }
    onRegisterBtnClick = e => {
        e.preventDefault()
        console.log(this.state)
        if (
            !this.state.email.trim() ||
            !this.state.password ||
            this.state.password !== this.state.repassword ||
            !validator.isEmail(this.state.email.trim())
        ) {
            const errorModalList = (
                <ul>
                    {!this.state.email.trim() ? <li>Please enter an email</li> : null}
                    {!validator.isEmail(this.state.email.trim()) ? <li>Please enter a valid email</li> : null}
                    {!this.state.password ? <li>Please enter a password</li> : null}
                    {this.state.password !== this.state.repassword ? <li>Passwords do not match</li> : null}
                </ul>
            )
            this.setState({
                errorModalContent: errorModalList,
                showErrorModal: true
            })
        } else {
            registerPost(this.state.email, this.state.password, this.state.repassword).then(data => {
                // console.log(data)
                let badgeClass = ''
                let badgeMessage = ''
                // 1 registration successful
                // 2 inputs not filled or passwords not the same
                // 3 user already exists
                // 4 server error
                switch (data) {
                    case 1:
                        badgeClass = 'alert alert-success'
                        badgeMessage = 'You registered successfully, you can login now!'
                        break;
                    case 2:
                    case 4:
                        badgeClass = 'alert alert-danger'
                        badgeMessage = 'Server error, please contact the admin!'
                        break;
                    case 3:
                        badgeClass = 'alert alert-danger'
                        badgeMessage = 'There is already a user with this email, please choose another one!'
                        break;
                    default:
                        break;
                }
                const badgeDiv = (
                    <div className={badgeClass} role="alert">
                        {badgeMessage}
                    </div>
                )
                this.setState({ badgeContent: badgeDiv })
            }).catch(err => {
                console.log(err)
                const badgeDiv = (
                    <div className="alert alert-danger" role="alert">
                        Can not send the registration data to the server
                    </div>
                )
                this.setState({ badgeContent: badgeDiv })
            })
        }
    }
    render() {
        return (
            <Fragment>
                <PopUpModal
                    className="bg-danger"
                    title="Error"
                    show={this.state.showErrorModal}
                    close={() => this.setState({ showErrorModal: false })}
                >{this.state.errorModalContent}
                </PopUpModal>
                <Breadcrumb returnRoute="home" currentRoute="Register" />
                <section className="static about-sec">
                    <div className="container">
                        <h1>My Account / Register</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and scrambled it to make a type specimen book. It has survived not only fiveLorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <div className="form">
                            <form>
                                <div className="row">
                                    {/* badge */}
                                    <div className="col-lg-12 col-md-12">
                                        {this.state.badgeContent}
                                    </div>
                                    {/* email-input */}
                                    <div className="col-md-4">
                                        <input
                                            type="email"
                                            placeholder="Enter Your Email"
                                            required
                                            onChange={e => this.setState({ email: e.target.value })}
                                            value={this.state.email}
                                        />
                                        <span className="required-star">*</span>
                                    </div>
                                    {/* password-input */}
                                    <div className="col-md-4">
                                        <input
                                            type="password"
                                            placeholder="Enter Your Password"
                                            required
                                            onChange={e => this.setState({ password: e.target.value })}
                                            value={this.state.password}
                                        />
                                        <span className="required-star">*</span>
                                    </div>
                                    {/* repassword-input */}
                                    <div className="col-md-4">
                                        <input
                                            type="password"
                                            placeholder="Repeat Your Password"
                                            required
                                            onChange={e => this.setState({ repassword: e.target.value })}
                                            value={this.state.repassword}
                                        />
                                        <span className="required-star">*</span>
                                    </div>
                                    {/* register-button */}
                                    <div className="col-lg-8 col-md-12">
                                        <button
                                            className="btn black"
                                            onClick={this.onRegisterBtnClick}
                                        >Register
                                        </button>
                                        <h5>Already Registered? <Link to="/login">Login here</Link></h5>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}
