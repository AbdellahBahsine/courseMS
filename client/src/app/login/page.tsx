'use client'

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from 'next/image';

import Link from 'next/link';

const page = () => {

    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    });

    const { username, password } = userCredentials;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userCredentials);
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__inner}>
                <div className={styles.login_form}>
                    <h1>Log <span>In</span></h1>
                    <div className={styles.line}></div>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Username" value={username} name="username" onChange={onChange} />
                        <input type="password" placeholder="Password" value={password} name="password" onChange={onChange} />
                        <button type="submit">Log in</button>
                        <p className={styles.register}>Don't have an account? <Link href="/signup">Register</Link></p>
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