import React from 'react';
import {useState} from 'react';

const AccordionContainer = () => {

    const [selected, setSelected] = useState(null);

    const toggle = i => {
        if (selected === i) {
            return setSelected(null)
        }
    
        setSelected(i)
      }


    return (
        <div 
            className="pt-4 -pb-4 px-8"
            onClick={() => toggle(i)}
        >
            <h5 className="flex justify-between content-center cursor-pointer" >
            
                <div className="top-0">{selected == i ? '-' : '+'}</div>  
            </h5>
            <div className={selected === i ? "h-auto pb-10 transition-all duration-500 ease-in-out" : "overflow-hidden max-h-0 transition-all duration-500 ease-in-out"}>
                
            <a href="#" onClick={e => handleClick(e, label.toLowerCase().split(' ').join('-'))}>
                <div 
                    className="bg-primary text-gray-800 px-3 py-2 font-medium text-sm rounded-md" 
                >
                    Filters
                </div>
                </a>

            </div>
        </div>
    )
}

export default AccordionContainer