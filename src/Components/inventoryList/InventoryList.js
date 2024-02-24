import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadProductsData,
  selectIsLoading,
  selectProducts,
} from '../../Pages/products/productsSlice';
import { InventoryCard } from '../inventoryCard/InventoryCard';
import './inventoryList.css';
import { SearchBar } from '../searchBar/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { quantum } from 'ldrs';
quantum.register();

export function InventoryList() {
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectIsLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState({
    price_less_than: '',
    price_greater_than: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsData('?' + searchParams.toString()));
  }, [dispatch, searchParams]);

  function handleSearch(e) {
    e.preventDefault();
    setSearchParams((prevParams) => {
      const updatedParams = prevParams;
      if (search) {
        updatedParams.set('search', search);
      } else {
        updatedParams.delete('search');
      }

      if (filter.price_less_than) {
        updatedParams.set('price_less_than', filter.price_less_than);
      } else {
        updatedParams.delete('price_less_than');
      }

      if (filter.price_greater_than) {
        updatedParams.set('price_greater_than', filter.price_greater_than);
      } else {
        updatedParams.delete('price_greater_than');
      }

      return updatedParams;
    });
  }

  return (
    <section className='inventory-list'>
      <h1>Inventory Listing</h1>
      <SearchBar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
        handleSubmit={handleSearch}
      />
      {isLoading ? (
        <div
          data-testid='loader'
          className='loader'
        >
          {
            <l-quantum
              size={300}
              speed={1}
              color='#000000'
            />
          }
        </div>
      ) : (
        products.map((product) => (
          <InventoryCard
            key={product.id + ' card'}
            product={product}
          />
        ))
      )}
    </section>
  );
}
