import React from 'react'
import '../Loader/Loader.css'

export default function Loading()  {
    return (
        <div>
            <div className="loading">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>    
            </div>
            <h2 className="loading-title">Cargando tus GIFS</h2>
        </div>
    )
}