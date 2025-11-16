import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { list } from '../components/Sort';
import Pagination from '../scss/components/Pagination';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router-dom';

const Home = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortType);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    const query = [
      `page=${currentPage}`,
      `limit=4`,
      categoryId > 0 ? `category=${categoryId}` : '',
      `sortBy=${sortType.sortProperty.replace('-', '')}`,
      `order=${sortType.sortProperty.includes('-') ? 'desc' : 'asc'}`,
      search ? `search=${search}` : '',
    ]
      .filter(Boolean)
      .join('&');

    axios.get(`https://69079cd1b1879c890eda4721.mockapi.io/items?${query}`).then((res) => {
      setItems(res.data);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, search, currentPage]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortType: sortType.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType, search, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
