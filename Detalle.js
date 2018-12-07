import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lugar: null
        }
    }
    componentWillMount() {
        let lugar = this.props.navigation.getParam('lugar');
        this.setState({
            lugar
        });
    }
    render() {
        return (
            <View style={estilos.contenedor}>
                <Text style={estilos.texto}>
                    {this.state.lugar.nombre}
                </Text>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={estilos.mapa}
                    region={{
                        latitude: this.state.lugar.direccion.latitude,
                        longitude: this.state.lugar.direccion.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    zoomEnabled={false}
                    scrollEnabled={false}>
                    <Marker
                        coordinate={this.state.lugar.direccion}
                        title={this.state.lugar.nombre}
                        description={this.state.lugar.descripcion}
                    />

                </MapView>
            </View>
        )
    }
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: 'tomato',
    },
    texto: {
        top: 40,
        flex: 1,
        textAlign: 'center',
    },
    mapa: {
        flex: 3
    }
});