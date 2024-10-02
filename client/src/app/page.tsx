'use client';

import React, { useState } from "react";
import styles from "./page.module.css";

import Masonry from 'react-masonry-css';

import Course from './components/Course/page';
import Filters from './components/Filters/page';

function Home() {

  const [coursesList, setCoursesList] = useState([
    {
      title: "Open-architected bandwidth-monitored contingency",
      description: "Theory president share Republican soon figure. She skill his as bit raise. Bring notice every big onto institution behind listen. Character will way old.",
      instructor: "Beth Williamson",
      schedule: "Tuesday 10:00"
    },
    {
        title: "Self-enabling analyzing neural-net",
        description: "Wear people item over. Direction watch rock and.",
        instructor: "Hannah Ward",
        schedule: "Thursday 13:00"
    },
    {
      title: "Operative high-level hierarchy",
      description: "Policy certainly music strategy do up effort. Camera its down growth hundred gas.",
      instructor: "Regina Ford",
      schedule: "Wednesday 13:00"
    },
    {
        title: "Digitized systematic strategy",
        description: "Next life cover help teach generation she. Late apply town crime consumer.",
        instructor: "Michael Meyers Jr.",
        schedule: "Thursday 14:00"
    },
    {
        title: "Exclusive attitude-oriented open system",
        description: "Finally make health. Yeah huge process effort choose.",
        instructor: "Kimberly Hatfield",
        schedule: "Monday 14:00"
    },
    {
        title: "Function-based methodical access",
        description: "Possible material example night worry whole. Economy type ask. Group on little.",
        instructor: "Charles Lynn",
        schedule: "Wednesday 9:00"
    }]);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const breakpointColumnsObj = {
      default: 4,
      1100: 3,
      700: 2,
      500: 1
    };

    const handleClick = () => {
      setIsFiltersOpen(true);
    }

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
            coursesList.map((course, index) => (
              <Course key={index} course={course} />
            ))
          }
        </Masonry>
        <Filters isFiltersOpen={isFiltersOpen} setIsFiltersOpen={setIsFiltersOpen} />
      </div>

    </div>
  );
}

export default Home;