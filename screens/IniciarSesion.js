import { StatusBar } from "expo-status-bar"
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from "react-native"
import firebase from '../database/firebase';


const IniciarSesion = (props) => {

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
            alert('Por favor llenar campo usuario')

        } else if (state.contrasena == '') {
            alert('Por favor llenar campo contraseña')
            
        } else {
            
            //props.navigation.navigate('FoodList')           // QUITARRRRRRRRRRRRRRRRRRRRRRR
            
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
                alert('Usuario o contraseña incorrecta')
                creedIncorrects = ''
            }
        }
    }

    const [usuarios, setUsuarios] = useState([]) 

    useEffect(() =>{
        firebase.db.collection('usuarios').onSnapshot(querySnapshot => {
            const usuarios = []

            querySnapshot.docs.forEach((doc) => {
                const { usuario, contrasena } = doc.data()
                usuarios.push({
                    id: doc.id,
                    usuario,
                    contrasena
                })
            })

            console.log(usuarios)
            setUsuarios(usuarios)

        })
    }, [])


    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Bienvenido a Recetap</Text>
            <Text style={styles.subTittle}>¡Inicia sesion para ver las mejores recetas!</Text>

            <TextInput placeholder="Usuario ej: juan20" style={styles.textInput} onChangeText={(value) => handleChangeText('usuario', value)} />
            <TextInput placeholder="Contraseña" style={styles.textInput} onChangeText={(value) => handleChangeText('contrasena', value)} />
            
            <Button title='Iniciar sesión' color='green' onPress={() => IniciarSesion()} />
 
            <Button title='Crear cuenta'  color='gray' onPress={() => { props.navigation.navigate('CrearUsuario')}} />

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
        marginTop: 50,
        borderRadius: 30,
        color: 'green',
    },
})


export default IniciarSesion