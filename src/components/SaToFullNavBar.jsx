import React, { useState } from "react";
import { Layout, Button } from "antd";
import SaToMenuList from "./SaToMenuList";
import "./SaToFullNavBar.css";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

export default function SaToFullNavBar({ componente } = props) {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Sider, Content } = Layout;
  const siderStyle = {
    textAlign: "center",
    lineHeight: "125px",
    color: "black",
    backgroundColor: "#ececec",
  };

  return (
    <Layout className="layout">
      <Sider
        className="sidebar"
        style={siderStyle}
        trigger={null}
        collapsible
        collapsed={collapsed}>
        <div className="satologo">
          <div className="logo-icon">
            {collapsed ? (
              <img
                src="./logos/mutual-logo-horizontal.png"
                alt="Santo tomas"
                className="colapsed-logo"
              />
            ) : (
              <img src="./logos/mutual-logo-horizontal.png" alt="Santo tomas" />
            )}
          </div>
        </div>
        <SaToMenuList />
      </Sider>
      <Layout>
        <Header className="header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              color: "black",
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <h1>Santo Tomas</h1>
        </Header>
        <Content>{componente}</Content>
      </Layout>
    </Layout>
  );
}
