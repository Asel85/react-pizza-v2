import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../scss/components/Pagination';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = ({ search }) => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  console.log(
    'Redux state:',
    useSelector((state) => state),
  );
  console.log('sortType:', sortType);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const searchValue = search ? `&search=${search}` : '';
    fetch(
      `https://69079cd1b1879c890eda4721.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`,
    ).then((res) =>
      res.json().then((data) => {
        setItems(data);
        setIsLoading(false);
      }),
    );
    window.scrollTo(0, 0);
  }, [categoryId, sortType, search, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {items.map((pizza) => {
          return isLoading ? (
            <Skeleton />
          ) : (
            <PizzaBlock
              key={pizza.id}
              title={pizza.title}
              price={pizza.price}
              imageUrl={pizza.imageUrl}
              sizes={pizza.sizes}
              types={pizza.types}
            />
          );
        })}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
