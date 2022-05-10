'use strict';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const gettingPermission = async () => {
  const cameraPermission = await Camera.getCameraPermissionStatus();
  const microphonePermission = await Camera.getMicrophonePermissionStatus();
};

gettingPermission();

const CameraScreen = props => {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    gettingPermission();
  }, []);

  if (device == null) {
    return <View />;
  }
  return (
    <>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <Button
        title="Press"
        onPress={() => {
          camera.current
            .takePhoto({
              flash: 'on',
            })
            .then(photo => {
              console.log('PHOTO', photo.path);
              props.navigation.navigate('More', {
                image: `file://${photo.path}`,
                name: props.route.params.name,
                icon: null,
              });
            });
        }}
      />
    </>
  );
};

export default CameraScreen;