import { useState } from 'react'

const Accordion = () => {

    const [selected, setSelected] = useState(null);

    const toggle = i => {
        if (selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }

    return (
        <div className="flex h-screen max-width justify-center items-center">
            <div className="w-full">
                {data.map((item, i) => (
                    <div 
                        className="mb-4 bg-yellow-200 pt-8 px-8"
                        onClick={() => toggle(i)}
                    >
                        <h3 className="flex justify-between content-center cursor-pointer">
                            {item.question}
                            <div className="top-0">{selected == i ? '-' : '+'}</div>  
                        </h3>
                        <div className={selected === i ? "h-auto pb-10 transition-all duration-500 ease-in-out" : "overflow-hidden max-h-0 transition-all duration-500 ease-in-out"}
                        >{item.answer}</div>
                    </div>
                ) )}
            </div>
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

export default Accordion