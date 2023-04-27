import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('e -', e);
  }
};

export const getString = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value != null) {
      return value;
    }
  } catch (e) {
    console.log('e', e);
  }
};
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.log(e);
  }
};
export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Removed.');
  } catch (e) {
    // remove error
    console.log(e);
  }
};
