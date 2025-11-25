import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import InterviewStack from './InterviewStack';

export type { RootStackParamList } from './InterviewStack';

const Navigation = () => {
  return (
    <NavigationContainer>
      <InterviewStack />
    </NavigationContainer>
  );
};

export default Navigation;
