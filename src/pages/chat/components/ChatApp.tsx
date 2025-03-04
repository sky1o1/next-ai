import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Flex, Typography } from "antd";
import styled from "styled-components";

import { setChat } from "../../../app/slice/chat-slice";
import { RootState } from "../../../app/store";

const ChatContainer = styled(Flex)`
  width: 96%;
  height: 700px;
  border: 1px solid #fff;
  border-radius: 8px;
  overflow-y: scroll;
  padding: 20px;
  margin-left: 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: end;
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
  border-radius: 4px;
`;

const SendButton = styled.button`
  padding: 8px;
  background-color: ${(props) =>
    props?.type === "send" ? "#007bff" : "#25D366"};
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
  const reduxMessages = useSelector((state: RootState) => state.chatList.chat);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
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

    dispatch(setChat(newMessage));
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

    dispatch(setChat(newMessage));

    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [reduxMessages]);

  return (
    <div>
      <ChatContainer>
        {reduxMessages?.map((msg) => (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: msg?.isOutgoing ? "flex-end" : "flex-start",
            }}
          >
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
                  }}
                >
                  {msg.text}
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
                  }}
                >
                  {msg.timestamp}
                </Typography.Text>
              </div>
            </Card>
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
          <SendButton type={"send"} onClick={handleSend}>
            Send
          </SendButton>
          <SendButton type={"recieve"} onClick={handleRecieve}>
            Recieve
          </SendButton>
        </ButtonContainer>
      </InputContainer>
    </div>
  );
};
