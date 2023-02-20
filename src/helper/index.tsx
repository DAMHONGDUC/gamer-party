import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

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
  // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  // if (reg.test(text) === false) {
  //   return false;
  // } else {
  //   return true;
  // }
  return Yup.string().email().isValidSync(email);
};

export const checkValidatePhone = (phone: string) => {
  // if (typeof str !== 'string') return false;
  // return !isNaN(str) && !isNaN(parseFloat(str));

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

// const validateEmail = (email: string | undefined) => {
//   return yup.string().email().isValidSync(email)
// };

// const validatePhone = (phone: number | undefined) => {
//   return yup.number().integer().positive().test(
//      (phone) => {
//        return (phone && phone.toString().length >= 8 && phone.toString().length <= 14) ? true : false;
//      }
//    ).isValidSync(phone);
// };
