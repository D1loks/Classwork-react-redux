import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreateDogState {
  name: string;
  breed: string;
  color: string;
  image: string;
}

const initialState: CreateDogState = {
  name: "",
  breed: "",
  color: "",
  image: "",
};

const createDogSlice = createSlice({
  name: "createDog",
  initialState,
  reducers: {
    setField(state, action: PayloadAction<{ field: keyof CreateDogState; value: string }>) {
      state[action.payload.field] = action.payload.value;
    },
    resetForm(state) {
      state.name = "";
      state.breed = "";
      state.color = "";
      state.image = "";
    },
  },
});

export const { setField, resetForm } = createDogSlice.actions;
export default createDogSlice.reducer;
