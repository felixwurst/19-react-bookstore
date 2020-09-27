import React from 'react'
import { useLocation, useHistory, Link } from 'react-router-dom'
// redux
import { connect } from "react-redux"
// components
import Breadcrumb from './Breadcrumb'

const Admin = (props) => {
    // const location = useLocation()
    // const history = useHistory()
    // console.log('location', location)
    // console.log('history', history)
    // if (!location.state) {
    //     history.push('/login')
    // }
    return (
        <React.Fragment>
            <Breadcrumb returnRoute="home" currentRoute="Admin" />
            <section className="static about-sec">
                <div className="container">
                    <h1>Welcome {props.user}</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est placeat ducimus vel autem culpa veritatis. Rem, culpa voluptas dolore quam, eos saepe, harum repudiandae tempore doloribus iusto sapiente maiores nemo.Illo magnam asperiores debitis quas laborum repudiandae cumque suscipit.</p>
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/admin/addbook">Add Book</Link>
                            <br />
                            <Link to="/admin/mybooks">My Books</Link>
                            {/* <br />
                            <Link to="/admin/logout">Logout</Link> */}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
const mapStateToProps = state => {
    return ({ user: state.user })
}
export default connect(mapStateToProps)(Admin)