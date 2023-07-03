import React from 'react';
import {BottomTabsNavigator} from './screens/BottomTabs.Navigator';
import {NavigationContainer} from '@react-navigation/native';
import {AppProvider} from './App.provider';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'teal',
//   },
// });
