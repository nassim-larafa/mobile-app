import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const Dashboard = ({ route }) => {
  const { username } = route.params;
  const [cages, setCages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [initialRegion, setInitialRegion] = useState(null);
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/dashboard/');
        const data = response.data;
        setCages(data);
        setLoading(false);

        const avgLatitude = data.reduce((acc, cage) => acc + parseFloat(cage.latitude_centre), 0) / data.length;
        const avgLongitude = data.reduce((acc, cage) => acc + parseFloat(cage.longitude_centre), 0) / data.length;

        setInitialRegion({
          latitude: avgLatitude,
          longitude: avgLongitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/client/');
        setClientData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClientData();
  }, []);

  if (loading || !clientData) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleCageContainerPress = () => {
    setShowMap(!showMap);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topRight}>Welcome, "{username}" !</Text>
      <Text style={styles.subtitle}>This is your List of Cages</Text>
      <TouchableOpacity onPress={handleCageContainerPress}>
        <View style={styles.cageContainer}>
          {cages.map(cage => (
            <View key={cage.Idcage} style={styles.cageItem}>
              <Text style={styles.cageName}>nom du cage :{cage.nom}</Text>
              <Text style={styles.cageName}>Id :{cage.Idcage}</Text>
              <Text style={styles.cageDescription}>description: {cage.description}</Text>
              <Text style={[styles.statusText, cage.status === 1 ? styles.greenText : styles.redText]}>
                Cage is {cage.status === 1 ? 'Protected' : 'Breached'}
              </Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
      {showMap && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
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
      {clientData && (
        <View style={styles.topRight}>
          <Text style={styles.clientPseudo}>{clientData.pseudo}</Text>
          <Image source={{ uri: clientData.picture }} style={styles.clientPicture} />
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
    marginTop: 38,
    marginBottom:-20,
    textAlign: 'center',
    color: 'white',
  },
  cageContainer: {
    marginTop: 40,
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
  statusText: {
    fontSize: 16,
  },
  greenText: {
    backgroundColor:'green',
    color: 'white',
    fontSize:20,
    textAlign:'center',
    marginTop:20,
    padding:8,
    borderWidth:1,
    borderColor:'green',
  },
  redText: {
    backgroundColor:'red',
    color:'white',
    fontSize:20,
    textAlign:'center',
    marginTop:20,
    padding:8,
    borderWidth:1,
    borderColor:'red',
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  
  },
  map: {
    flex: 1,
  },
  topRight: {
    position: 'absolute',
    color:'#052206',
    fontSize:18,
    top: 0,
    right: 0,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientPseudo: {
    fontSize: 16,
    marginRight: 10,
  },
  clientPicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Dashboard;
