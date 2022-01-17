import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import constants from '../../../../constants/constants';
import {Button, Dialog, Portal} from 'react-native-paper';
import styles from './RatingModal.styles';
import config from '../../../../config/colors';
import {AirbnbRating} from 'react-native-ratings';

const RatingModal: any = ({showDialog, setShowDialog}) => {
  const hideDialog = () => {
    setShowDialog(false);
  };

  return (
    <Portal>
      <Dialog style={[styles.dialog]} visible={showDialog}>
        <Dialog.Content style={styles.dialogContent}>
          <View>
            <Text style={styles.title}>{constants.ratingModal.ratingText}</Text>
            <TouchableOpacity style={styles.buttonrating}>
              <Text style={{color: config.SKY_BLUE, fontSize: 18}}>
                {constants.ratingModal.excellent_service}
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                fontWeight: '700',
                color: '#233861',
              }}>
              {constants.ratingModal.overall}
            </Text>
            <AirbnbRating
              count={5}
              selectedColor={config.SKY_BLUE}
              unSelectedColor={config.LIGHT_GREY}
              starContainerStyle={{padding: 4}}
              isDisabled={true}
              defaultRating={4.5}
              size={20}
              reviewSize={0}
            />
            <View style={{height: 30}} />
            <Button
              labelStyle={[styles.button]}
              mode="contained"
              onPress={() => {
                hideDialog;
              }}>
              {constants.ratingModal.close}
            </Button>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default RatingModal;
