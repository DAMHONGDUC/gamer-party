import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {COLORS} from 'constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from 'constants/values';
import {useDispatch} from 'react-redux';
import {setUid} from 'redux/slices/appSlide';

export default function UserDetailPage() {
  const navigation = useNavigation();
  const {handleAfterSignOut} = useContext(AuthContext);
  const dispatch = useDispatch();

  const onLogout = async () => {
    await firebase.auth().signOut();
    await handleAfterSignOut();
    dispatch(setUid(null));

    navigation.navigate('AuthenticationStack', {screen: 'WelcomePage'});
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.logoutContainer}
        underlayColor={COLORS.grey}
        onPress={onLogout}>
        <View style={styles.logout}>
          <Text style={styles.text}>Logout</Text>

          <MaterialIcons name={'logout'} color={COLORS.primary} size={30} />
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#AEE2FF',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  row: {
    marginBottom: 20,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flexDirection: 'column',
    marginTop: 100,
    padding: 15,
  },
  image: {
    marginTop: 100,
    marginLeft: 25,
    height: 110,
    width: 110,
    borderRadius: 55,
  },
  text: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: '500',
    marginRight: 5,
  },
  mainText: {
    marginLeft: 13,
    color: COLORS.black,
    fontSize: 16,
  },
  logoutContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 80,
  },
  logout: {
    flexDirection: 'row',
  },
});
