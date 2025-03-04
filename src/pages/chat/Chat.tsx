import { Layout } from "antd";
import { ChatApp, CustomerList } from "./components";

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
  return (
    <Layout style={layoutStyle}>
      <Sider width="25%" style={siderStyle}>
        <CustomerList />
      </Sider>
      <Content style={contentStyle}>
        <ChatApp />
      </Content>
    </Layout>
  );
};
