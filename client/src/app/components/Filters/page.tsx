'use client';

import React, { useState } from "react";
import styles from "./page.module.css";

import { IoMdClose } from "react-icons/io";

const page = ({isFiltersOpen, setIsFiltersOpen}) => {

    const [filters, setFilters] = useState({
        instructor: '',
        course: ''
    });

    const { instructor, course } = filters;

    const handleClick = () => {
        setIsFiltersOpen(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(filters);
    }

    return (
        <div className={`${styles.filters} ${isFiltersOpen ? styles.expand : ''}`}>
            <div className={styles.header}>
                <h3>Filter By</h3>
                <IoMdClose className={styles.close_icon} onClick={handleClick} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className={styles.filter}>
                    <h5>Instructor name</h5>
                    <input type="text" placeholder="Search instructor" value={instructor} name="instructor" onChange={handleChange} />
                </div>
                <div className={styles.filter}>
                    <h5>Course name</h5>
                    <input type="text" placeholder="Search course" value={course} name="course" onChange={handleChange} />
                </div>
                
                <button type="submit" className={styles.apply_btn}>Apply</button>
            </form>
        </div>
    )
}

export default page;