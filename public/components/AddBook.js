import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
// components
import Breadcrumb from './Breadcrumb'
import PopUpModal from './PopUpModal'
// services
import { addBookPost } from '../services/api'

const AddBook = () => {
    const history = useHistory()

    const initialState = {
        title: '',
        details: '',
        showModal: false,
        modalTitle: '',
        modalContent: null,
        badgeContent: null,
        modalClass: 'bg-danger'
    }
    const [state, setState] = useState(initialState)

    const imagesInpRef = useRef()
    const pdfInpRef = useRef()

    const onSaveBtnClick = e => {
        e.preventDefault()
        // console.log(state);
        if (!state.title.trim() || !imagesInpRef.current.files.length || !pdfInpRef.current.files.length || !state.details.trim()) {
            const modalList = (
                <ul>
                    {!state.title.trim() ? <li>Please enter a title</li> : null}
                    {!imagesInpRef.current.files.length ? <li>Please choose some images</li> : null}
                    {!pdfInpRef.current.files.length ? <li>Please choose a pdf</li> : null}
                    {!state.details.trim() ? <li>Please enter some details</li> : null}
                </ul>
            )
            setState({
                ...state,
                showModal: true,
                modalClass: 'bg-danger',
                modalTitle: 'Entry Error',
                modalContent: modalList
            })
        } else {
            addBookPost(
                state.title.trim(),
                imagesInpRef.current.files,
                pdfInpRef.current.files[0],
                state.details.trim()
            ).then(data => {
                // console.log(data)
                // 1 book is saved(images, pdf & json)
                // 2 not all inputs are filled
                // 3 booktitle already exists
                // 4 server side error
                switch (data) {
                    case 1:
                        setState({
                            ...state,
                            showModal: true,
                            modalClass: 'bg-success',
                            modalTitle: 'Success',
                            modalContent: <p>Your book is saved</p>
                        })
                        break;
                    case 2:
                        setState({
                            ...state,
                            showModal: true,
                            modalClass: 'bg-danger',
                            modalTitle: 'Entry Error',
                            modalContent: <p>Problems with entries</p>
                        })
                        break;
                    case 3:
                        setState({
                            ...state,
                            showModal: true,
                            modalClass: 'bg-danger',
                            modalTitle: 'Title Error',
                            modalContent: <p>The booktitle already exists</p>
                        })
                        break;
                    case 4:
                        setState({
                            ...state,
                            showModal: true,
                            modalClass: 'bg-danger',
                            modalTitle: 'Server Error',
                            modalContent: <p>Please contact the administrator</p>
                        })
                        break;
                    case 10:
                        history.push('/login')
                        break;
                    default:
                        break;
                }
            }).catch(err => {
                console.log(err)
                setState({
                    ...state,
                    showModal: true,
                    modalClass: 'bg-danger',
                    modalTitle: 'Sending Error',
                    modalContent: <p>Can not send data to server</p>
                })
            })
        }
    }
    return (
        <React.Fragment>
            <PopUpModal
                className={state.modalClass}
                title={state.modalTitle}
                show={state.showModal}
                close={() => setState({ ...state, showModal: false })}
            >{state.modalContent}
            </PopUpModal>
            <Breadcrumb returnRoute="admin" currentRoute="Add Book" />
            <section className="static about-sec">
                <div className="container">
                    <h1>Admin / Add book</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and scrambled it to make a type specimen book. It has survived not only fiveLorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    {/* badge */}
                    {/* <div className="col-lg-12 col-md-12">
                        {state.badgeContent}
                    </div> */}
                    <div className="form">
                        <form>
                            <div className="form-group">
                                <label htmlFor="bookTitleInp">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="bookTitleInp"
                                    placeholder="Enter title of book"
                                    onChange={e => setState({
                                        ...state,
                                        title: e.target.value
                                    })}
                                    value={state.title}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="imageUploadInp">Image Upload</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="imageUploadInp"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    multiple
                                    ref={imagesInpRef}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bookUploadInp">Book Upload</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    id="bookUploadInp"
                                    accept="application/pdf"
                                    ref={pdfInpRef}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bookDescriptionInp">Details</label>
                                <textarea
                                    className="form-control"
                                    id="bookDescriptionInp"
                                    onChange={e => setState({
                                        ...state,
                                        details: e.target.value
                                    })}
                                    value={state.details}
                                ></textarea>
                            </div>
                            <button
                                className="btn btn-primary"
                                id="saveBtn"
                                onClick={onSaveBtnClick}
                            >Save</button>
                        </form>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default AddBook