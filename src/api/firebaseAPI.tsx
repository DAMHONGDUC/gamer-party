import firestore from '@react-native-firebase/firestore';

export const checkDocExist = async (collection: string, docID: string) => {
  const doc = await firestore().collection(collection).doc(docID).get();

  return doc._exists;
};

export const createNewDoc = async (
  collection: string,
  docID: string,
  data: object,
) => {
  await firestore().collection(collection).doc(docID).set(data);
};
