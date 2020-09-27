import React, { useEffect, useState, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
// components
import Breadcrumb from './Breadcrumb'
import PopUpModal from './PopUpModal'
// services
import { getBookPost, editBookPost } from '../services/api'

const MyBook = () => {

    const params = useParams()
    const history = useHistory()
    const pdfSpanRef = useRef()
    const pdfInputRef = useRef()
    const imgInputRef = useRef()

    const initialState = {
        book: null,
        newImageFiles: [],
        newPdfFile: null,
        showModal: false,
        modalTitle: '',
        modalClass: '',
        modalElement: null
    }
    const [state, setState] = useState(initialState)

    useEffect(() => {
        getBookPost(params.id).then(data => {
            // console.log(data);
            switch (data) {
                case 2:
                    console.log('server error');
                    break;
                case 10:
                    history.push('/login')
                    break;
                default:
                    setState({
                        ...state,
                        book: data
                    })
                    break;
            }
        })
    }, []);

    const deleteImageClick = (e, image) => {
        e.preventDefault()
        const newBook = { ...state.book }
        newBook.images.splice(newBook.images.indexOf(image), 1)
        setState({
            ...state,
            book: newBook
        })
    }

    const titleInputChange = e => {
        const newBook = { ...state.book }
        newBook.title = e.target.value
        setState({
            ...state,
            book: newBook
        })
    }

    const deletePdfClick = e => {
        e.preventDefault()
        pdfSpanRef.current.remove()
        pdfInputRef.current.disabled = false
        const newBook = { ...state.book }
        newBook.pdf = ''
        setState({
            ...state,
            book: newBook
        })
        // console.log(state);
    }

    const descriptionInputChange = e => {
        const newBook = { ...state.book }
        newBook.description = e.target.value
        setState({
            ...state,
            book: newBook
        })
    }

    const saveBtnClick = e => {
        e.preventDefault()
        let titleErrorElement = null
        if (state.book.title.trim() === '') {
            titleErrorElement = <li>Please enter a title for your book.</li>
        }
        let imagesErrorElement = null
        if (state.book.images.length === 0 && state.newImageFiles.length === 0) {
            imagesErrorElement = <li>You deleted all old images but you did not upload any new ones.</li>
        }
        let pdfErrorElement = null
        if (state.book.pdf === '' && state.newPdfFile === null) {
            pdfErrorElement = <li>You deleted the old pdf file but you did not upload a new one.</li>
        }
        let descriptionErrorElement = null
        if (state.book.description.trim() === '') {
            descriptionErrorElement = <li>Please enter a description for your book.</li>
        }
        if (titleErrorElement === null && imagesErrorElement === null && pdfErrorElement === null && descriptionErrorElement === null) {
            editBookPost(params.id, state.book.title, state.book.images, state.newImageFiles, state.newPdfFile, state.book.description).then(data => {
                switch (data) {
                    case 2:
                        setState({
                            ...state,
                            showModal: true,
                            modalClass: 'bg-danger',
                            modalTitle: 'update failed',
                            modalElement: <p>Can not update the book because of a server error.</p>
                        })
                        break;
                    case 10:
                        history.push('/login')
                        break;
                    case 100:
                        break;
                    default:
                        pdfInputRef.current.value = ''
                        imgInputRef.current.value = ''
                        setState({
                            ...state,
                            book: data,
                            showModal: true,
                            modalClass: 'bg-success',
                            modalTitle: 'update was successful',
                            modalElement: <p>The book has been successfully updated.</p>
                        })
                        break;
                }
            }).catch(err => {
                console.log(err);
            })
        } else {
            const errorElement = (
                <ul>
                    {titleErrorElement}
                    {imagesErrorElement}
                    {pdfErrorElement}
                    {descriptionErrorElement}
                </ul>
            )
            setState({
                ...state,
                showModal: true,
                modalClass: 'bg-danger',
                modalTitle: 'Entry Error',
                modalElement: errorElement
            })
        }
    }

    if (state.book) {
        const imagesElement = state.book.images.map((image, idx) => {
            return (
                <div key={idx} className="col-md-3">
                    <a
                        href="#"
                        className="deleteImg"
                        onClick={e => deleteImageClick(e, image)}
                    >X</a>
                    <img className="bookimg" src={image} alt="" />
                </div>
            )
        })
        return (
            <React.Fragment>
                <PopUpModal
                    show={state.showModal}
                    title={state.modalTitle}
                    className={state.modalClass}
                    close={() => setState({ ...state, showModal: false })}
                >{state.modalElement}
                </PopUpModal>
                <Breadcrumb returnRoute="mybooks" currentRoute={state.book.title} />
                <section className="static about-sec">
                    <div className="container">
                        <h1>My Account / Edit Book</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and scrambled it to make a type specimen book. It has survived not only fiveLorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <div className="form">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="bookTitleInp">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bookTitleInp"
                                        placeholder="Book Title"
                                        onChange={titleInputChange}
                                        value={state.book.title}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bookImgsInp">Images</label>
                                    <div className="row">
                                        {imagesElement}
                                    </div>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        multiple
                                        id="bookImgsInp"
                                        accept="image/x-png,image/gif,image/jpeg"
                                        onChange={e => setState({ ...state, newImageFiles: e.target.files })}
                                        ref={imgInputRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bookPdfInp">PDF</label>
                                    <span
                                        className="badge badge-default"
                                        ref={pdfSpanRef}
                                    >{state.book.pdf.substr(state.book.pdf.lastIndexOf('/') + 1)}
                                        <a
                                            href="#"
                                            id="deletePdf"
                                            onClick={deletePdfClick}
                                        >X</a>
                                    </span>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        id="bookPdfInp"
                                        accept="application/pdf"
                                        disabled
                                        onChange={e => setState({ ...state, newPdfFile: e.target.files[0] })}
                                        ref={pdfInputRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bookDescriptionInp">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="bookDescriptionInp"
                                        onChange={descriptionInputChange}
                                        value={state.book.description}
                                    ></textarea>
                                </div>
                                <button
                                    className="btn btn-success mt-3"
                                    onClick={saveBtnClick}
                                >save</button>
                            </form>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    } else {
        return (
            <div>Loading ....</div>
        )
    }
}

export default MyBook