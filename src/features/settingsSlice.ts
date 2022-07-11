import { Slice, createSlice } from '@reduxjs/toolkit';
import { updateLocalStorage } from '@utils/localStorage';
import { STORAGE_SETTINGS } from '@constants';

interface State {
  isAuth: boolean;
  savePositionListMenu: boolean;
}

export const initialState = {
  isAuth: false,
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
        savePositionListMenu: action.payload,
      });
    },
    setAuth: (state, action) => {
      const value = action.payload;
      state.isAuth = value;
      updateLocalStorage(STORAGE_SETTINGS, {
        ...state,
        isAuth: value,
      });
    },
  },
});

export const { setSavePositionListMenu, setAuth } = settingsSlice.actions;

export default settingsSlice.reducer;
