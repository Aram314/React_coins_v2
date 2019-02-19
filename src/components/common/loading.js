import React from 'react'
import './loading.css'

const Loading = (props) => {
    const {width, height} = props;
    return (
        <div className="Loading" style={{width, height}}></div>
    )
};

export default Loading