import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import Layout from "antd/es/layout/layout";
import Header from "./../components/header"
import { Content } from "antd/es/layout/layout";
import Footer from "./../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StockerAI",
  description: "Generated by StockerAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
      <Header />
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            minHeight: 280,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer />
    </>
  );
}
