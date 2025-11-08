import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, 
    createUser, 
    updateUser, 
    deleteUser,
    loginUser} from "../../services/api/user";

export const getUserData = createAsyncThunk("user/getUserData", 
    async () => {
    return await getAllUsers()})

export const loginUserData = createAsyncThunk(
    "user/loginUserData",
    async (payload, { rejectWithValue }) => {
        try {
        const res = await loginUser(payload); 
        // res = { token: "...", user: {...} }

        // Simpan token ke localStorage
        localStorage.setItem("token", res.data.token);

        return res; // dikembalikan ke fulfilled
        } catch (err) {
        const errorMsg =
            err?.response?.data?.message || err.message || "Login gagal";
        return rejectWithValue(errorMsg);
        }
    }
);

export const createUserData = createAsyncThunk(
    "user/createUserData",
    async (payload, { rejectWithValue }) => {
        try {
        const res = await createUser(payload);
        return res;
        } catch (err) {
        const errorMsg =
            err?.response?.data?.message || err.message || "Terjadi kesalahan server.";
        return rejectWithValue(errorMsg);
        }
    }
    )   

export const updateUserData = createAsyncThunk("user/editUserData", 
    async ({id, payload}) => {
    return await updateUser(id, payload)})

export const deleteUserData = createAsyncThunk("user/deleteUserData", 
    async (id) => {
    await deleteUser(id)
    return id })

export const userSlice = createSlice({
    name : "user",
    initialState : {
        data : [],
        status : "idle",
        error : null   
    },
    reducers : {},

    extraReducers : (builder) => {
        builder
        .addCase(getUserData.pending, (state) => {
            state.status = "loading" })

        .addCase(getUserData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload })

        .addCase(getUserData.rejected, (state) => {
            state.status = "failed" })
        
        .addCase(loginUserData.pending, (state) => {
        state.status = "loading";
        })
        .addCase(loginUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.user;
        })
        .addCase(loginUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        })


        .addCase(createUserData.pending, (state) => {
        state.status = "loading";
        })
        .addCase(createUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload.data);
        })
        .addCase(createUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        })
        .addCase(updateUserData.fulfilled, (state, action) => {
            const index = state.data.findIndex((item) => item.id === action.payload.id)
            if (index !== -1) {
                state.data[index] = {...state.data[index], ...action.payload }}})

        .addCase(deleteUserData.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload)})
    },})

export default userSlice.reducer
