import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, setCurrentPage }) => {
  const totalPages = 3;

  function handlePageChange(page) {
    setCurrentPage(page);
  }
  return (
    <>
      <ResponsivePagination
        total={totalPages}
        current={currentPage}
        onPageChange={(page) => handlePageChange(page)}
        className={styles.pagination}
      />
    </>
  );
};

export default Pagination;
