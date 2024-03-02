import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectIsLoading,
  selectError,
  loadProductCategories,
} from './homeSlice';
import { Link } from 'react-router-dom';
import './home.css';
import { quantum } from 'ldrs';
quantum.register();

export function Home() {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    dispatch(loadProductCategories());
  }, [dispatch]);

  if (isLoading) {
    return (
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
    );
  }

  if (error) {
    console.error('Error %d: ' + error.message, error.status);
  }

  return (
    <main className='categories'>
      <Link
        className='category-tile'
        to={`/products`}
      >
        <img
          src={`http://${serverUrl}/assets/images/categories/all_products.jpg`}
          alt='all products'
        />
        <h4>all products</h4>
      </Link>
      {categories.map((category) => {
        return (
          <Link
            className='category-tile'
            key={category.id}
            to={`/products?category_id=${category.id}`}
          >
            <img
              src={`http://${serverUrl}/assets/images/categories/${category.name}.jpg`}
              alt={category.name}
            />
            <h4>{category.name}</h4>
          </Link>
        );
      })}
    </main>
  );
}
