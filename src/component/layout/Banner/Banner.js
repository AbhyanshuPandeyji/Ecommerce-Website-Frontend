import React from 'react'
import './Banner.css'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div>
    {/* this is the banner section in the page */}
    <section id="banner" className=".section-m1">
        <h4> Repair Services</h4>
        <h2> Up to <span>70% </span> off - All t-shirts & Accessories </h2>
        <Link  to="/products" className="btns"> Explore More </Link>
    </section>
    </div>
  )
}

export default Banner;
