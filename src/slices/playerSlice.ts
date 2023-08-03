import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../app/store";

const initialAllPlayersState: Player[] = [];
const initialPickedPlayersState: Player[] = [];

const allPlayersSlice = createSlice({
  name: "allPlayers",
  initialState: initialAllPlayersState,
  reducers: {
    loadPlayers(state, action: PayloadAction<Player[]>) {
      return action.payload;
    },
    benchPlayer(state, action: PayloadAction<number>) {
      const index = state.findIndex((player) => player.id === action.payload);
      if (index !== -1) {
        const player = state[index];
        player.isBenched = true;
      }
    },
  },
});

const pickedPlayersSlice = createSlice({
  name: "pickedPlayers",
  initialState: initialPickedPlayersState,
  reducers: {
    unBenchPlayer(state, action: PayloadAction<number>) {
      const index = state.findIndex((player) => player.id === action.payload);
      if (index !== -1) {
        const player = state[index];
        player.isBenched = false;
        state.splice(index, 1);
      }
    },
    pickPlayer(state, action: PayloadAction<Player>) {
      state.push(action.payload);
    },
  },
});

export const { loadPlayers, benchPlayer } = allPlayersSlice.actions;

export const { pickPlayer: pickPlayerToPicked, unBenchPlayer } =
  pickedPlayersSlice.actions;

export const allPlayersReducer = allPlayersSlice.reducer;
export const pickedPlayersReducer = pickedPlayersSlice.reducer;
