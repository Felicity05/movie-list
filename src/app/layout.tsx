import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie List",
  description: "Take Home Movie List Project",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex flex-col flex-1 items-center bg-cream font-sans">
          <main className="flex flex-1 w-full max-w-7xl flex-col py-10 px-5 bg-cream shadow-2xl">
            <h1 className="mb-5 text-center text-3xl font-bold">Your Movie Lists</h1>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
