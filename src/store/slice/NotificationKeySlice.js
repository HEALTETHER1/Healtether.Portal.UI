import { createSlice } from '@reduxjs/toolkit';
const initialState ={
    notificationKey:null
};
const NotificationKeySlice = createSlice({
    name: 'notificationKey',
    initialState,
    reducers: {
        setNotificationKey: (state, action) => {
            state.notificationKey = action.payload.device;
          },
        removeNotificationKey: (state, action) => {
            state.notificationKey = null;
          }
    },
});
export const { setNotificationKey, removeNotificationKey } = NotificationKeySlice.actions;
export default NotificationKeySlice.reducer;