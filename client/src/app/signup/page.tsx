'use client';

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from 'next/image';

import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";

import { showErrorToast, showSuccessToast } from '../components/showToast/showToast';
import withGuest from "../components/WithGuest/withGuest";

const SignUp = () => {

    const [userCredentials, setUserCredentials] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const router = useRouter();

    const { firstName, lastName, username, password, confirmPassword } = userCredentials;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            showErrorToast('Passwords do not match.');
            return;
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/auth/register`, {
              firstName,
              lastName,
              username,
              password,
            });
      
            showSuccessToast('Registration successful! You can now log in.');
      
            setUserCredentials({
                firstName: "",
                lastName: "",
                username: "",
                password: "",
                confirmPassword: ""
            });

            router.push('/login');

        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                const { message } = err.response.data;

                if (typeof message === 'string') {
                    showErrorToast(message);
                } else if (Array.isArray(message)) {
                    showErrorToast(message[0]);
                } else {
                    showErrorToast('An unexpected error occurred.');
                }
            } else {
                showErrorToast('An unexpected error occurred.');
            }
        }
    }

    return (
        <div className={styles.signup}>
            <div className={styles.signup__inner}>
                <div className={styles.signup_image}>
                    <Image src="/illustrations/Learning-cuate.svg" alt="signup" layout="fill" objectFit="cover" quality={100} />
                </div>

                <div className={styles.signup_form}>
                    <h1>Sign <span>Up</span></h1>
                    <div className={styles.line}></div>
                    <form onSubmit={handleSubmit} action="#">
                        <div className={styles.fullname}>
                            <input type="text" placeholder="First name" value={firstName} name="firstName" onChange={handleChange} />
                            <input type="text" placeholder="Last name" value={lastName} name="lastName" onChange={handleChange} />
                        </div>
                        <input type="text" placeholder="Username" value={username} name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" value={password} name="password" onChange={handleChange} />
                        <input type="password" placeholder="Confirm password" value={confirmPassword} name="confirmPassword" onChange={handleChange} />
                        <button type="submit">Sign Up</button>
                        <p className={styles.login}>Already have an account? <Link href="/login">Log in</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withGuest(SignUp);