import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

const ENDPOINT = '/messages';
export const submitForm = createAsyncThunk(
    'form/submitForm',
    async (text, { rejectWithValue }) => {
        try {
            const response = await api.post(ENDPOINT, { message: text });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
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
                state.error = null;
            })
            .addCase(submitForm.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Submission failed';
            });
    },
});

export const { resetStatus } = formSlice.actions;
export default formSlice.reducer;
