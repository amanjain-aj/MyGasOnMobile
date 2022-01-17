/* eslint-disable prettier/prettier */
import { Dimensions, Platform } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const Styles = {
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    AccordionComponentView: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        marginBottom: 11
    },
    AccordionComponentTopView: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },
    AccordionComponentBottomView: {
        padding: 16,
        borderTopWidth: 1,
        borderColor: '#E8E9E9'
    },
    AccordionComponentBottomText: {
        color: '#182024',
        fontSize: 14,
        lineHeight: 28,
    },
    AccordionComponentDotText: {
        color: '#33CC33',
        fontSize: 28,
        //lineHeight: 28,
    },
    AccordionComponentTimeText: {
        color: '#33CC33',
        fontSize: 14,
        lineHeight: 28,
        color: 'grey',
    },
    AccordionScrollView: {
        paddingVertical: 24
    },
    scrollComp: {
        flex: 1,
        paddingHorizontal: 16,
                marginBottom: 16,

    },
    ScrollViewComp: {
        paddingTop: 16,
        flex: 1
    }
};

export default Styles;