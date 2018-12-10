import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { ButtonGroup } from 'react-native-elements';

export default class IniciarSesion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: "",
            pass: "",
            nombre: "",
            mensaje: "",
            tabActual: 0,
        };
        this.iniciarSesion = this.iniciarSesion.bind(this);
        this.registrarse = this.registrarse.bind(this);
        this.cambiarTab = this.cambiarTab.bind(this);
    }

    componentWillMount() {
        console.log("debug")
        var subs = firebase.auth().onAuthStateChanged((usuario) => {
            if (usuario) {
                this.setState({
                    usuario: '',
                    pass: ''
                });
                this.props.navigation.replace('Inicio');
            }
        });
        subs();
    }
    cambiarTab(tabActual) {
        this.setState({ tabActual });
    }

    iniciarSesion() {
        firebase.auth().signInWithEmailAndPassword(this.state.usuario, this.state.pass)
            .then(() => {
                this.setState({
                    usuario: '',
                    pass: ''
                });
                this.props.navigation.replace('Inicio');
            })
            .catch((error) => {
                Alert.alert(
                    "Error",
                    error.message,
                    [
                        { text: "Cancelar", onPress: () => console.log("Cancelar") },
                        { text: "Ok", onPress: () => console.log("Ok") }
                    ]
                );
            });
    }

    registrarse() {
        firebase.auth().createUserWithEmailAndPassword(this.state.usuario, this.state.pass)
            .then((datos) => {
                datos.user.updateProfile({
                    displayName: this.state.nombre,
                    photoURL: ""
                }).then(() => {
                    Alert.alert(
                        "¡Excelente!",
                        "Cuenta creada, ya puedes iniciar sesión",
                        [
                            { text: "Iniciar sesión", onPress: () => this.cambiarTab(0) }
                        ]
                    );
                })
            })
            .catch((error) => {
                Alert.alert(
                    "Error",
                    error.message,
                    [
                        { text: "Cancelar", onPress: () => console.log("Cancelar") },
                        { text: "Ok", onPress: () => console.log("Ok") }
                    ]
                );
            });
    }

    render() {
        const buttons = ['Iniciar Sesión', 'Registrarse'];
        const { tabActual } = this.state;

        let cambiarTab = <ButtonGroup
            onPress={this.cambiarTab}
            selectedIndex={tabActual}
            buttons={buttons}
            containerStyle={{ height: 50 }}
        />;
        return (
            <View style={estilos.contenedor}>
                {
                    this.state.tabActual == 0 ?
                        <ScrollView style={{ padding: 20 }}>
                            {cambiarTab}
                            <TextInput
                                placeholder='Correo Electronico'
                                onChangeText={(usuario) => this.setState({ usuario })}
                                value={this.state.usuario}
                            />
                            <TextInput
                                placeholder='Contraseña'
                                onChangeText={(pass) => this.setState({ pass })}
                                value={this.state.pass}
                                secureTextEntry={true}
                            />
                            <Button
                                onPress={this.iniciarSesion}
                                disabled={!this.state.usuario || !this.state.pass}
                                title="Iniciar sesión"
                            />
                        </ScrollView>
                        :
                        <ScrollView style={{ padding: 20 }}>
                            {cambiarTab}
                            <TextInput
                                placeholder='Nombre y apellido'
                                onChangeText={(nombre) => this.setState({ nombre })}
                                value={this.state.nombre}
                            />
                            <TextInput
                                placeholder='Correo Electronico'
                                onChangeText={(usuario) => this.setState({ usuario })}
                                value={this.state.usuario}
                            />
                            <TextInput
                                placeholder='Contraseña'
                                onChangeText={(pass) => this.setState({ pass })}
                                value={this.state.pass}
                                secureTextEntry={true}
                            />
                            <Button
                                onPress={this.registrarse}
                                disabled={!this.state.usuario || this.state.pass.length <= 5 || !this.state.nombre}
                                title="Registrarse"
                            />
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