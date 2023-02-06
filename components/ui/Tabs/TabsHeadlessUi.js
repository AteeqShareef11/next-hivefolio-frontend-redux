import { useState } from 'react'
import { Tab } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const TabsHeadlessUi = ({tab1, tab1title, tab2, tab2title, tab3, tab3title}) => {

  return (
    <div className="">
      <Tab.Group>
      <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
        {tab1 && 
        <Tab
          className={({ selected }) =>
            classNames(
              'w-full py-2.5 text-sm leading-5 font-medium text-dark rounded-lg',
              //'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-primary shadow'
                : 'text-dark bg-light hover:bg-primary hover:text-dark'
            )
          }
        >
          {tab1title}
        </Tab>
        }
        {tab2 &&
        <Tab
          className={({ selected }) =>
          classNames(
            'w-full py-2.5 text-sm leading-5 font-medium text-dark rounded-lg',
            //'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
            selected
              ? 'bg-primary shadow'
              : 'text-dark bg-light hover:bg-primary hover:text-dark'
          )
          }
        >
          {tab2title}
        </Tab>
        }
        {tab3 &&
        <Tab
          className={({ selected }) =>
          classNames(
            'w-full py-2.5 text-sm leading-5 font-medium text-dark rounded-lg',
            //'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
            selected
              ? 'bg-primary shadow'
              : 'text-dark bg-light hover:bg-primary hover:text-dark'
          )
          }
        >
          {tab3title}
        </Tab>
      }
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel
          className={classNames(
            'bg-white rounded-xl p-3',
            //'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}
        >
          {tab1}
        </Tab.Panel>
        <Tab.Panel
          className={classNames(
            'bg-white rounded-xl p-3',
            //'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}
        >
          {tab2}
        </Tab.Panel>
        <Tab.Panel
          className={classNames(
            'bg-white rounded-xl p-3',
            //'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}
        >
          {tab3}
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
    </div>
  )
}

export default TabsHeadlessUi