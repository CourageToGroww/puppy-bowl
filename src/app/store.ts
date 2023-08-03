import { configureStore } from "@reduxjs/toolkit";
import { allPlayersReducer, pickedPlayersReducer } from "../slices/playerSlice";

export const store = configureStore({
  reducer: {
    allPlayers: allPlayersReducer,
    pickedPlayers: pickedPlayersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
