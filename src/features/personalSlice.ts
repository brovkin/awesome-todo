import { Slice, createSlice } from '@reduxjs/toolkit';
import { getLocalStorage, updateLocalStorage } from '@utils/localStorage';
import { STORAGE_PERSONAL } from '@constants';

export interface PersonalInfo {
  name: string;
  surname: string;
  email: string;
}

interface State {
  info: PersonalInfo;
}

export const initialState = { info: {} } as State;

export const personalSlice: Slice<State> = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    getPersonal: (state) => {
      state = getLocalStorage(STORAGE_PERSONAL);
    },
    savePersonalInfo: (state, action) => {
      state.info = action.payload;
      updateLocalStorage(STORAGE_PERSONAL, {
        info: action.payload,
      });
    },
  },
});

export const { getPersonal, savePersonalInfo } = personalSlice.actions;

export default personalSlice.reducer;
