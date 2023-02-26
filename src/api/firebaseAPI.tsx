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

export const getDataByDocId = async (collection: string, docId: string) => {
  const res = await firestore().collection(collection).doc(docId).get();

  if (res?._data) {
    return res._data;
  }
};
