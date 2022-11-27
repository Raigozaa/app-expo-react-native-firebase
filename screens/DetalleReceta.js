import React, {useEffect, useState} from 'react';
import { Text, StyleSheet, ScrollView, Button, View, ActivityIndicator, Image} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import firebase from '../database/firebase';
import PantallaRecetas from './PantallaRecetas';
import { useTranslation } from "react-i18next";
import './i18n'
import i18next from "./i18n";

const DetalleReceta = (props) => {

    const { t } = useTranslation()
    const [languaje, setLanguaje] = useState('en')

    
   /* console.log(props.route.params.userId) */

    const initialState = {
        id: '',
        titulo: '',
        descripcion: '',
        pasos: '',
        uri: '',
    }
    

    /* Se coloca id porque lo estamos recibiendo, y el user ta tiene id en la bbdd*/
    const [food, setFood] = useState(initialState)
    const [loading, setLoading] = useState(true)
    const [shouldShow, setShouldShow] = useState(true);
    const [usuarios, setUsuarios] = useState([])

    

    /* Consulta a la bbdd*/
    const getFoodById = async (id) => {
        const dbRead = firebase.db.collection('recetas').doc(id)
        const doc = await dbRead.get()
        /* console.log(doc)*/

        /* Leer el doc*/
        const food = doc.data()
        /*console.log(user)*/

        /* El usuario obtenido de bbdd guardalo en state de user*/
        setFood({
            ...food,
            id: doc.id,
        })
        setLoading(false)

        //console.log(shouldShow)

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

            //console.log(props.route.params)
            //console.log('STATUS', shouldShow)
            //console.log(props.route.params.usuarioId)

            setShouldShow(!shouldShow)
            //console.log(shouldShow)

            for (let i = 0; i < usuarios.length; i++) {
                if ((usuarios[i].id == props.route.params.usuarioId) && (usuarios[i].rol == 'Admin') ) {
                    setShouldShow(shouldShow)
                } 
                console.log(usuarios[i].id)
                console.log(props.route.params.usuarioId)
                console.log(" ")
            }
            
        })

    }

    /* Obtener un usuario */
    useEffect(() => {
        getFoodById(props.route.params.userId)
    }, [])

    /* Como se desea modificar, cambia a user */
    const handleChangeText = (name, value) => {
        setFood({...food, [name]: value})
    }

    const updateFood = async () => {
        const dbRef = firebase.db.collection('recetas').doc(food.id)
        await dbRef.set({
            titulo: food.titulo,
            descripcion: food.descripcion,
            pasos: food.pasos,
            uri: food.uri
        })

        setFood(initialState)
        props.navigation.navigate('PantallaRecetas')
    }

    const deleteFood = async () => {
        const dbRef = firebase.db.collection('recetas').doc(props.route.params.userId)
        await dbRef.delete()
        props.navigation.navigate('PantallaRecetas')
    }


    /* Si la app está cargando, retorna el view de carga, sino carga todo lo demas
     (ya que llena los inputs sin siquiera tener la info, esto genera error) */
    if(loading){
        return(
            <View>
                <ActivityIndicator size='large' color='#9e9e9e' />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>

            {shouldShow ? (
                <View style={styles.inputGroup}>
                    <TextInput 
                    placeholder={t('home.iURI')}
                    value={food.uri}
                    onChangeText={(value) => handleChangeText('uri', value)}/>
                </View>
            ) : null}

            {shouldShow ? (
                <View style={styles.inputGroup}>
                    <TextInput
                    placeholder={t('home.iTitulo')}
                    value={food.titulo}
                    onChangeText={(value) => handleChangeText('titulo', value)}/>
                </View>
            ) : null}
            
            {shouldShow ? (
                <View style={styles.inputGroup}>
                    <TextInput 
                    placeholder={t('home.iDecrip')}
                    value={food.descripcion}
                    onChangeText={(value) => handleChangeText('descripcion', value)}/>
                </View>
            ) : null}
            
            {shouldShow ? (
                <View>
                    <TextInput 
                    placeholder={t('home.iPasos')} 
                    multiline = 'true'
                    style = {{padding: 80}}
                    value={food.pasos}
                    onChangeText={(value) => handleChangeText('pasos', value)}/>
                </View>
            ) : null}
            
            {shouldShow ? (
                <View style={{padding: 20}}>
                    <Button color='#19AC52' title={t('home.btnAct')}  onPress={() => updateFood()} />
                </View>
            ) : null}

            {shouldShow ? (
                <View style={{padding: 20}}>
                    <Button color='#E37399' title={t('home.btnBorr')} onPress={() => deleteFood()} />
                </View>
            ) : null}
        
            { (!shouldShow) ? (
                <View style={styles.containerText}>
                    <Text style={{marginTop: 60}}>
                        <Image style={styles.image}
                            source={{uri:food.uri}}
                        />
                    </Text>
                </View>
            ) : null}

            { (!shouldShow) ? (
                <View style={styles.containerText}>
                    <Text style={styles.titulo} justifyContent='center'>
                        {food.titulo}
                    </Text>
                </View>
            ) : null}

            { (!shouldShow) ? (
                <View>
                    <Text style={styles.subTittle}>
                        {food.descripcion}
                    </Text>
                </View>
            ) : null}

            { (!shouldShow) ? (
                <View>
                    <Text style={styles.text}>
                        {food.pasos}
                    </Text>
                </View>
            ) : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    containerText: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },titulo: {
        fontSize: 40,
        color: '#34434D',
        fontWeight: 'bold',
        justifyContent: "center",
        padding: 2,
    },
    subTittle: {
        fontSize: 25,
        color: 'gray',
        marginBottom: 90,
    }, 
    text: {
        fontSize: 20,
        color: 'black',
        marginBottom: 90,
    },
    image: {
        width: 300,
        height: 300,
    },
})

export default DetalleReceta