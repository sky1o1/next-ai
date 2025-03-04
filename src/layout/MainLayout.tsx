import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, MenuProps } from "antd";

interface IChildren {
  children: React.ReactNode;
}

const { Header, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items1: MenuItem[] = [
  { key: 1, label: "Dashboard", nav: "/" },
  { key: 2, label: "Chat App", nav: "/chat" },
  { key: 3, label: "Settings", nav: "/settings" },
].map((key) => ({
  key: key.key,
  label: <Link to={key.nav}>{key.label}</Link>,
  nav: key.nav,
}));

const MainLayout = ({ children }: IChildren) => {
  const { pathname } = useLocation();
  const [current, setCurrent] = useState("1");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Header
        style={{
          alignItems: "center",
          display: pathname === "/login" ? "none" : "flex",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          selectedKeys={[current.toString()]}
          items={items1}
          onClick={onClick}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Content
          style={{
            margin: 0,
            borderRadius: "10px",
            height: "100vh", // change later
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
