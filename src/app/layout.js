import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "duaruqyah",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#ebeef2]`}
        
      >
        {/* <div className="bg-[#ebeef2] ">{children}</div> */}
        {children}
      </body>
    </html>
  );
}
