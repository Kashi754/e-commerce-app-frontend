import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export function SearchBar(props) {

    function handleFilterChange(e) {
        props.setFilter(prev => ({...prev, [e.target.name]: e.target.value}));
    }
    
    return (
        <form className='search-form' onSubmit={props.handleSubmit}>
            <fieldset className='search-bar'>
                <input 
                    id='search'
                    name='search'
                    type='search'
                    value={props.search}
                    onChange={e => props.setSearch(e.target.value)}
                    placeholder='Search...'
                    spellCheck='false'
                />
                <button className='search-button' data-testid='search-button' type='submit'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <button 
                    className="filter-button" 
                    type="button" 
                    onClick={() => props.setFilterVisible(prev => !prev)}
                >
                    Filter
                </button>
            </fieldset>
            {
                props.filterVisible &&
                <fieldset className='price-filter'>
                    <div>
                        <label htmlFor="price-greater-than">Price Greater Than: </label>
                        <span className="price-selector">
                            $
                            <input 
                                id="price-greater-than"
                                name="price_greater_than" 
                                type="number" 
                                onChange={handleFilterChange}
                                value={props.filter.price_greater_than}
                            />
                        </span>
                    </div>
                    <div>
                        <label htmlFor="price-greater-than">Price Less Than: </label>
                        <span className="price-selector">
                            $
                            <input 
                                id="price-less-than"
                                name="price_less_than" 
                                type="number" 
                                onChange={handleFilterChange}
                                value={props.filter.price_less_than}
                            />
                        </span>
                    </div>
                </fieldset>
            }
        </form>
    );
}