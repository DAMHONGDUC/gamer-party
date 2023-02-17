import {COLORS} from 'constants/theme';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  title: string;
  mainColor: string;
  textColor: string;
  type: number;
  onPress: () => void;
};

export default function LoginOptionButton({
  title,
  mainColor,
  textColor,
  type,
  onPress,
}: Props): JSX.Element {
  const getIcon = (): JSX.Element | undefined => {
    switch (type) {
      case 0:
        return (
          <MaterialIcons
            style={styles.button}
            name={'facebook'}
            color={COLORS.fbColor}
            size={35}
          />
        );
      case 1:
        return (
          <Image
            style={[styles.button, styles.googleIcon]}
            source={require('assets/google.png')}
          />
        );
      case 2:
        return (
          <Entypo
            style={styles.button}
            name={'message'}
            color={'#F0A04B'}
            size={30}
          />
        );
    }
  };

  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor={COLORS.underlayColor}
      onPress={onPress}>
      <View style={[styles.mainView, {backgroundColor: mainColor}]}>
        <Text style={[styles.text, {color: textColor}]}>{title}</Text>
        {getIcon()}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4267B2',
    borderRadius: 22.5,
    height: 50,
    flexDirection: 'row',
  },
  container: {
    borderRadius: 22.5,
    marginTop: 5,
    marginBottom: 7,
  },
  text: {
    color: COLORS.white,
    fontSize: 15,
  },
  button: {
    position: 'absolute',
    left: 20,
  },
  googleIcon: {
    width: 27,
    height: 27,
  },
});
