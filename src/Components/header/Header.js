import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SearchBar } from '../searchBar/SearchBar';
import { UserInfo } from '../userInfo/UserInfo';
import './header.css';

export function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState({
    price_less_than: '',
    price_greater_than: '',
  });

  function handleSearch(event) {
    event.preventDefault();
    if (search) {
      if (searchParams.has('search')) {
        searchParams.set('search', search);
      } else {
        searchParams.append('search', search);
      }
    }
    for (const key in filter) {
      if (filter[key]) {
        if (searchParams.has(key)) {
          searchParams.set(key, filter[key]);
        } else {
          searchParams.append(key, filter[key]);
        }
      }
    }

    navigate({
      pathname: '/products',
      search: `?${searchParams}`,
    });
    setSearch('');
  }

  return (
    <header className='header'>
      <Link
        className='logo-container'
        to={''}
      >
        <img
          className='logo'
          src={`/images/shopping-logo.png`}
          alt='e-commerce-app logo'
        />
      </Link>
      <SearchBar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        handleSubmit={handleSearch}
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
      />
      <UserInfo />
    </header>
  );
}
