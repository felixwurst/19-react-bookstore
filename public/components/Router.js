import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// redux
import { connect } from 'react-redux'
import { setUserAction } from '../actions'
// services
import { checkLoginPost } from '../services/api'
// components
import NavigationBar from './NavigationBar'
import Footer from './Footer'
import Page404 from './Page404'
import CheckLogin from './CheckLogin'

import Home from './Home'
import Shop from './Shop'
import Book from './Book'
import About from './About'
import FAQ from './FAQ'
import Login from './Login'
import Register from './Register'

import Admin from './Admin'
import AddBook from './AddBook'
import MyBooks from './MyBooks'
import MyBook from './MyBook'

class Router extends React.Component {
    componentDidMount() {
        checkLoginPost().then(data => {
            // 10 user is logged out
            if (data !== 10) {
                this.props.setUserAction(data)
            }
        })
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/shop" exact component={Shop} />
                        <Route path="/book/:title/:id" exact component={Book} />
                        <Route path="/about" exact component={About} />
                        <Route path="/faq" exact component={FAQ} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/admin" exact component={() => <CheckLogin><Admin /></CheckLogin>} />
                        <Route path="/admin/addbook" exact component={() => <CheckLogin><AddBook /></CheckLogin>} />
                        <Route path="/admin/mybooks" exact component={() => <CheckLogin><MyBooks /></CheckLogin>} />
                        <Route path="/admin/mybook/:id" exact component={() => <CheckLogin><MyBook /></CheckLogin>} />
                        <Route path="/" component={Page404} />
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}
export default connect(null, { setUserAction })(Router)
