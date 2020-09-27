import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
// service
import { getBookPost } from '../services/api'
// component
import Breadcrumb from './Breadcrumb'

const Book = () => {
    const params = useParams()
    // console.log(params)

    const initialState = {
        book: null
    }
    const [state, setState] = useState(initialState)

    // run at initial render
    useEffect(() => {
        getBookPost(params.id).then(data => {
            // console.log(data);
            setState({ ...state, book: data })
        })
    }, [])

    if (state.book) {
        const imageSet = state.book.images.map(image => {
            return ({
                original: image,
                thumbnail: image
            })
        })
        return (
            <React.Fragment>
                <Breadcrumb returnRoute="shop" currentRoute={state.book.title} />
                <section className="product-sec">
                    <div className="container">
                        <h1>{state.book.title}</h1>
                        <div className="row">
                            <div className="col-md-6 slider-sec">
                                <ImageGallery
                                    items={imageSet}
                                    thumbnailPosition="right"
                                    showFullscreenButton={false}
                                    showPlayButton={false}
                                    showNav={false}
                                />
                            </div>
                            <div className="col-md-6 slider-content">
                                {state.book.description}
                                <div className="btn-sec">
                                    {state.book.pdf ?
                                        <a href={state.book.pdf} target="_blank" className="btn btn-success">Download</a>
                                        : <Link to="/login" className="btn btn-success">Login for Download</Link>
                                    }
                                </div>
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

export default Book