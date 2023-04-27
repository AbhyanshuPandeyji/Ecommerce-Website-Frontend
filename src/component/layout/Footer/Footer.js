import React from 'react'
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './Footer.css'

const Footer = () => {
    return (

        <footer id='footer'>
            <div className="leftFooter">
                <h4>Download Our App
                </h4>
                <p>Download App for Android And IOS mobile Phone</p>
                <img src={playStore}
                    alt="playStore"/>
                <img src={appStore}
                    alt="playStore"/>
            </div>
            <div className="midFooter">
                <h1>E-Commerce App</h1>
                <p>We Wish you the Very Happy Shopping</p>


                <p>Copyright 2023 &copy; Abhyanshu</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us On:</h4>
                <a href="https://instagram.com/abhyanshu">Instagram</a>
                <a href="https://facebook.com/abhyanshu">Facebook</a>
                <a href="https://youtube.com/abhyanshu">Youtube</a>
            </div>


        </footer>
    )
}

export default Footer;
