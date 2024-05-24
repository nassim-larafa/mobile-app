import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; // Import MapView and Marker from react-native-maps
import axios from 'axios';

const Dashboard = ({ route }) => {
  const { username } = route.params;
  const [cages, setCages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false); // State to control the visibility of the map
  const [initialRegion, setInitialRegion] = useState(null); // State to store the initial region of the map

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/dashboard/');
        const data = response.data;
        setCages(data);
        setLoading(false);

        // Calculate the average latitude and longitude of all the cages
        const avgLatitude = data.reduce((acc, cage) => acc + parseFloat(cage.latitude_centre), 0) / data.length;
        const avgLongitude = data.reduce((acc, cage) => acc + parseFloat(cage.longitude_centre), 0) / data.length;

        // Set the initial region to the average latitude and longitude
        setInitialRegion({
          latitude: avgLatitude,
          longitude: avgLongitude,
          latitudeDelta: 0.1, // Adjust the zoom level as needed
          longitudeDelta: 0.1,
        });
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

  const handleCageContainerPress = () => {
    setShowMap(!showMap); // Toggle the visibility of the map
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {username}!</Text>
      <Text style={styles.subtitle}>This is your List of Cages</Text>
      <TouchableOpacity onPress={handleCageContainerPress}>
        <View style={styles.cageContainer}>
          {cages.map(cage => (
            <View key={cage.Idcage} style={styles.cageItem}>
              <Text style={styles.cageName}>nom du cage :{cage.nom}</Text>
              <Text style={styles.cageName}>Id :{cage.Idcage}</Text>
              <Text style={styles.cageDescription}>description: {cage.description}</Text>
              {/* Add more properties as needed */}
            </View>
          ))}
        </View>
      </TouchableOpacity>
      {showMap && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion} // Set the initial region of the map
          >
            {cages.map(cage => (
              <Marker
                key={cage.Idcage}
                coordinate={{
                  latitude: parseFloat(cage.latitude_centre),
                  longitude: parseFloat(cage.longitude_centre),
                }}
                title={`Cage ${cage.nom}`}
                description={cage.description}
              />
            ))}
          </MapView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#7FC3CA',
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
    color: 'white',
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
  mapContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  map: {
    flex: 1,
  },
});

export default Dashboard;
