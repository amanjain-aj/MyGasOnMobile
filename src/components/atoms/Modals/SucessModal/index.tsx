import React from 'react';
import {Image, Text, View} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import constants from '../../../../constants/constants';
import styles from './SucessModal.styles';
import I18n from '../../../../config/i18n';

const SucessModalModal: any = ({showDialog, setShowDialog, close,title,subtitle,onButtonClick}) => {
  const hideDialog = () => {
    setShowDialog(false);
  };

  return (
    <Portal>
      <Dialog
        style={[styles.dialog]}
        visible={showDialog}
        >
        <Dialog.Content style={styles.dialogContent}>
          <View style={styles.innnerConatiner}>
            <Image
              style={{width: 50, height: 50, marginTop: 20, marginBottom: 20}}
              source={require('../../../../assets/icons/vector_tick.png')}
            />
            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.subtitle}>
              {subtitle}
            </Text>

            <Button
              style={{marginTop: 15}}
              
              labelStyle={[styles.button]}
              mode="contained"
              onPress={onButtonClick}>
              {I18n.t('agencyModal.close_agency_modal')}
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default SucessModalModal;
