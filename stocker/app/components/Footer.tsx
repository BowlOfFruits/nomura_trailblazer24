'use client'

import { Footer as AntdFooter } from "antd/es/layout/layout";
import { Button } from "antd";
import { WechatOutlined } from "@ant-design/icons";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation"

const Footer = () => {
    const router = useRouter();

    return (
        <div style={{ position: "fixed", bottom: 20, right: 20, width: "100%", textAlign: 'right'}}>
            <Button><WechatOutlined onClick={() => router.push("/chat")} /></Button>
        </div>
    );
}

export default Footer