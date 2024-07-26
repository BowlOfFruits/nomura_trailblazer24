'use client'

import { Footer as AntdFooter } from "antd/es/layout/layout";
import { Button, Col, Row } from "antd";
import { WechatOutlined } from "@ant-design/icons";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation"
import AddPurchase from "./AddPurchase";

const Footer = () => {
    const router = useRouter();

    return (
        <div style={{ position: "fixed", bottom: 20, right: 20, width: "100%", textAlign: 'right', alignContent: "end", flexDirection: 'column-reverse'}}>
            <Row justify="end">
                <Col>
                    <AddPurchase />
                </Col>
                <Col>
                    <Button className="mx-1"><WechatOutlined onClick={() => router.push("/chat")} /></Button>
                </Col>
            </Row>
        </div>
    );
}

export default Footer