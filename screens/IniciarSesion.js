import { StatusBar } from "expo-status-bar"
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from "react-native"
import firebase from '../database/firebase';
import { useTranslation } from "react-i18next";
import './i18n'
import i18next from "./i18n";



const IniciarSesion = (props) => {

    
    const { t } = useTranslation()
    const [languaje, setLanguaje] = useState('en')

    const onChangeLanguaje = () =>{
        i18next.changeLanguage(languaje)
        if (languaje == 'es'){
            setLanguaje('en')
        } else {
            setLanguaje('es')
        }
    }



    const [state, setState] = useState({
        usuario: '',
        contrasena: ''
      })

      
    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const IniciarSesion = async () => {
        var creedIncorrects = 'X'

        if (state.usuario == '') {
            alert(t('home.alUser'))

        } else if (state.contrasena == '') {
            alert(t('home.alPassw'))
            
        } else {
            
            
            for (let i = 0; i < usuarios.length; i++) {
                
                if ((usuarios[i].usuario == state.usuario) && (usuarios[i].contrasena == state.contrasena)) {
                    //console.log(usuarios[i].usuario, usuarios[i].contrasena)
                    creedIncorrects = ''

                    props.navigation.navigate('PantallaRecetas', {
                        userId: usuarios[i].id
                    })
                } 
            }

            if (creedIncorrects == 'X') {
                alert(t('home.alErrorU'))
                creedIncorrects = ''
            }
        }
    }

    const [usuarios, setUsuarios] = useState([]) 

    useEffect(() =>{
        firebase.db.collection('usuarios').onSnapshot(querySnapshot => {
            const usuarios = []

            querySnapshot.docs.forEach((doc) => {
                const { usuario, contrasena, rol } = doc.data()
                usuarios.push({
                    id: doc.id,
                    usuario,
                    contrasena,
                    rol
                })
            })

            console.log(usuarios)
            setUsuarios(usuarios)

        })
    }, [])


    return(
        <View style={styles.container}>
            <Text style={styles.titulo}> {t('home.tInicio')} </Text>
            <Text style={styles.subTittle}> {t('home.sInicio')} </Text>

            <TextInput placeholder={t('home.iUserInicio')} style={styles.textInput} onChangeText={(value) => handleChangeText('usuario', value)} />
            <TextInput placeholder={t('home.iPassInicio')}  style={styles.textInput} onChangeText={(value) => handleChangeText('contrasena', value)} />
            
            <View style = {{marginTop: 30}}>
                <Button title={t('home.btnIniciarS')} color='green' onPress={() => IniciarSesion()} />
            </View>
            <View style = {{marginTop: 8}} > 
                <Button   title={t('home.btnCrearC')}  color='gray' onPress={() => { props.navigation.navigate('CrearUsuario')}} />
            </View>

            <View  style={styles.buttons} >
                <Button title={t('home.btnIdioma')} onPress={() => onChangeLanguaje()} />
            </View>

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
        marginBottom: 20,
    },
    titulo: {
        fontSize: 60,
        color: '#34434D',
        fontWeight: 'bold',
        justifyContent: "center",
        padding: 5,
    },
    subTittle: {
        fontSize: 15,
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
        marginTop:20,
        borderRadius: 30,
        color: 'green',
    },
})


export default IniciarSesion