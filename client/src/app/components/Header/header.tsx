'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from "./page.module.css";
import Link from 'next/link';

import { FaSearch } from "react-icons/fa";
import { useUser } from '@/app/context/user.context';
import axios from 'axios';

import Search from './components/Search/search';
import { showErrorToast, showSuccessToast } from '../showToast/showToast';

import { truncateString } from '@/app/utils/truncate';

interface courseObject {
    _id: string;
    title: string;
    description: string;
    instructor: string;
    schedule: string;
};

interface newCourseObject {
    title: string;
    description: string;
    schedule: string;
}

const Header = () => {

    const [searchResults, setSearchResults] = useState<courseObject[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    const [searchVisibleMobile, setSearchVisibleMobile] = useState<boolean>(false);
    const [showCoursePopup, setShowCoursePopup] = useState<boolean>(false);
    const [newCourse, setNewCourse] = useState<newCourseObject>({
        title: '',
        description: '',
        schedule: ''
    });
    const {user, loading, setCourseCreated} = useUser();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 0) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/courses/search?title=${encodeURIComponent(e.target.value)}`);
                setSearchResults(response.data);
                setSearchVisible(true);
            } catch {}
        } else {
            setSearchResults([]);
            setSearchVisible(false);
        }
    }

    const handleClick = () => {
        setSearchVisibleMobile(!searchVisibleMobile);
    }

    const {title, description, schedule} = newCourse;

    const handleClickCourse = () => {
        setShowCoursePopup(true);
    }

    const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
    }

    const handleCancelCourse = () => {
        setShowCoursePopup(false);
    }

    const handleCourseSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/courses`, {
                    ...newCourse,
                    instructor: `${user?.firstName} ${user?.lastName}`
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                showSuccessToast("Course created successfully!");

                setNewCourse({
                    title: '',
                    description: '',
                    schedule: ''
                });

                setShowCoursePopup(false);
                setCourseCreated(true);
            } else {
                showErrorToast("Unauthorized");
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                showErrorToast(err.response.data.message);
            } else {
                showErrorToast('An unexpected error occurred.');
            }
        }
    }

    const handleLogout = async () => {
        const token = localStorage.getItem('accessToken');
      
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/auth/logout`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.removeItem('accessToken');

          showSuccessToast("Logged out successfully!");

          window.location.href = '/login'; 
        } catch {}
      };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showCoursePopup && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showCoursePopup]);

    const searchRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        }, []);
    

    if (loading) return null;   

    return (
        <header className={styles.header}>
            <div className={styles.header__inner}>
                <Link href="/">LOGO</Link>
                <div className={styles.search_icon} onClick={handleClick}>
                    <FaSearch />
                </div>
                <div ref={searchRef} className={styles.search}>
                    <div className={styles.search_bar__wrapper}>
                        <input type="text" placeholder="Search for a course..." value={searchQuery} onChange={handleChange} className={styles.search_bar} onFocus={() => setSearchVisible(true)} />
                    </div>
                    {
                        searchVisible && searchQuery.length > 0  && searchResults.length > 0 ? (
                            <div className={styles.search_results}>
                                <ul>
                                    {
                                        searchResults.map((result : courseObject, index: number) => (
                                            <div key={index} className={styles.result_course}>
                                                <Link href={`/course/${result._id}`}>
                                                    <h3>{truncateString(result?.title)}</h3>
                                                    <p>by: {truncateString(result?.instructor)}</p>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </ul>
                            </div>) :
                            searchVisible && searchQuery.length > 0 && searchResults.length === 0 ? (
                                <div className={styles.search_results}>
                                    <p className={styles.empty_results}>No results found</p>
                                </div>
                            ) : (
                                null

                        )
                    }
                </div>

                {
                    user ? (
                        <div className={styles.user_details}>
                            <button onClick={handleClickCourse} className={styles.add_course_btn}>Add course</button>
                            <button onClick={handleLogout} className={styles.signout_btn}>Sign Out</button>
                        </div>
                        ) : (
                        <div className={styles.buttons}>
                            <button className={styles.login_button}><Link href="/login" >Log In</Link></button>
                            <button className={styles.signup_button}><Link href="/signup">Sign Up</Link></button>
                        </div>
                )}
            </div>

            {
                searchVisibleMobile ? (
                    <div className={styles.search__mobile}>
                        <Search setSearchVisible={setSearchVisibleMobile} />
                    </div>
                ) : null
            }

            {
                showCoursePopup && (
                    <div className={styles.create_course_form}>
                        <form className={styles.create_course_form__inner} onSubmit={handleCourseSubmit} action="#">
                            <h2 className={styles.new_course}>New course</h2>
                            <div className={styles.course_title}>
                                <label htmlFor='title'>Title</label>
                                <input ref={inputRef} type="text" name="title" value={title} onChange={handleCourseChange} />
                            </div>
                            <div className={styles.course_description}>
                                <label htmlFor='description'>Description</label>
                                <input type="text" name="description" value={description} onChange={handleCourseChange} />
                            </div>
                            <div className={styles.course_schedule}>
                                <label htmlFor='schedule'>Schedule</label>
                                <input type="text" name="schedule" value={schedule} onChange={handleCourseChange} />
                            </div>
                            <div className={styles.new_course_btns}>
                                <button onClick={handleCancelCourse} className={styles.cancel_course_btn}>Cancel</button>
                                <button type="submit" className={styles.create_course_btn}>Create</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </header>
    )
}

export default Header;