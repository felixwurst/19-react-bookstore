import React from 'react'
import Slider from './Slider'

export default class Home extends React.Component {
    render() {
        return (
            <section className="slider">
                <div className="container">
                    <Slider />
                </div>
            </section>
        )
    }
}
