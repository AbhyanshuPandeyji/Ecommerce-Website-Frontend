import React from 'react'
import Helmet from 'react-helmet'



const MetaData = ({title}) => {

    return (
        // This will create the page title to the component we pass 
        <Helmet>
            <title>{title}</title>
        </Helmet>

        )
}

export default MetaData
