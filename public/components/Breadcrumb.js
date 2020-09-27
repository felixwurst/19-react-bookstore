// import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

// export default class Breadcrumb extends Component {
//     data = this.props.returnRoute
//     switch () {
//         case value:

//             break;

//         default:
//             break;
//     }
//     if (condition) {

//     }
//     render() {
//         return (
//             <div className="breadcrumb">
//                 <div className="container">
//                     {this.props.returnRoute = "home" ?
//                         <Link to="/" className="breadcrumb-item">Home</Link>
//                         : <Link to="/admin" className="breadcrumb-item">Admin</Link>}
//                     <span className="breadcrumb-item active">{this.props.currentRoute}</span>
//                 </div>
//             </div>
//         )
//     }
// }

import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumb = (props) => {
    let returnPath = null
    switch (props.returnRoute) {
        case "home":
            returnPath = <Link to="/" className="breadcrumb-item">Home</Link>
            break;
        case "admin":
            returnPath = <Link to="/admin" className="breadcrumb-item">Admin</Link>
            break;
        case "shop":
            returnPath = <Link to="/shop" className="breadcrumb-item">Shop</Link>
            break;
        case "mybooks":
            returnPath = <Link to="/admin/mybooks" className="breadcrumb-item">MyBooks</Link>
            break;
    }
    return (
        <div className="breadcrumb">
            <div className="container">
                {returnPath}
                <span className="breadcrumb-item active">{props.currentRoute}</span>
            </div>
        </div>
    )
}

export default Breadcrumb

