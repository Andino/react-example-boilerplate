import React from 'react';
import './comiccards.css'
import unknown from './../../assets/unknown.png'
const ComicsCard = ({comics: {title, thumbnail}}) =>{
    return (
        <div className="flex flex-col content-center justify-center m-4 shadow-sm hover:text-red-600 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110">
            <div className="w-40 h-64 bg-cover" style={{backgroundImage: `url(${thumbnail.path}.${thumbnail.extension})`}}>
            </div>
            <div className="w-40 text-xl truncate text-center text-class mt-2">{title}</div>
        </div>
    )
};

export default ComicsCard;

