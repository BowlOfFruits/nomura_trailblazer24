import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import Layout from "antd/es/layout/layout";
import Header from "./../components/header"
import { Content } from "antd/es/layout/layout";
import Footer from "./../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
            // background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            // borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer />
    </>
  );
}
