import React from 'react'
import Breadcrumb from './Breadcrumb'

const FAQ = () => {
    return (
        <React.Fragment>
            <Breadcrumb returnRoute="home" currentRoute="FAQ" />
            <section className="static about-sec">
                <div className="container">
                    <h1>FAQ</h1>
                    <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and scrambled it to make a type specimen book. It has survived not only fiveLorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's printer took a galley of type and scrambled it to make a type specimen book. It has survived not only fiveLorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </section>
        </React.Fragment>
    )
}

export default FAQ
