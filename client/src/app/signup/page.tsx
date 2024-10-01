'use client';

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from 'next/image';

import Link from 'next/link';

const page = () => {

    const [userCredentials, setUserCredentials] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const { firstName, lastName, username, password, confirmPassword } = userCredentials;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userCredentials);
    }

    return (
        <div className={styles.signup}>
            <div className={styles.signup__inner}>
                <div className={styles.signup_form}>
                    <h1>Sign <span>Up</span></h1>
                    <div className={styles.line}></div>
                    <form onSubmit={onSubmit}>
                        <div className={styles.fullname}>
                            <input type="text" placeholder="First name" value={firstName} name="firstName" onChange={onChange} />
                            <input type="text" placeholder="Last name" value={lastName} name="lastName" onChange={onChange} />
                        </div>
                        <input type="text" placeholder="Username" value={username} name="username" onChange={onChange} />
                        <input type="password" placeholder="Password" value={password} name="password" onChange={onChange} />
                        <input type="password" placeholder="Password" value={confirmPassword} name="confirmPassword" onChange={onChange} />
                        <button type="submit">Sign Up</button>
                        <p className={styles.login}>Already have an account? <Link href="/login">Log in</Link></p>
                    </form>
                </div>
                <div className={styles.signup_image}>
                    <Image src="/illustrations/woman_studying.png" alt="signup" layout="fill" objectFit="cover" quality={100} />
                </div>
            </div>
        </div>
    )
}

export default page;