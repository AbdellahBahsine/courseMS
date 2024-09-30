import styles from "./page.module.css";
import Image from 'next/image';

import Link from 'next/link';

const page = () => {
    return (
        <div className={styles.login}>
            <div className={styles.login__inner}>
                <div className={styles.login_form}>
                    <h1>Log <span>In</span></h1>
                    <div className={styles.line}></div>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Login</button>
                        <p className={styles.register}>Don't have an account? <Link href="/register">Register</Link></p>
                    </form>
                </div>
                <div className={styles.login_image}>
                    <Image src="/illustrations/woman_studying.png" alt="Login" layout="fill" objectFit="cover" quality={100} />
                </div>
            </div>
        </div>
    )
}

export default page;