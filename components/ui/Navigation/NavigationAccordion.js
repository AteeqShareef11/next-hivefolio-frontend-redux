import { useEffect, useState } from 'react';
import {useHistory, useLocation, Link} from 'react-router-dom'

/* Design */
import {IoAdd} from 'react-icons/io5';
import {IoRemove} from 'react-icons/io5';

import {slugify} from '../../utils/slugify';




const NavigationAccordion = ({id, header, link_01, link_02, link_03, link_04, link_05, link_06, link_07, link_08, link_01_title, link_02_title, link_03_title, link_04_title, link_05_title, link_06_title, link_07_title, link_08_title, style_01, style_02, style_03, style_04, style_05, style_06, style_07, style_08}) => {

  const [selected, setSelected] = useState(null);

  const toggle = i => {
      if (selected === i) {
          return setSelected(null)
      }

      setSelected(i)
  }

  const data = [
    {}
  ]

    return (
    
    <div className="mt-8 sticky top-0 z-40">
    {/* Mobile */}
    
    <div className="flex justify-center items-center bg-light py-2 mb-4 rounded-lg xs:block sm:block md:block lg:hidden xl:hidden">
      <div className="w-full">
      {data.slice(0,1).map((item, i) => (

            <div className="pt-4 -pb-4 px-8"
            onClick={() => toggle(i)}
            >
                <h5 className="flex justify-between content-center cursor-pointer" >
                {header} 
                <div className="top-0">{selected === i ? '-' : '+'}</div>
                </h5>
                <div className={selected === i ? "h-auto transition-all duration-500 ease-in-out" : "overflow-hidden max-h-0 transition-all duration-500 ease-in-out"}>
                  
                  {link_01_title && (
                    <Link to={link_01} >
                      <div className={`${style_01} px-3 py-4 mb-4 font-medium text-sm rounded-md`}>
                        {link_01_title}
                      </div>
                    </Link>
                  )}

                  {link_02_title && (
                    <Link to={link_02} >
                      <div className={`${style_02} px-3 py-4 mb-4 font-medium text-sm rounded-md`}>
                        {link_02_title}
                      </div>
                    </Link>
                  )}

                  {link_03_title && (
                    <Link to={link_03} >
                      <div className={`${style_03} px-3 py-4 mb-4 font-medium text-sm rounded-md`}>
                        {link_03_title}
                      </div>
                    </Link>
                  )}

                  {link_04_title && (
                    <Link to={link_04} >
                      <div className={`${style_04} px-3 py-4 mb-4 font-medium text-sm rounded-md`}>
                        {link_04_title}
                      </div>
                    </Link>
                  )}
                 
                 {link_05_title && (
                  <Link to={link_05} >
                    <div className={`${style_05} px-3 py-4 mb-4 font-medium text-sm rounded-md`}>
                      {link_05_title}
                    </div>
                  </Link>
                  )}

                  {link_06_title && (
                    <Link to={link_06} >
                      <div className={`${style_06} px-3 py-4 mb-4 font-medium text-sm rounded-md`}>
                        {link_06_title}
                      </div>
                    </Link>
                  )}

                  {link_07_title && (
                    <Link to={link_07} >
                      <div className={`${style_07} px-3 py-4 mb-4 font-medium text-sm rounded-md`}>
                        {link_07_title}
                      </div>
                    </Link>
                  )}

                  {link_08_title && (
                    <Link to={link_08} >
                      <div className={`${style_08} px-3 py-4 mb-4 font-medium text-sm rounded-md`}>
                        {link_08_title}
                      </div>
                    </Link>
                  )}


                </div>
            </div>
       ) )}
      </div>
    </div>

            
                    
    {/* Desktop */}
    <div className=" bg-light py-4 rounded-lg xs:hidden sm:hidden md:hidden lg:block xl:block mb-4">
      <div className="px-4">
        <nav className=" -mb-px flex space-x-4 ">

          {link_01_title && (
            <Link to={link_01} >
              <div className={`${style_01} px-3 py-4 font-medium text-sm rounded-md`}>
                {link_01_title}
              </div>
            </Link>
          )}

          {link_02_title && (
            <Link to={link_02} >
              <div className={`${style_02} px-3 py-4 font-medium text-sm rounded-md`}>
                {link_02_title}
              </div>
            </Link>
          )}

          {link_03_title && (
            <Link to={link_03} >
              <div className={`${style_03} px-3 py-4 font-medium text-sm rounded-md`}>
                {link_03_title}
              </div>
            </Link>
          )}

          {link_04_title && (
            <Link to={link_04} >
              <div className={`${style_04} px-3 py-4 font-medium text-sm rounded-md`}>
                {link_04_title}
              </div>
            </Link>
          )}
          
          {link_05_title && (
          <Link to={link_05} >
            <div className={`${style_05} px-3 py-4 font-medium text-sm rounded-md`}>
              {link_05_title}
            </div>
          </Link>
          )}

          {link_06_title && (
            <Link to={link_06} >
              <div className={`${style_06} px-3 py-4 font-medium text-sm rounded-md`}>
                {link_06_title}
              </div>
            </Link>
          )}

          {link_07_title && (
            <Link to={link_07} >
              <div className={`${style_07} px-3 py-4 font-medium text-sm rounded-md`}>
                {link_07_title}
              </div>
            </Link>
          )}

          {link_08_title && (
            <Link to={link_08} >
              <div className={`${style_08} px-3 py-4 font-medium text-sm rounded-md`}>
                {link_08_title}
              </div>
            </Link>
          )}

        </nav>
      </div>
    </div>

    </div>
    )
}




export default NavigationAccordion;