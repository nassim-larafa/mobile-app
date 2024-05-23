import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
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
    backgroundColor: '#7FC3CA', //  background color
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius:100,
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color:'#A3EB6A',
  },
  button: {
    backgroundColor: '#A3EB6A', // button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width:140,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    textAlign:'center',
  },
});

export default Home;
