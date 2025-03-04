import { Divider, Image, Menu, Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { RootState } from "../../app/store";
import { ButtonAnt } from "../../components";

export const DashboardSidebar = () => {
  const navigator = useNavigate();
  const user = useSelector((state: RootState) => state.userList.userData);
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 8,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "colorBgContainer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image width={200} src={user?.image} />
        <Typography.Title level={4}>{user?.name}</Typography.Title>
        <Divider />
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </div>
      <Divider />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <ButtonAnt
          title="Logout"
          variant="danger"
          onClick={() => {
            localStorage.removeItem("token");
            navigator("/login");
          }}
        />
      </div>
    </div>
  );
};
