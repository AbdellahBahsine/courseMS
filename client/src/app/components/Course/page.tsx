import styles from "./page.module.css";

const Course = ({course}) => {
    return (
        <div className={styles.course}>
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
        </div>
    )
}

export default Course;