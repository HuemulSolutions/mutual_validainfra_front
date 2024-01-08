import { Menu } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  PayCircleOutlined,
  SecurityScanOutlined,
  UserOutlined,
  CalendarOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export default function SaToMenuList() {
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

  const location = useLocation();
  const path = location.pathname.slice(1);
  const menuItems = [
    getItem(
      <Link to="/" className="menu-tab">
        Inicio
      </Link>,
      "inicio",
      <HomeOutlined />
    ),
    getItem(
      <Link to="/areas" className="menu-tab">
        Areas
      </Link>,
      "areas",
      <AppstoreOutlined />
    ),
    getItem(
      <Link to="/modelos" className="menu-tab">
        Modelos
      </Link>,
      "modelos",
      <CalendarOutlined />
    ),
    getItem(
      <Link to="/version-models" className="menu-tab vers-modelos">
        Versiones de Modelos
      </Link>,
      "version-models",
      <PayCircleOutlined />
    ),
    getItem("Seguridad", "seguridad", <SecurityScanOutlined />, [
      getItem(
        <Link to="/users" className="menu-tab">
          Usuarios
        </Link>,
        "usuarios",
        <UserOutlined />
      ),
      getItem(
        <Link to="/roles" className="menu-tab">
          Roles
        </Link>,
        "roles",
        <UnorderedListOutlined />
      ),
    ]),
  ];

  return (
    <Menu
      theme="light"
      mode="inline"
      defaultSelectedKeys={[path]}
      items={menuItems}
      className="satomenulist"
    />
  );
}
