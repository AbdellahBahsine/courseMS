'use client';

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

import Masonry from 'react-masonry-css';
import axios from 'axios';

import Course from './components/Course/page';
import Filters from './components/Filters/page';
import withAuth from './components/WithAuth/WithAuth';

function Home() {

    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const fetchCourses = async (page: number) => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/courses`, {
          params: { page, limit },
        });
        setCourses(data.courses);
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const breakpointColumnsObj = {
      default: 4,
      1100: 3,
      700: 2,
      500: 1
    };

    const handleClick = () => {
      setIsFiltersOpen(true);
    }

    useEffect(() => {
      fetchCourses(page);
    }, [page]);

    const totalPages = Math.ceil(total / limit);

  return (
    <div className={styles.home}>

      <div className={styles.header}>
        <h2>Courses</h2>
        <button className={styles.filters_btn} onClick={handleClick}>All Filters</button>
      </div>
      <div className={`${styles.home__inner} ${isFiltersOpen ? styles.shrink : ''}`}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.courses}
          columnClassName={styles.my_masonry_grid_column}
        >
          {
            courses.map((course, index) => (
              <Course key={index} course={course} />
            ))
          }
        </Masonry>
        <div className={styles.pagination}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
      </div>
        <Filters isFiltersOpen={isFiltersOpen} setIsFiltersOpen={setIsFiltersOpen} />
      </div>

    </div>
  );
}

export default withAuth(Home);;