import { Divider, Image, Typography } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { ButtonAnt } from "../../components";
import {
  IoChatbubbleEllipsesOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import styled from "styled-components";

const IconContainer = styled.div`
  width: 200px;
  cursor: pointer;
  border-radius: 25px;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  &:hover {
    background: #9477cb;
    color: black;
  }
  background: ${(props) => (props?.page === "/dashboard" ? "#9477cb" : "none")};
`;

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
        backgroundColor: "#6e00ff",
        borderRadius: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image width={200} src={user?.image} />
        <Typography.Title
          level={4}
          style={{
            color: "white",
          }}
        >
          {user?.name}
        </Typography.Title>
        <Divider />

        <IconContainer page="/dashboard" onClick={() => navigator("/")}>
          <IoHomeOutline size="30px" color="white" />
          <strong
            style={{
              fontSize: "12px",
              color: "white",
            }}
          >
            Dashboard
          </strong>
        </IconContainer>
        <IconContainer onClick={() => navigator("/chat")}>
          <IoChatbubbleEllipsesOutline size="30px" color="white" />
          <strong
            style={{
              fontSize: "12px",
              color: "white",
            }}
          >
            Chat
          </strong>
        </IconContainer>
        <IconContainer onClick={() => navigator("/settings")}>
          <IoSettingsOutline size="30px" color="white" />
          <strong
            style={{
              fontSize: "12px",
              color: "white",
            }}
          >
            Settings
          </strong>
        </IconContainer>
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
