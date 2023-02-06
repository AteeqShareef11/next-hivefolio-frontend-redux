import { InstantSearch, SearchBox } from 'react-instantsearch-dom';

const HeaderSearch = () => {
    return (
        <header>
            <SearchBox 
                translations={{placeholder: 'Search for Movies'}}
            />
        </header>
    )
}

export default HeaderSearch