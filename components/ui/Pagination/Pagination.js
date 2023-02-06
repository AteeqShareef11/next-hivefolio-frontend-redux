
const Pagination = ({itemsPerPage, totalItems, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className="flex flew-row ">
                {pageNumbers.map(number => (
                    <li key={number} className="p-8 hover:bg-primary">
                        <a onClick={() => paginate(number)}  >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Pagination