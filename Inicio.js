import React, { Component } from 'react';
import { Text, ScrollView, Alert, ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Button, ButtonGroup } from 'react-native-elements'

export default class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: null,
      ubicacion: {
        latitude: null,
        longitude: null
      },
      lugares: [],
      loader: true,
      tabActual: 0,
    }
    this.cerrarSesion = this.cerrarSesion.bind(this);
    this.cambiarTab = this.cambiarTab.bind(this);
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
    let lugares = [];
    firebase.firestore().collection("rutas").get()
      .then((res) => {
        res.forEach((lugar) => {
          lugares.push(lugar.data());
        });
        this.setState({ lugares });
        this.setState({ loader: false });
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
  cambiarTab(tabActual) {
    this.setState({ tabActual });
  }
  render() {
    const buttons = ['Rutas', 'Perfil'];
    const { tabActual } = this.state;
    let lista = [];
    let cambiarTab = <ButtonGroup
      onPress={this.cambiarTab}
      selectedIndex={tabActual}
      buttons={buttons}
      containerStyle={{ height: 50 }}
    />;
    this.state.lugares.map((lugar, i) => {
      let elemento =
        <Card
          title={lugar.nombre}
          image={{ uri: lugar.imagen }}
          key={i}>
          <Text style={{ marginBottom: 10 }}>
            {lugar.descripcion}
          </Text>
          <Button
            icon={{ name: 'directions-bike' }}
            backgroundColor='#03A9F4'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            onPress={() => { this.props.navigation.push('Detalle', { lugar: lugar, ubicacion: this.state.ubicacion }); }}
            title='Ver ruta' />
        </Card>;
      lista.push(elemento);
    })
    return (
      <View style={estilos.contenedor}>
        {
          this.state.loader ?
            <ActivityIndicator size="large" color="#ff0000" />
            :
            this.state.tabActual == 0 ?
              <ScrollView>
                {cambiarTab}
                {lista}
              </ScrollView>
              :
              <ScrollView>
                {cambiarTab}
                <ScrollView style={styles.container}>
                  <View style={styles.badge}>
                    <Image style={styles.avatar} source={require("./imagenes/bike.png")} />
                    <View style={styles.badgeInfo}>
                      <Text style={styles.name}>{this.state.usuario.email}</Text>
                    </View>
                  </View>
                  <View style={styles.description}>
                    <Text style={styles.title}>{this.state.usuario.displayName}</Text>
                    <Button
                      icon={{ name: 'exit-to-app' }}
                      backgroundColor='#03A9F4'
                      buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                      onPress={() => { this.cerrarSesion(); }}
                      title='Cerrar sesión' />
                  </View>
                </ScrollView>
              </ScrollView>
        }
      </View>
    )
  }
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    justifyContent: "center"
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  badge: {
    alignItems: 'center',
    padding: 15
  },
  badgeInfo: {
    alignItems: 'center',
    flex: 1
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#3B3738',
    borderWidth: 4,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8
  }
});