import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Flex, Spin, Typography } from "antd";
import styled from "styled-components";
import { useCustomer } from "../../../hooks/chat/useCustomer";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/store";
import { useInView } from "react-intersection-observer";
import {
  IoChatbubbleEllipsesOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";

const ChatboxContainer = styled.div`
  position: fixed;
  top: 60px;
  left: 20px;
  width: 385px;
  height: calc(100vh - 110px);
  padding: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #e6eaed;
  transition: background-color 0.3s ease;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  overflow-y: auto;
  margin-top: 35px;
  scrollbar-width: none;
`;

const Chatbox = styled.div`
  height: 80px;
  width: 100%;
  padding: 10px;
  background: white;
  display: flex;
  align-items: center;
  justfy-content: center;
  cursor: pointer;
  gap: 20px;
  border-bottom: 1px solid #b4abab;
  transition: background-color 0.3s ease;
  border-radius: 25;
  &:hover {
    background-color: #e6eaed;
  }
  &:active {
    background-color: #e6eaed;
  }
`;

const IconContainer = styled.div`
  cursor: pointer;
  border-radius: 100%;
  padding: 10px;
  &:hover {
    background: #9477cb;
    color: black;
  }
  background: ${(props) => (props?.page === "/chat" ? "#9477cb" : "none")};
`;

interface ICustomer {
  name: string;
  email: string;
  id: number;
  phone: string;
  role: string;
  address: string;
  age: number;
}

export const CustomerList = ({
  setCollapsed,
}: {
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const nav = useNavigate();
  const { ref, inView } = useInView();
  const [customerData, setCustomerData] = useState<ICustomer[]>([]);

  const { data, isLoading, fetchNextPage, isFetchingNextPage, isFetching } =
    useCustomer();
  const res = data?.pages[data?.pages?.length - 1]?.users;

  const reduxMessages = useSelector((state: RootState) => state.chatList.user);

  const latestMessage = (id: number) => {
    let newMessage;
    const filteredMessages = reduxMessages.filter((x) => x.id === id);
    if (filteredMessages?.length > 0 && filteredMessages[0]?.chat?.length > 0) {
      newMessage =
        filteredMessages[0]?.chat[filteredMessages[0]?.chat?.length - 1];
      return (
        <Flex
          justify="space-between"
          style={{
            width: "300px",
          }}
        >
          <Typography.Text strong italic>
            {newMessage.text}
          </Typography.Text>{" "}
          <Typography.Text strong italic>
            {newMessage.timestamp}
          </Typography.Text>
        </Flex>
      );
    }
    return <Typography.Text type="secondary">No New Messages</Typography.Text>;
  };

  const showDrawer = (data: number) => {
    nav(`/chat?id=${data}`);
    setCollapsed(false);
  };

  useEffect(() => {
    if (res) {
      setCustomerData((prev) => [
        ...prev,
        ...res.flatMap((x) => ({
          name: `${x.firstName} ${x.lastName}`,
          email: x.email,
          id: x.id,
          phone: x.phone,
          role: x.role,
          address: x.address.address,
          age: x.age,
        })),
      ]);
    }
  }, [res]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, ref]);

  return (
    <div
      style={{
        height: "800px",
        overflowY: "auto",
        scrollbarWidth: "none",
      }}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              background: "#6E00FF",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              borderRadius: "20px",
              boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.3)",
              position: "fixed",
              zIndex: 10,
              width: "23%",
              padding: "4px",
            }}
          >
            <IconContainer>
              <IoHomeOutline
                onClick={() => nav("/")}
                size="30px"
                color="white"
              />
            </IconContainer>
            <IconContainer page="/chat">
              <IoChatbubbleEllipsesOutline
                onClick={() => nav("/chat")}
                size="30px"
                color="white"
              />
            </IconContainer>
            <IconContainer>
              <IoSettingsOutline
                onClick={() => nav("/settings")}
                size="30px"
                color="white"
              />
            </IconContainer>
          </div>

          <ChatboxContainer>
            {customerData?.map((x: ICustomer, index: number) => {
              const isLastItem = index === customerData?.length - 1;
              return (
                <Chatbox
                  key={x.id}
                  onClick={() => showDrawer(x.id)}
                  ref={isLastItem ? ref : null}
                >
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                  <Flex vertical>
                    <strong
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      {x.name}
                    </strong>
                    <Typography.Text italic strong>
                      {latestMessage(x.id)}
                    </Typography.Text>
                  </Flex>
                </Chatbox>
              );
            })}
            {isFetchingNextPage && <Spin />}
          </ChatboxContainer>

          {isFetchingNextPage && <Spin />}
        </div>
      )}
    </div>
  );
};
