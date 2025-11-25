import React from 'react';
import { View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/InterviewStack';
import { styles } from './styles';
import DefaultText, { TextTypes } from '../../components/DefaultText';

type InterviewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Interview'
>;

type Props = {
  navigation: InterviewScreenNavigationProp;
};

const Interview = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <DefaultText fontSize={32} type={TextTypes.BOLD}>
        Интересное интервью
      </DefaultText>
      <DefaultText style={styles.description}>
        Здесь будет контент интервью
      </DefaultText>
      <Button title="Вернуться к главам" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default Interview;
