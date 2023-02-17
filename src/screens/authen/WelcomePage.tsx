import {COLORS} from 'constants/theme';
import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LoginOptionButton from 'components/LoginOptionButton';

export default function WelcomePage(): JSX.Element {
  return (
    <LinearGradient
      style={styles.container}
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#EB455F', '#e6576d', '#F2921D']}>
      <View style={styles.row}>
        <Image
          style={styles.brandImage}
          source={require('assets/app_icon_white.png')}
        />
        <Text style={styles.brandText}>Gamer Finder</Text>
      </View>
      <View>
        <Text style={styles.introText}>
          Đăng nhập để kết nối và tìm bạn bè chơi game chung.
        </Text>
        <LoginOptionButton
          title={'Đăng nhập bằng Facebook'}
          mainColor={COLORS.white}
          textColor={COLORS.black}
          type={0}
        />
        <LoginOptionButton
          title={'Đăng nhập bằng Google'}
          mainColor={COLORS.white}
          textColor={COLORS.black}
          type={1}
        />
        <LoginOptionButton
          title={'Đăng nhập bằng số điện thoại'}
          mainColor={COLORS.white}
          textColor={COLORS.black}
          type={2}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandImage: {
    width: 60,
    height: 60,
  },
  brandText: {
    fontSize: 30,
    fontWeight: '500',
    color: COLORS.white,
    marginLeft: 7,
    alignSelf: 'flex-end',
  },
  introText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.white,
    marginBottom: 20,
  },
});
