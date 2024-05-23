// Login.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Animated, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logoOpacity = useRef(new Animated.Value(0)).current; // Initial opacity value of 0

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1, // Final opacity value
      duration: 2000, // Duration of the animation in milliseconds
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000//api/token/', {
        username: username,
        password: password,
      });
      await AsyncStorage.setItem('token', response.data.access);
      Alert.alert('Login Success', 'your login is successfull');
      navigation.navigate('Dashboard', { username: username });
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid Password or Username');
    }
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/logo.png')}
        style={[styles.logo, { opacity: logoOpacity }]}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#7FC3CA', // F background color
  },
  logo: {
    position: 'absolute',
    top: 30, // Adjust as needed
    right: 155, // Adjust as needed
    width: 60,
    height: 60,
    borderRadius:50,
  },
  title: {
    fontSize: 27,
    marginBottom: 16,
    textAlign: 'center',
    color:'white',
  },
  input: {
    height: 40,
    borderColor: '#06A0B2',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
  button: {
    backgroundColor: '#A3EB6A', // Dodger blue background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default Login;
