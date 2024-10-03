'use client';

import {useState, useEffect} from 'react';
import styles from "./course.module.css";

import axios from 'axios';
import { useParams } from 'next/navigation';

interface courseObject {
    _id: string;
    title: string;
    description: string;
    instructor: string;
    schedule: string;
};

const Course = () => {

    const [course, setCourse] = useState<courseObject | null>(null);
    const params = useParams<{ id: string }>()

    const fetchCourse = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/courses/${params.id}`)

            setCourse(response.data);
        } catch {
            setCourse(null);
        }
    }

    useEffect(() => {
        fetchCourse();
    }, [params]);

    return (
        <div className={styles.course}>
            {
                course && <div className={styles.course_inner}>
                    <h1 className={styles.title}>{course?.title}</h1>
                    <p className={styles.instructor}>by {course?.instructor}</p>
                    <p className={styles.description}>{course?.description}</p>
                    <p className={styles.lorem}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dui enim, semper in mollis sed, molestie ac justo. Suspendisse nisi massa, maximus id molestie aliquet, venenatis at neque. Pellentesque sit amet ex sollicitudin, venenatis magna eu, condimentum ex. Nullam convallis iaculis fringilla. Maecenas scelerisque metus nec nulla fringilla luctus. Sed nunc ante, ornare sit amet hendrerit id, laoreet ac quam. Ut volutpat viverra elementum. Aenean fermentum quis velit non vestibulum. Phasellus ac vestibulum lorem, vel ullamcorper lorem. Nam sollicitudin enim enim, eu posuere purus sodales commodo. Aliquam a neque vel velit lobortis cursus. Nulla facilisi.
                    <br/><br/> 
                        Sed ac facilisis orci. Suspendisse non ipsum quis purus cursus vehicula cursus eget nisi. Cras a posuere dolor, eu facilisis massa. Aliquam volutpat non mauris ut bibendum. Vestibulum accumsan, nibh vel tincidunt pretium, leo libero malesuada eros, id consequat nulla quam vitae quam. Etiam tincidunt metus eget magna egestas consequat. Ut at scelerisque tellus, vitae mollis leo. Morbi sit amet mi felis.
                        <br/><br/> 
                        Sed ac facilisis orci. Suspendisse non ipsum quis purus cursus vehicula cursus eget nisi. Cras a posuere dolor, eu facilisis massa. Aliquam volutpat non mauris ut bibendum. Vestibulum accumsan, nibh vel tincidunt pretium, leo libero malesuada eros, id consequat nulla quam vitae quam. Etiam tincidunt metus eget magna egestas consequat. Ut at scelerisque tellus, vitae mollis leo. Morbi sit amet mi felis.
                    </p>
                </div>
            }
        </div>
    )
}

export default Course;