import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {FirebaseContext} from '_context';

import {connect} from 'react-redux';
import {setAuthUser} from '_actions';

const LoginScreen = props => {
  const {doPhoneSignIn} = useContext(FirebaseContext);
  const [login, setLogin] = useState(true);
  const [mobile, setMobile] = useState('+91');
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState(null);

  const handleSignIn = async () => {
    setLogin(false);
    const confirmation = await doPhoneSignIn(mobile);
    setConfirm(confirmation);
  };

  const handleOTP = async () => {
    try {
      await confirm.confirm(otp);
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  const Otp = () => (
    <View style={styles.footer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>OTP</Text>
        <TextInput
          style={styles.textInput}
          value={otp}
          onChangeText={setOtp}
          placeholder="Enter OTP"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleOTP}>
          <Text style={styles.navigation}>{'Confirm OTP'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerTextBtn}>
        <TouchableOpacity onPress={() => setLogin(true)}>
          <Text style={styles.footerBtnText}>
            {'<< Try Other Mobile Number'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const Login = () => (
    <View style={styles.footer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.textInput}
          value={mobile}
          onChangeText={setMobile}
          placeholder="Enter Mobile Number"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.navigation}>{'Send OTP'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{login ? 'Login / Register' : 'OTP'}</Text>
      </View>
      {login ? <Login /> : <Otp />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9ca47',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 25,
    paddingBottom: 10,
  },
  footer: {
    flex: 2,
    backgroundColor: '#ffffff',
    padding: 25,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  footerTextBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  navigation: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  textInput: {
    borderWidth: 1,
    margin: 5,
    borderRadius: 10,
    paddingLeft: 15,
  },
  label: {
    paddingLeft: 5,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#e32f45',
  },
});

export default connect(null, {setAuthUser})(LoginScreen);
