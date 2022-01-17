import React from 'react';
import Slider from '@react-native-community/slider';
import config from '../../../config/colors';

const SliderComponent: any = ({value}:{value:number}) => {
    return(
        <Slider
            style={{width: '85%', height: 40}}
            minimumValue={0}
            maximumValue={100}
            value={value}
            minimumTrackTintColor={config.SKY_BLUE}
            maximumTrackTintColor={config.FADED_GREY}
            thumbTintColor ={config.SKY_BLUE}
          
        />
    )
}

export default SliderComponent;