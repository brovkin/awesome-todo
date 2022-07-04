import { Slice, createSlice } from '@reduxjs/toolkit';
import { updateLocalStorage } from '@utils/localStorage';
import { STORAGE_SETTINGS } from '@constants';

interface State {
  savePositionListMenu: boolean;
}

export const initialState = {
  savePositionListMenu: false,
} as State;

export const settingsSlice: Slice<State> = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSavePositionListMenu: (state, action) => {
      state.savePositionListMenu = action.payload;
      updateLocalStorage(STORAGE_SETTINGS, {
        ...state,
        showListMenu: action.payload,
        savePositionListMenu: action.payload,
      });
    },
  },
});

export const { setSavePositionListMenu } = settingsSlice.actions;

export default settingsSlice.reducer;
