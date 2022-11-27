import React, { useEffect, useState } from "react";
import { ScrollView, Button } from 'react-native';
import firebase from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native-web";
import { useTranslation } from "react-i18next";
import './i18n'
import i18next from "./i18n";


var idUser = ''

const PantallaRecetas = (props) => {
    const { t } = useTranslation()
    const [languaje, setLanguaje] = useState('en')

    

   
    const [shouldShow, setShouldShow] = useState(true);
    const [food, setFood] = useState([]) 
    const [usuarios, setUsuarios] = useState([])
   
    useEffect(() =>{

        firebase.db.collection('recetas').onSnapshot(querySnapshot => {
            const food = []

            querySnapshot.docs.forEach((doc) => {
                const { titulo, descripcion, pasos, uri } = doc.data()
                food.push({
                    id: doc.id,
                    titulo,
                    descripcion,
                    pasos,
                    uri
                })
            })

            //console.log(food)
            setFood(food)
            setShouldShow(!shouldShow)

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
    
                //console.log(usuarios)
                setUsuarios(usuarios)

                

                for (let i = 0; i < usuarios.length; i++) {
                    idUser = ''
                    if ((usuarios[i].id == props.route.params.userId) && (usuarios[i].rol == 'Admin') ) {
                        setShouldShow(shouldShow)
                        idUser = props.route.params.userId
                        //console.log('esto es iduser', idUser)
                    } 
                }
                
            })
            
           
        })

    }, [])

    return(

        <ScrollView>
                
            {shouldShow ? (
                <Button 
                title={t('home.tRecetaNueva')}
                onPress={() => props.navigation.navigate('CrearReceta')}
                />
            ) : null}

            {food.map((food) => {
                return(
                    <ListItem 
                        key={food.id}
                        bottomDivider
                        onPress={() => {
                            props.navigation.navigate('DetalleReceta', {
                                userId: food.id, 
                                usuarioId: idUser
                                
                            })
                        }}>
                            <ListItem.Chevron/>
                            <Avatar 
                                source={{uri:food.uri}}
                                rounded
                            />
                            <ListItem.Content>
                                <ListItem.Title>{food.titulo}</ListItem.Title>
                                <ListItem.Subtitle>{food.descripcion}</ListItem.Subtitle>
                            </ListItem.Content>
                    </ListItem>

                )
            })}

        </ScrollView>
    )   



}

export default PantallaRecetas