import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'
import { connect } from "react-redux"
import { logoutPost } from '../services/api'

class NavigationBar extends React.Component {

    state = {
        isOpen: false
    }

    logoutBtnClick = e => {
        e.preventDefault()
        logoutPost().then(data => {
            if (data === 10) {
                this.props.history.push('/login')
            }
        }).catch(err => {
            console.log(err);
        })
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        // console.log(this.props.location);
        // console.log(this.props)
        return (
            <header>
                <div className="main-menu">
                    <div className="container">
                        <Navbar color="light" light expand="lg">
                            <NavbarBrand tag={Link} to="/">
                                <img src="/images/logo.png" alt="logo" />
                            </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem className="navbar-item" active={this.props.location.pathname === '/'}>
                                        <NavLink tag={Link} to="/">Home</NavLink>
                                    </NavItem>
                                    <NavItem className="navbar-item" active={this.props.location.pathname === '/shop'}>
                                        <NavLink tag={Link} to="/shop">Shop</NavLink>
                                    </NavItem>
                                    <NavItem className="navbar-item" active={this.props.location.pathname === '/about'}>
                                        <NavLink tag={Link} to="/about">About</NavLink>
                                    </NavItem>
                                    <NavItem className="navbar-item" active={this.props.location.pathname === '/faq'}>
                                        <NavLink tag={Link} to="/faq">FAQ</NavLink>
                                    </NavItem>
                                    {/* <NavItem className="navbar-item" active={this.props.location.pathname === '/register'}>
                                        <NavLink tag={Link} to="/register">Register</NavLink>
                                    </NavItem> */}
                                    {/* <NavItem className="navbar-item" active={this.props.location.pathname === '/admin'}>
                                        <NavLink tag={Link} to="/admin">Admin</NavLink>
                                    </NavItem> */}
                                    {this.props.user ?
                                        <React.Fragment>
                                            <NavItem className="navbar-item" active={this.props.location.pathname === '/admin'}>
                                                <NavLink tag={Link} to="/admin">Admin</NavLink>
                                            </NavItem>
                                            <NavItem className="navbar-item">
                                                <NavLink href="#" onClick={this.logoutBtnClick}>Logout</NavLink>
                                            </NavItem>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <NavItem className="navbar-item" active={this.props.location.pathname === '/register'}>
                                                <NavLink tag={Link} to="/register">Register</NavLink>
                                            </NavItem>
                                            <NavItem className="navbar-item" active={this.props.location.pathname === '/login'}>
                                                <NavLink tag={Link} to="/login">Login</NavLink>
                                            </NavItem>
                                        </React.Fragment>
                                    }
                                </Nav>
                                <div className="cart my-2 my-lg-0">
                                    <span>
                                        <i className="fa fa-shopping-cart" aria-hidden="true" />
                                    </span>
                                    {/* <span className="quntity">3</span> */}
                                </div>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search here..." aria-label="Search" />
                                    <span className="fa fa-search"></span>
                                </form>
                            </Collapse>
                        </Navbar>
                    </div>
                </div>
            </header>
        )
    }
}
const mapStateToProps = state => {
    return ({ user: state.user })
}
export default connect(mapStateToProps)(withRouter(NavigationBar))
