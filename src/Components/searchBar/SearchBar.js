import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export function SearchBar({
  filter,
  setFilter,
  search,
  setSearch,
  filterVisible,
  setFilterVisible,
  handleSubmit,
}) {
  function handleFilterChange(e) {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <form
      className='search-form'
      onSubmit={handleSubmit}
    >
      <fieldset className='search-bar'>
        <input
          id='search'
          name='search'
          type='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search...'
          spellCheck='false'
        />
        <button
          className='filter-button'
          type='button'
          onClick={() => setFilterVisible((prev) => !prev)}
          aria-label='Filter'
        >
          <FontAwesomeIcon icon={faFilter} />
        </button>
        <button
          className='search-button'
          data-testid='search-button'
          type='submit'
          aria-label='Search'
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </fieldset>
      {filterVisible && (
        <fieldset className='price-filter'>
          <div>
            <label htmlFor='price-greater-than'>Price Greater Than: </label>
            <span className='price-selector'>
              $
              <input
                id='price-greater-than'
                name='price_greater_than'
                type='number'
                onChange={handleFilterChange}
                value={filter.price_greater_than}
              />
            </span>
          </div>
          <div>
            <label htmlFor='price-less-than'>Price Less Than: </label>
            <span className='price-selector'>
              $
              <input
                id='price-less-than'
                name='price_less_than'
                type='number'
                onChange={handleFilterChange}
                value={filter.price_less_than}
              />
            </span>
          </div>
        </fieldset>
      )}
    </form>
  );
}
