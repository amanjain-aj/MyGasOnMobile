import React from 'react';
import {View, Text} from 'react-native';
import styles from './DeleteModal.styles';
import constants from '../../../../constants/constants';
import {Button, Dialog, Portal} from 'react-native-paper';
import I18n from '../../../../config/i18n';

const DeleteModal = ({showDialog, setShowDialog, title, onDelete}) => {
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
                  width: 140,
                  borderRadius: 3,
                }}
                labelStyle={[styles.button]}
                mode="contained"
                onPress={hideDialog}>
                {I18n.t('ratingModal.close')}
              </Button>
              <Button
                style={{
                  backgroundColor: '#293F66',
                  width: 140,
                  borderRadius: 3,
                }}
                labelStyle={[styles.button]}
                mode="contained"
                onPress={onDelete}>
                {I18n.t('ratingModal.delete')}
              </Button>
            </View>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default DeleteModal;
