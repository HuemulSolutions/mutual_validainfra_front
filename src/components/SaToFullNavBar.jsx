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
          <img
            src="/logos/mutual-logo-horizontal.png"
            alt="Mututal"
            style={{ width: "150px", padding: "10px" }}
          />
          {/* <h1>Mutual</h1> */}
        </Header>
        <Content>{componente}</Content>
      </Layout>
    </Layout>
  );
}
