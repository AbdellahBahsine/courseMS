import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

import Header from './components/Header/page';
import ToastProvider from "./components/ToastProvider/page";

import { UserProvider } from './context/user.context';

const openSans = Open_Sans({
	subsets: ["latin"],
	weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: "Course Management System",
  description: "Created by Abdellah Bahsine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className}`}>
          <ToastProvider>
            <UserProvider>
              <Header />
              <main>
                {children}
              </main>
            </UserProvider>
          </ToastProvider>
      </body>
    </html>
  );
}
