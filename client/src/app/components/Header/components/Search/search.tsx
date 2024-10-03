'use client';

import React, { useState } from "react";

import styles from "./page.module.css";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

import '../../../../../interfaces/gloabl.interface';
import { truncateString } from "@/app/utils/truncate";
import Link from "next/link";

const Search: React.FC<SearchProps> = ({ setSearchVisible }) => {
    const [searchResults, setSearchResults] = useState<courseObject[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 0) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/courses/search?title=${encodeURIComponent(e.target.value)}`);
                setSearchResults(response.data);
                setSearchVisible(true);
            } catch (err) {}
        } else {
            setSearchResults([]);
            setSearchVisible(false);
        }
    }

    return (
        <div className={styles.search__mobile}>
            <div className={styles.search_bar__wrapper}>
                <input type="text" placeholder="Search for a course..." className={styles.search__mobile__input} value={searchQuery} onChange={handleChange} />
                <IoMdClose className={styles.search__mobile__close} onClick={() => setSearchVisible(false)} />
            </div>
            {
                searchQuery.length > 0 && searchResults.length > 0 ? (
                    <div className={styles.search_results}>
                        {
                            searchResults.map((result: courseObject) => (
                                <div className={styles.result_course}>
                                    <Link href={`/course/${result._id}`}>
                                        <h3>{truncateString(result?.title)}</h3>
                                        <p>by: {truncateString(result?.instructor)}</p>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>) :
                    searchQuery.length > 0 && searchResults.length === 0 ? (
                        <div className={styles.search_results}>
                            <p className={styles.empty_results}>No results found</p>
                        </div>) : null
            }
        </div>
    );
}

export default Search;