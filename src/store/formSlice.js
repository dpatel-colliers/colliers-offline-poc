import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postMessage } from './api';

export const submitForm = createAsyncThunk(
  'form/submitForm',
  async (text, { rejectWithValue }) => {
    try {
      const result = await postMessage(text);
      return result;
    } catch (err) {
      return rejectWithValue(err.message || 'Submission failed');
    }
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = 'submitting';
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Submission failed';
      });
  },
});

export const { resetStatus } = formSlice.actions;
export default formSlice.reducer;
