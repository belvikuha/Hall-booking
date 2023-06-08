import React, {useState,useEffect, useMemo} from 'react';
import './radio.scss'
const RadioBtnContainer = ({children, name, selectedOption, setSelectedOption}) => {


    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const childrenWithProps = React.Children.map(children, (child) => {
        return React.cloneElement(child, {
            name: name,
            onChange:handleOptionChange,
            selectedOption: selectedOption
        });
      });
    return(
        <div class="container">
            <div class="tabs">
                {childrenWithProps}
                <span class="glider"></span>
            </div>
        </div>
    )
};

export default RadioBtnContainer;