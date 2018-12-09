import React, { Component } from 'react';
import { Text, ScrollView, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Button } from 'react-native-elements'
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: null,
      ubicacion: {
        latitude: null,
        longitude: null
      }
    }
    this.cerrarSesion = this.cerrarSesion.bind(this);
  }


  componentWillMount() {
    let usuario = firebase.auth().currentUser;
    this.setState({ usuario });

    navigator.geolocation.getCurrentPosition((pos) => {
      let ubicacion = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }
      this.setState({ ubicacion });
    });
  }

  cerrarSesion() {
    Alert.alert(
      "¿Seguro?",
      "¿Cerrar sesión?",
      [
        { text: "No", onPress: () => console.log("Cancelar") },
        {
          text: "Si", onPress: () => {
            firebase.auth().signOut()
              .then(() => {
                this.props.navigation.replace('IniciarSesion');
              })
          }
        }
      ]
    );
  }
  render() {
    let lugares = [
      {
        nombre: "Paso del mango",
        direccion: {
          latitude: 11.2019997,
          longitude: -74.0953848
        },
        descripcion: "Lorem Ipsum dolor sit amet...",
        imagen: require("./imagenes/pasodelmango.jpg"),
        terreno: "Carretera + Trocha",
        tiempo: "1 hora 0 "
      },
      {
        nombre: "Parque tayrona - Rio piedra",
        direccion: {
          latitude: 11.281336,
          longitude: -73.907958
        },
        descripcion: "Lorem Ipsum dolor sit amet...",
        imagen: require("./imagenes/parquetayrona.jpg"),
        terreno: "Carretera",
        tiempo: "2 horas 36 "
      },
      {
        nombre: "Bahia concha",
        direccion: {
          latitude: 11.2918397,
          longitude: -74.1552247
        },
        descripcion: "Lorem Ipsum dolor sit amet...",
        imagen: require("./imagenes/bahiaconcha.jpg"),
        terreno: "Carretera + Trocha",
        tiempo: "1 hora 6 "
      },
      {
        nombre: "Cascadas de marinca",
        direccion: {
          latitude: 11.1191412,
          longitude: -74.1204932
        },
        descripcion: "Lorem Ipsum dolor sit amet...",
        imagen: require("./imagenes/cascadasdemarinca.jpg"),
        terreno: "Carretera + trocha",
        tiempo: "1 hora 46 "
      }
    ];
    let lista = [];
    lugares.map((lugar, i) => {
      let elemento =
        <Card
          title={lugar.nombre}
          image={lugar.imagen}
          key={i}>
          <Text style={{ marginBottom: 10 }}>
            {lugar.descripcion}
          </Text>
          <Button
            icon={{ name: 'code' }}
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            onPress={() => { this.props.navigation.push('Detalle', { lugar: lugar, ubicacion: this.state.ubicacion }); }}
            title='Ver ruta' />
        </Card>;
      lista.push(elemento);
    })
    return (
      <ScrollView>
        {/* <List containerStyle={{ marginBottom: 20 }}> */}
          {lista}
        {/* </List> */}
        {/* <Button
          onPress={this.cerrarSesion}
          title="Cerrar sesión"
        />
        <Text>
          {"\n"}
        </Text>
        <Button
          title="Detalles"
        /> */}
      </ScrollView>
    )
  }
}