import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  chat: { id: number; text: string; isOutgoing: boolean; timestamp: string }[];
}

const initialState: ChatState = {
  chat: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat(state, action: PayloadAction<ChatState>) {
      state.chat.push(action.payload);
    },
  },
});

export const { setChat } = chatSlice.actions;
export default chatSlice.reducer;
