import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "antd";
import { ChatApp, CustomerList, ProfileDrawer } from "./components";

const { Sider, Content } = Layout;

const layoutStyle = {
  height: "100vh",
  backgroundColor: "#758694",
};

const siderStyle: React.CSSProperties = {
  background: "#e6eaed",
  paddingTop: "20px",
};

const contentStyle: React.CSSProperties = {
  lineHeight: "120px",
  padding: "20px 20px 20px 0",
  backgroundColor: "#e6eaed",
};

export const Chat = () => {
  const { search } = useLocation();
  const id = search.split("=");
  const userId = Number(id[id.length - 1]);
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout style={layoutStyle}>
      <Sider width="25%" style={siderStyle}>
        <CustomerList setCollapsed={setCollapsed} />
      </Sider>
      <Content style={contentStyle}>
        <ChatApp />
      </Content>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width="25%"
        style={siderStyle}
      >
        {!collapsed && <ProfileDrawer id={userId} />}
      </Sider>
    </Layout>
  );
};
