import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Dog {
  _id: string;
  name: string;
  breed: string;
  color: string;
  image: string;
}

interface DogsState {
  dogs: Dog[];
  loading: boolean;
  error: string | null;
}

const initialState: DogsState = {
  dogs: [],
  loading: false,
  error: null,
};

const dogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    setDogs(state, action: PayloadAction<Dog[]>) {
      state.dogs = action.payload;
    },
    setDog(state, action: PayloadAction<Dog>) {
      const dog = action.payload;
      if (!state.dogs.find((d) => d._id === dog._id)) {
        state.dogs.push(dog);
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setDogs, setDog, setLoading, setError } = dogsSlice.actions;
export default dogsSlice.reducer;
