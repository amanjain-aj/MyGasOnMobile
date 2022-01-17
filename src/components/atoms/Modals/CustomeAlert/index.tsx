import React from 'react';
import { View, Text } from 'react-native'
import styles from './CustomAlert.styles'
import constants from '../../../../constants/constants';
import {Button, Dialog, Portal} from 'react-native-paper';

const CustomAlert = ({ showDialog, setShowDialog, title,onClose }) => {
  console.log("Alert",onClose)
  const hideDialog = () => {
    setShowDialog(false);
  };

  return (
    <Portal>
      <Dialog
        style={[styles.dialog]}
        visible={showDialog}
        onDismiss={hideDialog}>
        <Dialog.Content style={styles.dialogContent}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <View style={{marginTop: 30}}></View>
            <View style={styles.buttonContainer}>
              <Button
                style={{
                  backgroundColor: '#00B6ED',
                  height:40,
                  width: '80%',
                  borderRadius: 3,
                  
                }}
                labelStyle={[styles.button]}
                mode="contained"
                onPress={onClose!=null?onClose:hideDialog}>
                {constants.ratingModal.close}
              </Button>
              
            </View>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default CustomAlert;
