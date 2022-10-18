import { StatusBar } from "expo-status-bar"
import React, { useState } from 'react';
import firebase from '../database/firebase';
import { StyleSheet, Text, View, TextInput, Button } from "react-native"


const CrearUsuario = (props) => {

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
            alert('Por favor llenar campo usuario')

        } else if (state.contrasena == '') {
            alert('Por favor llenar campo contraseña')
        
        } else {
            await firebase.db.collection('usuarios').add({
                usuario: state.usuario,
                contrasena: state.contrasena,
                rol: 'user'
            })

            alert('Registro realizado exitosamente!')
            props.navigation.navigate('IniciarSesion')
        }
    }


    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Regístrate ahora</Text>
            <Text style={styles.subTittle}>¡Las mejores recetas!</Text>

            <TextInput placeholder="Usuario ej: juan20" style={styles.textInput} onChangeText={(value) => handleChangeText('usuario', value)} />
            <TextInput placeholder="Contraseña" style={styles.textInput} onChangeText={(value) => handleChangeText('contrasena', value)} />
            
            
            <Button title='Registrarme' color='green' onPress={() => AddNewUser()} />
            


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