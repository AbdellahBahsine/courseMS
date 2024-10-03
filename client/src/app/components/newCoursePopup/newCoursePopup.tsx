'use client';

import React, {useState, useEffect, useRef} from 'react';
import styles from './page.module.css';
import { useUser } from '@/app/context/user.context';

import { showErrorToast, showSuccessToast } from '../showToast/showToast';

import axios from 'axios';

interface newCourseObject {
    title: string;
    description: string;
    schedule: string;
}

interface CoursePopupProps {
    showCoursePopup: boolean;
    setShowCoursePopup:(boolean : boolean) => void;
}

const NewCoursePopup: React.FC<CoursePopupProps> = ({ showCoursePopup, setShowCoursePopup }) => {

    const {user, setCourseCreated} = useUser();
    const [newCourse, setNewCourse] = useState<newCourseObject>({
        title: '',
        description: '',
        schedule: ''
    });

    const {title, description, schedule} = newCourse;

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

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showCoursePopup && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showCoursePopup]);

    return (
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

export default NewCoursePopup;