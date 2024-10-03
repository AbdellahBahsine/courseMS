'use client';

import React, { useState } from "react";
import styles from "./page.module.css";

import { IoMdClose } from "react-icons/io";

import '../../../interfaces/gloabl.interface';

const Filters: React.FC<FilterProps> = ({isFiltersOpen, setIsFiltersOpen, filters, setFilters, setFiltersApplied}) => {

    const [clearTitle, setClearTitle] = useState<boolean>(false);
    const [clearInstructor, setClearInstructor] = useState<boolean>(false);

    const handleClick = () => {
        setIsFiltersOpen(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0) {
            if (e.target.name === 'title')
                setClearTitle(true);
            else if (e.target.name === 'instructor')
                setClearInstructor(true);
        } else {
            if (e.target.name === 'title')
                setClearTitle(false);
            else if (e.target.name === 'instructor')
                setClearInstructor(false);
        }
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });

    }

    const handleClearInput = (name: string) => {
        setFilters({
            ...filters,
            [name]: ''
        });
        if (name === 'title')
            setClearTitle(false);
        else if (name === 'instructor')
            setClearInstructor(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFiltersApplied(true);
    }

    return (
        <div className={`${styles.filters} ${isFiltersOpen ? styles.expand : ''}`}>
            <div className={styles.header}>
                <h3>Filter By</h3>
                <IoMdClose className={styles.close_icon} onClick={handleClick} />
            </div>
            <form onSubmit={handleSubmit} action="#">
                <div className={styles.filter}>
                    <h5>Instructor name</h5>
                    <div className={styles.filter_inner}>
                        <input type="text" placeholder="Search instructor" value={filters.instructor || ''} name="instructor" onChange={handleChange} />
                        {clearInstructor && <IoMdClose className={styles.clear_input} name="instructor" onClick={() => handleClearInput("instructor")} />}
                    </div>
                </div>
                <div className={styles.filter}>
                    <h5>Course name</h5>
                    <div className={styles.filter_inner}>
                        <input type="text" placeholder="Search course" value={filters.title || ''} name="title" onChange={handleChange} />
                        {clearTitle && <IoMdClose className={styles.clear_input} onClick={() => handleClearInput("title")} />}
                    </div>
                </div>
                
                <button type="submit" className={styles.apply_btn}>Apply</button>
            </form>
        </div>
    )
}

export default Filters;