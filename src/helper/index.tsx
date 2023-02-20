import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import {ToastAndroid} from 'react-native';

export const setAsyncStorageData = async (storeKey: string, value: string) => {
  try {
    await AsyncStorage.setItem(storeKey, value);
  } catch (e) {}
};

export const getAsyncStorageData = async (storeKey: string) => {
  try {
    const value = await AsyncStorage.getItem(storeKey);

    return value;
  } catch (e) {}
};

export const checkValidateEmail = (email: string) => {
  return Yup.string().email().isValidSync(email);
};

export const checkValidatePhone = (phone: string) => {
  return Yup.number()
    .integer()
    .positive()
    .test(phone => {
      return phone &&
        phone.toString().length >= 8 &&
        phone.toString().length <= 14
        ? true
        : false;
    })
    .isValidSync(phone);
};

export const showToastAndroid = text => {
  ToastAndroid.show(text, ToastAndroid.SHORT);
};
