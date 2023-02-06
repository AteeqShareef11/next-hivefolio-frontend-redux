import { useEffect, useState } from 'react';
import {useHistory, useLocation} from 'react-router-dom'

import {slugify} from '../../utils/slugify';

const TabSubTest = ({ children, initialTab  }) => {


  const [activeTab, setActiveTab] = useState(children[0].props.label);
  const [selected, setSelected] = useState(null);

  const history = useHistory();
  const location = useLocation();


  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    console.log('the new Active Tab is: ', newActiveTab)
    setActiveTab(slugify(newActiveTab));
    const params = new URLSearchParams(location.search)
    params.set('tab', newActiveTab)
    history.push({search: params.toString()})
  }

  useEffect(() => {
    console.log('the initial tab is: ', activeTab)
    if (activeTab) {
      setActiveTab(slugify(activeTab));
      const params = new URLSearchParams(location.search)
      params.set('tab', activeTab)
      history.push({search: params.toString()})
      console.log(("first activeTab+", activeTab));
    }
  }, []);

  useEffect(() => {
   // router.push(`${router.pathname}?tab=${slugify(activeTab)}`, undefined, {shallow: true})
    const query = new URLSearchParams()
    query.set('tab', slugify(activeTab))
    history.push({search: query.toString()})
    console.log("Active tab", activeTab)
   
  }, [activeTab])


  const toggle = i => {
    if (selected === i) {
        return setSelected(null)
    }

    setSelected(i)
  }

    return (
        <div className="mt-4">
            {/* Mobile */}

            {/* <div className='border-solid border-white border-t-8 border-b-8 sticky top-0 z-40 xs:block sm:block md:block lg:hidden xl:hidden'>
              <div className="flex justify-center items-center bg-dark rounded-lg mx-4 ">
                <div className="w-full">
                    {children.slice(0,1).map((tab, i) => {
                      const label = tab.props.label;
                      return (
                      <div 
                          className="pt-4 -pb-4 px-8"
                          onClick={() => toggle(i)}
                      >
                          <h5 className="flex justify-between content-center cursor-pointer text-light" >
                          Menu: {activeTab}
                              <div className="top-0">{selected == i ? '-' : '+'}</div>  
                          </h5>
                          <div className={selected === i ? "h-auto pb-10 transition-all duration-500 ease-in-out" : "overflow-hidden max-h-0 transition-all duration-500 ease-in-out"}>
                            
                            {children.map((tab) => {
                              const label = tab.props.label;
                              return (
                                <a href="#" onClick={e => handleClick(e, label.toLowerCase().split(' ').join('-'))}>
                              <div 
                                className={slugify(label) === activeTab ? "bg-primary text-dark px-3 py-2 mb-2 font-medium text-sm rounded-md" : "text-light px-3 py-2 mb-2 font-medium text-sm rounded-md hover:bg-primary hover:text-dark"}
                                key={label}
                              >
                                {label}
                              </div>
                              </a>
                              )
                            })}

                          </div>
                      </div>
                    ) })}
                </div>
              </div>
            </div> */}



            {/* Desktop */}
            <div className='border-solid border-white border-t-8 border-b-8 sticky top-0 z-40 xs:block sm:block md:block lg:block xl:block'>
              <div className=" bg-dark py-4 rounded-lg mx-4 ">
                  <div className="px-4">
                    <nav className=" -mb-px flex space-x-8 ">
                      {children.map((tab) => {
                        const label = tab.props.label;
                        return (
                          <a href="#" onClick={e => handleClick(e, label.toLowerCase().split(' ').join('-'))}>
                            <div 
                              className={slugify(label) === activeTab ? "bg-primary text-gray-800 px-3 py-2 font-medium text-sm rounded-md" : "text-light px-3 py-2 font-medium text-sm rounded-md hover:bg-primary hover:text-dark"}
                              key={label}
                            >
                              {label}
                            </div>
                        </a>
                        )
                      })}
                    </nav>
                  </div>
              </div>
            </div>

            {/* Content space */}

            {children.map((one) => {
              if (slugify(one.props.label) == activeTab)
                return (
                  <div key={one.props.label} className="">
                    {one.props.children}
                  </div>
                );
            })}
  
        </div>
    )
}


const data = [
  {
      question: "Question 1",
      answer: "Answer 1"
  },
  {
      question: "Question 2",
      answer: "Answer 2"
  },
  {
      question: "Question 3",
      answer: "Answer 3"
  },
]

export default TabSubTest