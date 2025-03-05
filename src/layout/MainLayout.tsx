import { Layout } from "antd";

interface IChildren {
  children: React.ReactNode;
}

const { Content } = Layout;

const MainLayout = ({ children }: IChildren) => {
  return (
    <Layout>
      <Content>{children}</Content>
    </Layout>
  );
};

export default MainLayout;
