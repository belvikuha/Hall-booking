import React from 'react';
import './radio.scss'

const RadioBtn = ({name,id, label,selectedOption, value, ...props}) => {
    return (
        <>
            <input type="radio" id={id} name={name} checked={selectedOption === value} value ={value} {...props} />
            <label class="tab" for={id}>{label}</label>
        </>
    );
};

export default RadioBtn;