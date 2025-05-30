import { createSlice } from "@reduxjs/toolkit";

const jobSaveSlice = createSlice({
    name:'jobsave',
    initialState:{
        saveJobs:null,
    },
    reducers:{
        setSaveJob:(state,action) => {
            state.saveJobs = action.payload;
        },
    }
});
export const {setSaveJob} = jobSaveSlice.actions;
export default jobSaveSlice.reducer;