import React from 'react'
import './Feature.css'

const Feature = () => {
    return (
        <div> {/* <!-- part for the features that are provided by the company --> */}
            <section id="feature" className="section-p1">
                <div className="fe-box">
                    <img src="images/logocss.png" alt="feature"/>
                    <h6>free shipping</h6>
                </div>
                <div className="fe-box">
                    <img src="images/logocss.png" alt="feature"/>
                    <h6>Online Order</h6>
                </div>
                <div className="fe-box">
                    <img src="images/logocss.png" alt="feature"/>
                    <h6>Save Money</h6>
                </div>
                <div className="fe-box">
                    <img src="images/logocss.png" alt="feature"/>
                    <h6>Promotions</h6>
                </div>
                <div className="fe-box">
                    <img src="images/logocss.png" alt="feature"/>
                    <h6>Happy sell</h6>
                </div>
                <div className="fe-box">
                    <img src="images/logocss.png" alt="feature"/>
                    <h6>24/7 Support</h6>
                </div>
            </section>
        </div>
    )
}

export default Feature;
