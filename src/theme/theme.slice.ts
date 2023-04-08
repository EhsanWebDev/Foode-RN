import {createSlice} from '@reduxjs/toolkit';
import {theme} from './theme';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme,
    isDarkTheme: false,
  },
  reducers: {
    setTheme: (state, action) => {
      const {payload} = action || {};
      const {selectedTheme, isDarkTheme} = payload || {};

      state.theme = selectedTheme;
      state.isDarkTheme = isDarkTheme;
    },
  },
});

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;
