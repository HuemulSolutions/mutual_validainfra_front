import React, { useState } from "react";
import { Layout, Button } from "antd";
import "./SaToFullNavBar.css";

export default function SaToFullNavBar({ componente } = props) {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content } = Layout;

  return (
    <Layout className="layout">
      <Layout>
        <Header className="header">
          <Button
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: "black",
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <h1>Mutual</h1>
        </Header>
        <Content>{componente}</Content>
      </Layout>
    </Layout>
  );
}
