import { useCallback, useMemo, useRef, useState } from "react";
import { Avatar, Flex, Skeleton, Spin, Typography } from "antd";
import styled from "styled-components";
import { useCustomer } from "../../../hooks/chat/useCustomer";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileDrawer } from "./ProfileDrawer";

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 60px;
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

export const CustomerList = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const [input, setInput] = useState("");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCustomer();
  const observerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const res = data?.pages[data?.pages?.length - 1]?.users;

  const showDrawer = (data: number) => {
    setOpen(true);
    setId(data);
  };

  const onClose = () => {
    setOpen(false);
  };

  const customerData = useMemo(() => {
    return (
      res?.flatMap((x) => ({
        name: `${x.firstName} ${x.lastName}`,
        email: x.email,
        id: x.id,
        phone: x.phone,
        role: x.role,
        address: x.address.address,
        age: x.age,
      })) || []
    );
  }, [res]);

  const loadMoreData = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetchNextPage();
    setLoading(true);
  }, []);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasNextPage) {
  //         fetchNextPage();
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );

  //   if (observerRef.current) observer.observe(observerRef.current);

  //   return () => observer.disconnect();
  // }, [fetchNextPage, hasNextPage]);
  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <div
          id="scrollableDiv"
          style={{
            // height: "700px",
            overflow: "auto",
            paddingLeft: "16px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <InputField
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search"
          />
          <InfiniteScroll
            dataLength={customerData.length}
            next={loadMoreData}
            hasMore={customerData.length < 10}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            scrollableTarget="scrollableDiv"
          >
            {customerData?.map((x: ICustomer, index: number) => (
              <Chatbox onClick={() => showDrawer(x?.id)}>
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
                <Flex vertical>
                  <Typography.Text strong>{x.name}</Typography.Text>
                  <Typography.Text italic strong>
                    {x.address}
                  </Typography.Text>
                </Flex>
              </Chatbox>
            ))}

            {isFetchingNextPage && <Spin />}
          </InfiniteScroll>
          {open && <ProfileDrawer onClose={onClose} open={open} id={id} />}
        </div>
      )}
    </>
  );
};
