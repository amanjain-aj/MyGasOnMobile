import { StyleSheet } from 'react-native';
import config from '../../config/colors';

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 36,
        color: config.BODY_FONT
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    terms_modal_Sign_ND: {
        position: 'absolute',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        bottom: 0,
        marginBottom:0
    },
    modal_Sign_space: {
        marginTop: 10,
    },
    modal_Sign_heading: {
        fontWeight: 'bold',
        fontSize: 23,
        marginTop: 10,
        color: config.BLACK,
        textAlign: 'center',
        lineHeight: 28,
        alignItems: 'center',
    },
    modal_Sign_txt: {
        textAlign: 'center',
        fontSize: 17,
        color: config.DARK_GREY,
    },
    btn_modal_Sign_space: {
        marginTop: 25,
    },
    btn_SignUp_ND_Modal_2: {
        marginTop: 20,
        color: config.WHITE,
        fontWeight: 'bold',
        fontSize: 14,
        width: '100%',
        letterSpacing: 0.75,
        padding: 6,
    },
    default_Heading: {
        marginTop: 10,
        color: config.GREY
    },
    itemprice: {
        fontSize: 14,
        fontWeight: 'bold',
        display: 'flex',
        letterSpacing: 0.25,
        alignItems: 'center',
        lineHeight: 24
    },
    floating_btn: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: config.SKY_BLUE,
        flex: 1,
    },
    edit_delete_btn: {
        marginTop: -62,
        marginLeft: 240,
        flexDirection: 'row',
    },
    list_row: {
        width: '100%',
        height: 2,
        backgroundColor: config.LIGHT_GREY,
        borderRadius: 4,
        marginTop: -1,
        marginBottom: 110,
    },
    list: {
        backgroundColor: config.WHITE,
        width: '100%',
        marginTop: 5,
    },
    listing_view: {
        marginTop: 20,
        flex: 1,
        marginBottom: 250
    },
    dialogContent: {
        paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,

    },
    innnerConatiner: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listStyle: {
        borderBottomColor: config.LIGHT_GREY,
        borderBottomWidth: 1 
    },
    icon1Container: {
        width: 32,
        height: 32,
        borderRadius: 50,
        backgroundColor: config.LIGHT_GREY,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8

    },
    icon2Container: {
        width: 32,
        height: 32,
        borderRadius: 50,
        backgroundColor: config.SKY_BLUE,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
})

export default styles