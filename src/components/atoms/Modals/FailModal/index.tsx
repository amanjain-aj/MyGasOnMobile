import React from 'react';
import {View, Text, Image} from 'react-native';
import constants from '../../../../constants/constants';
import {Button, Dialog, Portal} from 'react-native-paper';
import styles from './FailModal.styles';
import I18n from '../../../../config/i18n';

const FailModal: any = ({showDialog, setShowDialog, title, subTitle}) => {
  const hideDialog = () => {
    setShowDialog(false);
  };

  return (
    <Portal>
      <Dialog style={[styles.dialog]} visible={showDialog} onDismiss={hideDialog}>
        <Dialog.Content style={styles.dialogContent}>
          <View>
            <Image
              style={{width: 50, height: 50, marginTop: 20,alignSelf:'center', marginBottom: 20}}
              source={require('../../../../assets/icons/red_tick.png')}
            />
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.subtitle}>{subTitle}</Text>

            <View style={{height: 30}} />
            <Button
              labelStyle={[styles.button]}
              mode="contained"
              onPress={() => {
                hideDialog;
              }}>
              {I18n.t('ratingModal.close')}
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default FailModal;
