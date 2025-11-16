import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { FaSearch } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const Search = ({ search, setSearch }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef();

  const onClickClear = () => {
    setSearch('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearch(str);
    }, 1000),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.search}>
      <FaSearch className="search - icon" color="grey" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Search pizzas..."
      />
      {value && (
        <FaTimes size={20} color="grey" className={styles.iconClose} onClick={onClickClear} />
      )}
    </div>
  );
};

export default Search;
