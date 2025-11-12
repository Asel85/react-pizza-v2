import React from 'react';
import styles from './Search.module.scss';
import { FaSearch } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const Search = ({ search, setSearch }) => {
  return (
    <div className={styles.search}>
      <FaSearch className="search - icon" color="grey" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.input}
        type="text"
        placeholder="Search pizzas..."
      />
      {search && (
        <FaTimes
          size={20}
          color="grey"
          className={styles.iconClose}
          onClick={() => {
            setSearch('');
          }}
        />
      )}
    </div>
  );
};

export default Search;
