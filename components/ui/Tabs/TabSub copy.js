import { useEffect, useState } from 'react';
import {useHistory, useLocation} from 'react-router-dom'



import {slugify} from '../../utils/slugify';

const TabSub = ({ children, initialTab  }) => {


  const [activeTab, setActiveTab] = useState(children[0].props.label);


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
    console.log('the initial tab is: ', initialTab)
    if (initialTab) {
      setActiveTab(initialTab);
      console.log(("initialTab", initialTab));
    }
  }, []);

  useEffect(() => {
   // router.push(`${router.pathname}?tab=${slugify(activeTab)}`, undefined, {shallow: true})
    const query = new URLSearchParams()
    query.set('tab', slugify(activeTab))
    history.push({search: query.toString()})
    console.log("Active tab", activeTab)
   
  }, [activeTab])

 /*  console.log("pathname", pathname) */

    return (
        <div className="mt-4">
            {/* Tabs */}

            {/* <ul className="">
              {children.map((tab) => {
                const label = tab.props.label;
                return (
                  <li
                    className={label == activeTab ? "bg-primary text-gray-800 px-3 py-2 font-medium text-sm rounded-md" : "text-gray-800 px-3 py-2 font-medium text-sm rounded-md"}
                    key={label}
                  >
                    <a href="#" onClick={(e) => handleClick(e, label)}>
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul> */}

            <div className=" bg-light py-4 rounded-lg mx-4">
                <div className="px-4">
                  <nav className=" -mb-px flex space-x-8 ">
                    {children.map((tab) => {
                      const label = tab.props.label;
                      return (
                      <div 
                        className={slugify(label) === activeTab ? "bg-primary text-gray-800 px-3 py-2 font-medium text-sm rounded-md" : "text-gray-800 px-3 py-2 font-medium text-sm rounded-md"}
                        key={label}
                      >
                        <a href="#" onClick={e => handleClick(e, label.toLowerCase().split(' ').join('-'))}>{label}</a>
                      </div>
                      )
                    })}
                  </nav>
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

export default TabSub