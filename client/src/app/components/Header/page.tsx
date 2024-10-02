'use client';

import React, { useState } from 'react';
import styles from "./page.module.css";
import Link from 'next/link';

import { FaSearch } from "react-icons/fa";

import Search from './components/Search/page';

import '../../../interfaces/gloabl.interface';

const Page = () => {

    const [searchResults, setSearchResults] = useState<courseObject[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchVisible, setSearchVisible] = useState<boolean>(false);

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

    const handleClick = () => {
        setSearchVisible(!searchVisible);
    }

    return (
        <header className={styles.header}>
            <div className={styles.header__inner}>
                <Link href="/">LOGO</Link>
                <div className={styles.search_icon} onClick={handleClick}>
                    <FaSearch />
                </div>
                <div className={styles.search}>
                    <div className={styles.search_bar__wrapper}>
                        <input type="text" placeholder="Search for a course..." value={searchQuery} onChange={handleChange} className={styles.search_bar} />
                    </div>
                    {
                        searchQuery.length > 0  && searchResults.length > 0 ? (
                            <div className={styles.search_results}>
                                <ul>
                                    {
                                        searchResults.map((result : courseObject) => (
                                            <li>{result.title}</li>
                                        ))
                                    }
                                </ul>
                            </div>) :
                            searchQuery.length > 0 && searchResults.length === 0 ? (
                                <div className={styles.search_results}>
                                    <p className={styles.empty_results}>No results found</p>
                                </div>
                            ) : (
                                null

                        )
                    }
                </div>
                <div className={styles.buttons}>
                    <button className={styles.login_button}><Link href="/login" >Log In</Link></button>
                    <button className={styles.signup_button}><Link href="/signup">Sign Up</Link></button>
                </div>
            </div>

            {
                searchVisible ? (
                    <div className={styles.search__mobile}>
                        <Search setSearchVisible={setSearchVisible} />
                    </div>
                ) : null
            }
        </header>
    )
}

export default Page;