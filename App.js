import React from 'react';
import { Buton, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';


export default class App extends React.Component {
  state = {
  image: null,
  haspermission : null,
  setHasPermission : null,
  type : Camera.Constants.Type.back,
  setType : Camera.Constants.Type.back
  };

  selectPicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
    });
    if (!cancelled) this.setState({ image: uri });
  };

  takePicture = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
    });
    this.setState({ image: uri });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.state.image }} />
        <View>
          <Button onPress={this.takePicture}>Camera</Button>
          <Button onPress={this.selectPicture}>Gallery</Button>
        </View>
      </View>
    );
  }
}

const Button = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff8080',
    textAlign: 'center' },

  image: { 
    width: 330, 
    height: 330, 
    borderRadius: 10,
    backgroundColor: '#ffddcc' },

  button: {
    justifyContent: 'center',
    padding: 18,
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#ffddcc',
  },

  container: {
    flex: 1,
    backgroundColor: '#ffeecc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
