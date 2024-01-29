import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories, selectIsLoading, selectIsError, selectError, loadProductCategories } from "./homeSlice";
import { Link } from "react-router-dom";
import './home.css';
import { quantum } from "ldrs";
quantum.register();

export function Home () {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const error = useSelector(selectError);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductCategories());
  }, [dispatch]);

  if(isLoading) {
    return (
      <div data-testid='loader' className="loader">
          {<l-quantum
              size={300}
              speed={1}
              color='#ffffff'
          />}
      </div>
    )
  }

  // if(isError) {
  //   return (
  //       <div className="error">
  //           <p role='alert'>{error}</p>
  //       </div>
  //   )
  // }

  return (
    <main className="categories">
      {categories.map(category => {
        return (
          <Link className="category-tile" key={category.id} to={`/products?category=${category.id}`}>
            <img src={`/images/categories/${category.name}.jpg`} alt={category.name}/>
            <h4>{category.name}</h4>
          </Link>
        )
      })}
    </main>
  )
}