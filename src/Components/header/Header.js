import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { UserInfo } from '../userInfo/UserInfo';
import { SearchBar } from '../searchBar/SearchBar';
import './header.css';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState({
    price_less_than: "",
    price_greater_than: ""
  });

  function handleSearch(event) {
    event.preventDefault();
    console.log(searchParams);
    if(search) {
      if(searchParams.has('search')) {
        searchParams.set('search', search);
      } else {
        searchParams.append('search', search);
      }
    }
    console.log(filter);
    for(const key in filter) {
      if(filter[key]) {
        if(searchParams.has(key)) {
          console.log(key, filter[key]);
          searchParams.set(key, filter[key]);
        } else {
          console.log(key, filter[key]);
          searchParams.append(key, filter[key]);
        }
      }
    }

    navigate({
        pathname: '/products',
        search: `?${searchParams}`
    });
    setSearch('');
  }

  return (
    <header className="header">
      <Link className="logo-container" to={''}>
          <img className='logo' src={`/images/shopping-logo.png`} alt='e-commerce-app logo' />
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