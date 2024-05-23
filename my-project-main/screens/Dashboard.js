// Dashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Dashboard = ({ route }) => {
  const { username } = route.params;
  const [cages, setCages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000//api/dashboard/');
        const data = response.data;
        setCages(data);  // Assuming the API response is an array of cage objects
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}!</Text>
      <Text style={styles.subtitle}>This is your List of Cages</Text>
      <View style={styles.cageContainer}>
        {cages.map(cage => (
          <View key={cage.Idcage} style={styles.cageItem}>
            <Text style={styles.cageName}>nom :{cage.nom}</Text>
            <Text style={styles.cageName}>Id :{cage.Idcage}</Text>
            <Text style={styles.cageDescription}>description: {cage.description}</Text>
            {/* Add more properties as needed */}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#7FC3CA', //  background color
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color:'white',
  },
  cageContainer: {
    marginTop: 8,
  },
  cageItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    elevation: 2,
  },
  cageName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cageDescription: {
    fontSize: 16,
  },
});

export default Dashboard;
