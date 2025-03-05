import React from "react";
import { Layout, Typography } from "antd";
import { DashboardSidebar } from "../pages/dashboard/DashboardSidebar";

interface IChildren {
  children: React.ReactNode;
}

const { Content, Sider } = Layout;

const DashboardLayout = ({ children }: IChildren) => {
  return (
    <Layout
      style={{
        padding: 24,
      }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        width={250}
        style={{
          height: "88vh",
          background: "white",
          borderRadius: "10px",
        }}
      >
        <DashboardSidebar />
      </Sider>
      <Layout style={{ marginLeft: "24px" }}>
        <Content
          style={{
            margin: 0,
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 20,
          }}
        >
          <Typography.Title>Dashboard</Typography.Title>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
