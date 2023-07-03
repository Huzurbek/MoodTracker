import React from 'react';
import {View} from 'react-native';
import {useAppContext} from '../App.provider';
import {MoodItemRow} from '../components/MoodItemRowProps';

export const History: React.FC = () => {
  const {moodList} = useAppContext();
  return (
    <View>
      {moodList.map((item, index) => (
        <MoodItemRow item={item} key={index + 1} />
      ))}
    </View>
  );
};
