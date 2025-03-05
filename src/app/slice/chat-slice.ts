import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  user: {
    id: number;
    chat: {
      id: number;
      text: string;
      isOutgoing: boolean;
      timestamp: string;
    }[];
  }[];
}

const initialState: ChatState = {
  user: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat(state, action: PayloadAction<ChatState>) {
      const { id, chat } = action.payload;

      if (!state.user) {
        state.user = [];
      }

      const existingUser = state.user.find((x) => x.id === id);

      if (existingUser) {
        if (!Array.isArray(existingUser.chat)) {
          existingUser.chat = [];
        }
        existingUser.chat = [...existingUser.chat, { ...chat }];
      } else {
        state.user.push({ id, chat: [chat] });
      }
    },
    clearChat(state) {
      state.user = [];
    },
  },
});

export const { setChat, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
