import styles from "./page.module.css";

import Link from 'next/link';

interface courseObject {
    _id: string;
    title: string;
    description: string;
    instructor: string;
    schedule: string;
};

interface CourseProps {
    course: courseObject;
}


const Course: React.FC<CourseProps> = ({course}) => {
    return (
        <div className={styles.course}>
            <Link href={`/course/${course._id}`}>
                <h1>{course.title}</h1>
                <p>{course.description}</p>
                <div className={styles.details}>
                <div className={styles.instructor}>
                    <h5>Instructor:</h5>
                    <p>{course.instructor}</p>
                </div>
                <div className={styles.schedule}>
                    <h5>Schedule:</h5>
                    <p>{course.schedule}</p>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default Course;