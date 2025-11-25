import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chapters from '../screens/Chapters';
import Interview from '../screens/Inteview';
import { colors } from '../utils/colors';
import { ROUTES } from './routes';

export type RootStackParamList = {
  [ROUTES.CHAPTERS]: undefined;
  [ROUTES.INTERVIEW]: { chapterId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const InterviewStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.CHAPTERS}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: colors.black,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 17,
        },
      }}
    >
      <Stack.Screen
        name={ROUTES.CHAPTERS}
        component={Chapters}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTES.INTERVIEW}
        component={Interview}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default InterviewStack;
