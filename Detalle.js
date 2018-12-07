import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';

export default class Detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lugar: null,
            ubicacion: null,
            res: "Soy res"
        }
    }
    componentWillMount() {
        let lugar = this.props.navigation.getParam('lugar');
        let ubicacion = this.props.navigation.getParam('ubicacion');
        this.setState({
            lugar,
            ubicacion
        });
    }
    render() {
        const mode = 'BICYCLING'; // 'walking';
        const origin = "11.225837,-74.1890507";
        const destination = "11.2369249,-74.1971722";
        const APIKEY = 'AIzaSyDyawTAYbxvKNNP-FgSnS6fNQG3R6qMV6Y'; // Maps api key
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                let res = responseJson.routes[0].legs[0].steps.length;
                console.log("----------------------------------")
                console.log(responseJson)
                console.log("----------------------------------")
                this.setState({ res });
            }).catch(e => { console.warn(e) });
        return (
            <View style={estilos.contenedor}>
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
                        description={"Fin"}
                    />
                    <Marker
                        coordinate={this.state.ubicacion}
                        title={"Tu ubicación"}
                        description={"Inicio"}
                    />
                    <Polyline
                        coordinates={[this.state.lugar.direccion, this.state.ubicacion]}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />
                </MapView>
                <ScrollView style={estilos.texto}>
                    <Text>
                        {this.state.res}
                    </Text>
                </ScrollView>
            </View >
        )
    }
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: 'tomato',
    },
    mapa: {
        flex: 1
    },
    texto: {
        flex: 3,
        textAlign: 'center',
    }
});