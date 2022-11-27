import { StatusBar } from "expo-status-bar"
import React, { useState } from 'react';
import firebase from '../database/firebase';
import { StyleSheet, Text, View, TextInput, Button } from "react-native"
import { useTranslation } from "react-i18next";
import './i18n'
import i18next from "./i18n";


const CrearUsuario = (props) => {

    const { t } = useTranslation()
    const [languaje, setLanguaje] = useState('en')



    const [state, setState] = useState({
        usuario: '',
        contrasena: '',
        rol: ''
      })

      
    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const AddNewUser = async () => {
        if (state.usuario == '') {
            alert(t('home.alUser'))

        } else if (state.contrasena == '') {
            alert(t('home.alPassw'))
        
        } else {
            await firebase.db.collection('usuarios').add({
                usuario: state.usuario,
                contrasena: state.contrasena,
                rol: 'user'
            })

            alert(t('home.alExit'))
            props.navigation.navigate('IniciarSesion')
        }
    }


    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>{t('home.tRegistro')}</Text>
            <Text style={styles.subTittle}>{t('home.tText')}</Text>

            <TextInput placeholder={t('home.iUserInicio')} style={styles.textInput} onChangeText={(value) => handleChangeText('usuario', value)} />
            <TextInput placeholder={t('home.iPassInicio')} style={styles.textInput} onChangeText={(value) => handleChangeText('contrasena', value)} />
            
            
            <Button title={t('home.btnRegistrar')} color='green' onPress={() => AddNewUser()} />
            


            <StatusBar style="auto" />
            
            
        </View>
    )   



}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 80,
        color: '#34434D',
        fontWeight: 'bold',
        padding: 5,
        marginBottom: 20,
        justifyContent: "center",
    },
    subTittle: {
        fontSize: 20,
        color: 'gray',
        marginBottom: 90,
    },
    textInput: {
        //borderWidth: 1,
        //borderColor: 'gray',
        padding: 20,
        paddingStart: 30,
        width: '80%',
        height: 50,
        marginTop: 20,
        marginBottom: 15,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    buttons: {
        padding: 30,
        marginTop: 50,
        borderRadius: 30,
        color: 'green'
    },
})

export default CrearUsuario