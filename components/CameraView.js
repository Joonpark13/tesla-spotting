import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Camera from 'react-native-camera';

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
  },
});

class CameraView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: null,
    };

    this.takePicture = this.takePicture.bind(this);
  }

  takePicture() {
    this.camera.capture().then((data) => {
      this.props.navigation.state.params.handleImage(data.mediaUri);
    });
  }

  render() {
    return (
      <View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          captureTarget={Camera.constants.CaptureTarget.cameraRoll}
          style={styles.camera}
        >
          <Button title="Capture" onPress={this.takePicture} />
        </Camera>
      </View>
    );
  }
}

export default CameraView;
