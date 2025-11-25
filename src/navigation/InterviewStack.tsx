import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chapters from '../screens/Chapters';
import Interview from '../screens/Inteview';
import { colors } from '../utils/colors';

export type RootStackParamList = {
  Chapters: undefined;
  Interview: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const InterviewStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Chapters"
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
        name="Chapters"
        component={Chapters}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Interview"
        component={Interview}
        options={{ title: 'AI Interview' }}
      />
    </Stack.Navigator>
  );
};

export default InterviewStack;
