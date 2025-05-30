import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
        isApply:null,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        },
        setIsApply:(state,action)=>{
            state.isApply=action.payload;
        }
    }
});
export const {setAllApplicants,setIsApply} = applicationSlice.actions;
export default applicationSlice.reducer;