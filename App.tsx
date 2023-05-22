import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import theme from './src/theme/theme';
import {ThemeProvider} from '@shopify/restyle';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigation from './src/navigation/RootNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './src/store';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        {/* <SafeAreaProvider> */}
        {/* <SafeAreaView style={styles.container}> */}
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <PaperProvider>
              <RootNavigation />
            </PaperProvider>
          </ThemeProvider>
        </NavigationContainer>
        <Toast />
        <StatusBar barStyle="light-content" />
        {/* </SafeAreaView> */}
        {/* </SafeAreaProvider> */}
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
