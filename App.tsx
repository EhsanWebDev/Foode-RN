import React, {useEffect} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import theme from './src/theme/theme';
import {ThemeProvider} from '@shopify/restyle';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigation from './src/navigation/RootNavigation';
import store, {persistor} from './src/store';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import ErrorBoundary from 'react-native-error-boundary';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.container}>
          <ThemeProvider theme={theme}>
            <BottomSheetModalProvider>
              <NavigationContainer>
                <PaperProvider>
                  <ErrorBoundary>
                    <RootNavigation />
                  </ErrorBoundary>
                </PaperProvider>
              </NavigationContainer>
            </BottomSheetModalProvider>
          </ThemeProvider>
          <Toast />
          <StatusBar barStyle="light-content" />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
