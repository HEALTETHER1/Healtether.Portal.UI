import { createSlice } from '@reduxjs/toolkit';
const initialState ={
    clinic: null
};
const ClinicSlice = createSlice({
    name: 'currentClinic',
    initialState,
    reducers: {
        setCurrentClinic: (state, action) => {
            state.clinic = action.payload;
          },
        removeCurrentClinic: (state, action) => {
            state.clinic = null;
          }
    },
});
export const { setCurrentClinic, removeCurrentClinic } = ClinicSlice.actions;
export default ClinicSlice.reducer;