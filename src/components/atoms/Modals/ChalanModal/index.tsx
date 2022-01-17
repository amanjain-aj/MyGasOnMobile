import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import constants from '../../../../constants/constants';
import DropDown from '../../Dropdown';
import {Button, Dialog, Portal} from 'react-native-paper';

import styles from './ChalanModal.styles';

const ChalanModal: any = ({showDialog, setShowDialog}) => {
  const hideDialog = () => {
    setShowDialog(false);
  };

  const options = [
    {label: '1', value: '1', key: 1},
    {label: '2', value: '2', key: 2},
    {label: '3', value: '3', key: 3},
    {label: '4', value: '4', key: 4},
  ];

  return (
    <Portal>
          <Dialog style={[styles.dialog]} visible={showDialog}
          >
        <Dialog.Content style={styles.dialogContent}>
          <View>
            <DropDown
              options={options}
              hasDisabled={false}
              placeholder={constants.chalanModal.deliverQty}
            />
            <DropDown
              options={options}
              hasDisabled={false}
              placeholder={constants.chalanModal.recivedQty}
            />
            <TouchableOpacity style={styles.dashedBUtton} onPress={() => {}}>
              <Text style={styles.buttonText}>
                {constants.chalanModal.uploadChalan}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dashedBUtton} onPress={() => {}}>
              <Text style={styles.buttonText}>
                {constants.chalanModal.uploadOther}
              </Text>
            </TouchableOpacity>
            <View style={{height: 20}} />
            <Button
              labelStyle={[styles.button]}
              mode="contained"
              onPress={() => {hideDialog}}>
              {constants.orderDetail.submit}
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ChalanModal;
