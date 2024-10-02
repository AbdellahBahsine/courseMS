'use client'

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from 'next/image';

import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";

import {showErrorToast, showSuccessToast} from '../components/showToast/page';

const page = () => {

    const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: ""
    });
    const router = useRouter();

    const { username, password } = userCredentials;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userCredentials);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/auth/login`, {
                username,
                password,
            });

            const { access_token } = response.data;
            
            localStorage.setItem('accessToken', access_token);

            showSuccessToast('Login successful!');

            setUserCredentials({
                username: "",
                password: ""
            });

            router.push("/");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                showErrorToast(err.response.data.message);
            } else {
                showErrorToast('An unexpected error occurred.');
            }
        }
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__inner}>
                <div className={styles.login_form}>
                    <h1>Log <span>In</span></h1>
                    <div className={styles.line}></div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username" value={username} name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" value={password} name="password" onChange={handleChange} />
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