'use client';

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

import Masonry from 'react-masonry-css';
import axios from 'axios';

import Course from './components/Course/course';
import Filters from './components/Filters/filters';
import { useUser } from "./context/user.context";

type Params = {
  page: number;
  limit: number;
  title?: string;
  instructor?: string;
};

interface filtersObject {
  title?: string;
  instructor?: string;
}

function Home() {

    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(total / limit));
    const [filters, setFilters] = useState<filtersObject>({
      title: '',
      instructor: ''
    });
    const [filtersApplied, setFiltersApplied] = useState<boolean>(false);
    const {courseCreated} = useUser();

    const {title, instructor} = filters;

    const fetchCourses = async (page: number) => {

      try {
        const params: Params = { page, limit };

        if (title) {
          params.title = title;
        }
        if (instructor) {
          params.instructor = instructor;
        }
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/courses`, {
          params,
        });

        setCourses(data.courses);
        setTotal(data.total);
        setFiltersApplied(false);
      } catch {
        setFiltersApplied(false);
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
    }, [page, courseCreated, filtersApplied]);

    useEffect(() => {
      setTotalPages(Math.ceil(total / limit));
    }, [total])

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
        <Filters isFiltersOpen={isFiltersOpen} setIsFiltersOpen={setIsFiltersOpen} filters={filters} setFilters={setFilters} setFiltersApplied={setFiltersApplied} />
      </div>

    </div>
  );
}

export default Home;