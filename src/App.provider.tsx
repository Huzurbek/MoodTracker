import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {createContext} from 'react';
import {MoodOptionWithTimestamp, MoodOptionType} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppData = {
  moodList: MoodOptionWithTimestamp[];
};
const dataKey = 'my-app-data';

const setAppData = async (addData: AppData) => {
  try {
    await AsyncStorage.setItem(dataKey, JSON.stringify(addData));
  } catch {}
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const result = await AsyncStorage.getItem(dataKey);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  } catch {
    return null;
  }
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (selectedMood: MoodOptionType) => void;
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
});

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((selectedMood: MoodOptionType) => {
    setMoodList(current => {
      const newMoodList = [
        ...current,
        {mood: selectedMood, timestamp: Date.now()},
      ];
      setAppData({moodList: newMoodList});
      return newMoodList;
    });
  }, []);

  useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };
    fetchAppData();
  }, []);
  return (
    <AppContext.Provider value={{moodList, handleSelectMood}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
