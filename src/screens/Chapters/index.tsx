import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/InterviewStack';
import { styles } from './styles';
import DefaultText from '../../components/DefaultText';
import { TextTypes } from '../../components/DefaultText';
import ChapterItem, { Chapter } from '../../components/ChapterItem';

type ChaptersScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Chapters'
>;

type Props = {
  navigation: ChaptersScreenNavigationProp;
};

const chapters: Chapter[] = [
  { id: '1', title: 'Mixed Questions', icon: '🎲' },
  { id: '2', title: 'Childhood', icon: '👶' },
  { id: '3', title: 'Love', icon: '❤️' },
  { id: '4', title: 'Work', icon: '💼' },
  { id: '5', title: 'Holidays', icon: '🎉' },
  { id: '6', title: 'Traditions', icon: '🎭' },
  { id: '7', title: 'Family', icon: '👨‍👩‍👧‍👦' },
];

const Chapters = ({ navigation }: Props) => {
  const handleChapterPress = (chapter: Chapter) => {
    navigation.navigate('Interview');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <DefaultText type={TextTypes.BOLD} style={styles.title}>
              Choose a{' '}
            </DefaultText>
            <View style={styles.highlightedTextContainer}>
              <DefaultText type={TextTypes.BOLD} style={styles.title}>
                Life Chapter
              </DefaultText>
            </View>
          </View>

          <DefaultText style={styles.description}>
            Pick a topic you want to talk about. We'll ask gentle questions to
            help you tell your story.
          </DefaultText>
        </View>

        <View style={styles.chaptersContainer}>
          {chapters.map(chapter => (
            <ChapterItem
              key={chapter.id}
              chapter={chapter}
              onPress={handleChapterPress}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chapters;
