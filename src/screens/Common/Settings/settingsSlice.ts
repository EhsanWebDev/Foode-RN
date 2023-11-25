import {createSlice} from '@reduxjs/toolkit';
export type AppLanguagesT = 'en' | 'de' | 'fr' | 'it';

type SettingsT = {
  appLang: AppLanguagesT;
};

const INITIAL_STATE: SettingsT = {
  appLang: 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: INITIAL_STATE,
  reducers: {
    setAppLang: (state, action) => {
      state.appLang = action.payload;
    },
  },
});

export const {setAppLang} = settingsSlice.actions;

export default settingsSlice.reducer;
