import type { Metadata } from "next";
import { Lato } from 'next/font/google'
import "./globals.css";

const lato = Lato({ 
  weight: ['400', '700'],
  subsets: ['latin'],
})



export const metadata: Metadata = {
  title: "NYT TEST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={lato.className}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
