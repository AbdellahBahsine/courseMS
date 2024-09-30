import React, { useState } from "react";

import styles from "./page.module.css";
import { IoMdClose } from "react-icons/io";

import '../../../../../interfaces/gloabl.interface';

const page = ({ setSearchVisible }) => {
    const [searchResults, setSearchResults] = useState<courseObject[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 0) {
            // fetch(`http://localhost:3000/api/search?query=${e.target.value}`)
            //     .then(res => res.json())
            //     .then(data => {
            //         setSearchResults(data);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })
        } else {
            setSearchResults([]);
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
                        <ul>
                            {
                                searchResults.map((result: courseObject) => (
                                    <li>{result.title}</li>
                                ))
                            }
                        </ul>
                    </div>) :
                    searchQuery.length > 0 && searchResults.length === 0 ? (
                        <div className={styles.search_results}>
                            <p className={styles.empty_results}>No results found</p>
                        </div>) : null
            }
        </div>
    );
}

export default page;