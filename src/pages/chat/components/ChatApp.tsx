import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Flex, Modal, Typography } from "antd";
import styled from "styled-components";

import { setChat, clearChat } from "../../../app/slice/chat-slice";
import { RootState } from "../../../app/store";
import { useCustomerDetail } from "../../../hooks/chat/useCustomerDetail";
import { ButtonAnt } from "../../../components";

const DivChat = styled.div`
  height: 60px;
  width: auto;
  padding: 10px;
  background: #6e00ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 20px;
  margin-left: 20px;
`;

const ChatContainer = styled(Flex)`
  height: 700px;
  border: 1px solid #fff;
  overflow-y: scroll;
  margin-left: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  boxshadow: 10px 20px 25px rgba(1, 200, 240, 0.5);
  scrollbar-width: none;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 20px 0 20px;
`;

const ButtonContainer = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputField = styled.input`
  width: 88%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 10px;
  boxshadow: 10px 20px 25px rgba(0, 0, 0, 0.5);
`;

const SendButton = styled.button`
  padding: 8px;
  background-color: ${(props) =>
    props?.messagetype === "send" ? "#1877F2" : "#25D366"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background-color: #0056b3;
  }
`;

export const ChatApp = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const id = search.split("=");
  const userId = Number(id[id.length - 1]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const reduxMessages = useSelector((state: RootState) => state.chatList.user);
  const filteredMessages = reduxMessages.filter((x) => x.id === userId);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const { data, isLoading } = useCustomerDetail(userId);
  const fullName = data ? data?.firstName + " " + data?.lastName : null;

  const handleSend = () => {
    const newMessage = {
      id: 1,
      text: input,
      isOutgoing: true,
      timestamp: new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
    };
    const userMessage = {
      id: userId,
      chat: newMessage,
    };

    dispatch(setChat(userMessage));
    setInput("");
  };

  const handleRecieve = () => {
    const newMessage = {
      id: 1,
      text: input,
      isOutgoing: false,
      timestamp: new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
    };

    const userMessage = {
      id: userId,
      chat: newMessage,
    };

    dispatch(setChat(userMessage));

    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [userId, input]);

  return (
    <div>
      <DivChat>
        {isLoading ? (
          <> </>
        ) : (
          <strong style={{ color: "white", fontSize: "24px" }}>
            {fullName ? fullName : "Start a new chat"}
          </strong>
        )}
      </DivChat>
      <ChatContainer>
        {filteredMessages[0]?.chat?.map?.((msg, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              width: "100%",
              display: "flex",
              justifyContent: msg?.isOutgoing ? "flex-end" : "flex-start",
            }}
          >
            {msg && (
              <Card
                variant="borderless"
                size="small"
                style={{
                  backgroundColor: msg?.isOutgoing ? "#1877F2" : "#25D366",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    justifySelf: "end",
                  }}
                >
                  <Typography.Text
                    strong
                    style={{
                      color: "white",
                      fontSize: "18px",
                    }}
                  >
                    {msg?.text}
                  </Typography.Text>
                </div>
                <div
                  style={{
                    justifySelf: "end",
                  }}
                >
                  <Typography.Text
                    strong
                    style={{
                      color: "black",
                      fontSize: "12px",
                    }}
                  >
                    {msg?.timestamp}
                  </Typography.Text>
                </div>
              </Card>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ChatContainer>

      <InputContainer>
        <InputField
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <ButtonContainer>
          <SendButton
            disabled={!input}
            messagetype={"send"}
            onClick={handleSend}
          >
            Send
          </SendButton>
          <SendButton
            disabled={!input}
            messagetype={"recieve"}
            onClick={handleRecieve}
          >
            Recieve
          </SendButton>
          <ButtonAnt variant="danger" title="Clear Chat" onClick={showModal} />
        </ButtonContainer>
      </InputContainer>
      <Modal
        title="Clear chat?"
        open={isModalOpen}
        okText="Delete"
        onOk={() => {
          dispatch(clearChat());
          handleCancel();
        }}
        onCancel={handleCancel}
      >
        Are you sure you want to clear entire chat history with every customers?
      </Modal>
    </div>
  );
};
