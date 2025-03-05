import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Flex, Spin, Typography } from "antd";
import styled from "styled-components";
import { useCustomer } from "../../../hooks/chat/useCustomer";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../app/store";
import { useInView } from "react-intersection-observer";

const Chatbox = styled.div`
  height: 80px;
  padding: 10px;
  background: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 20px;
  border: 1px solid #e6eaed;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e6eaed;
  }
  &:active {
    background-color: #e6eaed;
  }
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
        <Typography.Text strong italic>
          {newMessage.text}
        </Typography.Text>
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
  }, [fetchNextPage, inView]);

  return (
    <div
      style={{
        height: "850px",
        overflowY: "auto",
      }}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <div
          id="scrollableDiv"
          style={{
            overflow: "auto",
            paddingLeft: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            style={{
              height: "x",
              width: "100%",
              padding: "10px",
              background: "#6682ba",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography.Title level={3}>Customers</Typography.Title>
          </div>

          {customerData?.map((x: ICustomer, index: number) => (
            <Chatbox onClick={() => showDrawer(x?.id)}>
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
              <Flex vertical>
                <Typography.Text strong>{x.name}</Typography.Text>
                <Typography.Text italic strong>
                  {latestMessage(x.id)}
                </Typography.Text>
              </Flex>
            </Chatbox>
          ))}

          {isFetchingNextPage && <Spin />}
        </div>
      )}
      <>
        <div ref={ref}>
          {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
        </div>
      </>
    </div>
  );
};
