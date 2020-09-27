import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// components
import Breadcrumb from './Breadcrumb'
// services
import { getBooksPost } from '../services/api'

const Shop = () => {

    const history = useHistory()

    const initialState = {
        books: []
    }
    const [state, setState] = useState(initialState)

    // run at initial render
    useEffect(() => {
        getBooksPost().then(data => {
            // console.log(data)
            // 2 error
            if (data != 2) {
                setState({ ...state, books: data })
            }
        })
    }, [])

    const booksElement = state.books.map(book => {
        return (
            <div key={book._id} className="col-md-3">
                <div className="item">
                    <Link to={'/book/' + book.title.trim().replace(/ /g, '_') + '/' + book._id}>
                        <img className="bookimage" src={book.images[0]} alt="img" />
                    </Link>
                    <h3>
                        <Link to={'/book/' + book.title.trim().replace(/ /g, '_') + '/' + book._id}>
                            {book.title}
                        </Link>
                    </h3>
                    <h6>
                        <Link to={'/book/' + book.title.trim().replace(/ /g, '_') + '/' + book._id}>
                            Download
                        </Link>
                    </h6>
                </div>
            </div>
        )
    })

    return (
        <React.Fragment>
            <Breadcrumb returnRoute="home" currentRoute="Shop" />
            <section className="static about-sec">
                <div className="container">
                    <h2>recently added books to our store</h2>
                    <div className="recent-book-sec">
                        <div className="row">
                            {booksElement}
                        </div>
                        {/* <div className="btn-sec">
                            <button className="btn gray-btn">load more books</button>
                        </div> */}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Shop
