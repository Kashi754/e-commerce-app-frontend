import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserInfo } from '../userInfo/UserInfo';
import { SearchBar } from '../searchBar/SearchBar';
import './header.css';

export function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  function handleSearch(event, searchQuery) {
      event.preventDefault();
      // navigate({
      //     pathname: route,
      //     search: `?${createSearchParams(params)}`
      // });
      setSearch('');
  }

  return (
    <header className="header">
      <Link className="logo-container" to={''}>
          <img className='logo' src='/images/shopping-logo.png' alt='e-commerce-app logo' />
      </Link>
      <SearchBar search={search} setSearch={setSearch} handleSubmit={handleSearch} />
      <UserInfo />
    </header>
  );
}