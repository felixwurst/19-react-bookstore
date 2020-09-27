import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
// components
import Breadcrumb from './Breadcrumb'
import ConfirmModal from './ConfirmModal'
// services
import { getMyBooksPost, deleteBookPost } from '../services/api'

const MyBooks = () => {

    const history = useHistory()

    const initialState = {
        books: [],
        confirmModalShow: false,
        confirmModalContent: null,
        confirmModalPayload: null
    }
    const [state, setState] = useState(initialState)

    // run at initial render
    useEffect(() => {
        getMyBooksPost().then(data => {
            // console.log(data);
            switch (data) {
                case 2:
                    console.log('server error');
                    break;
                case 10:
                    history.push('/login')
                    break;
                default:
                    setState({ ...state, books: data })
                    break;
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const onDeleteBtnClick = bookID => {
        // console.log(bookID)
        setState({
            ...state,
            confirmModalShow: true,
            confirmModalContent: <p>Are you sure you want to delete this book?</p>,
            confirmModalPayload: bookID
        })
    }

    const confirmDeletion = bookID => {
        // console.log(bookID);
        deleteBookPost(bookID).then(data => {
            switch (data) {
                case 2:
                    console.log('server error');
                    break;
                case 10:
                    history.push('/login')
                    break;
                default:
                    const newBooks = [...state.books]
                    newBooks.splice(newBooks.indexOf(newBooks.find(book => book._id === bookID)), 1)
                    setState({
                        ...state,
                        books: newBooks,
                        confirmModalShow: false
                    })
                    break;
            }
        }).catch(err => {
            console.log(err);
        })
    }

    if (state.books) {
        const myBooksElement = state.books.map(book => {
            return (
                <div key={book._id} className="col-md-3">
                    <div className="item">
                        <Link to={"/admin/mybook/" + book._id}>
                            <img className="bookImage" src={book.images[0]} alt="bookImage" />
                        </Link>
                        <h3>
                            <Link to={"/admin/mybook/" + book._id}>{book.title}</Link>
                        </h3>
                        <h6>
                            <Link to={"/admin/mybook/" + book._id}>Edit</Link>
                            &nbsp;&nbsp;
                            <Link
                                to="#"
                                onClick={() => onDeleteBtnClick(book._id)}
                            >Delete</Link>
                            {/* <button
                                className="btn btn-danger"
                                onClick={() => onDeleteBtnClick(book._id)}
                            >Delete
                            </button> */}
                        </h6>
                    </div>
                </div>
            )
        })
        return (
            <React.Fragment>
                <ConfirmModal
                    className="bg-danger"
                    title="Confirm Deletion"
                    payload={state.confirmModalPayload}
                    show={state.confirmModalShow}
                    delete={confirmDeletion}
                    close={() => setState({ ...state, confirmModalShow: false })}
                >{state.confirmModalContent}
                </ConfirmModal>
                <Breadcrumb returnRoute="admin" currentRoute="MyBooks" />
                <section className="static about-sec">
                    <div className="container">
                        <h2>Books I've recently added to the store</h2>
                        <div className="recent-book-sec">
                            <div className="row">
                                {myBooksElement}
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment >
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default MyBooks