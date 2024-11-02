import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  patient: 0,
};
const PatientScrollerSlice = createSlice({
  name: "patientScroller",
  initialState,
  reducers: {
    setCurrentPatient: (state, action) => {
      state.clinic = action.payload;
    },
  },
});
export const { setCurrentPatient } = PatientScrollerSlice.actions;
export default PatientScrollerSlice.reducer;
