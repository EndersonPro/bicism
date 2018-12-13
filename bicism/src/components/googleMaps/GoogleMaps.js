import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class GoogleMaps extends Component {
    render() {
        const { direccion, title } = this.props;
        console.log(direccion)
        return (
            <Map
                google={this.props.google}
                zoom={13}
                initialCenter={{
                    lat: direccion.latitude,
                    lng: direccion.longitude
                }}>

                <Marker
                    title={title}
                    name={title}
                    position={{
                        lat: direccion.latitude,
                        lng: direccion.longitude
                    }} />
            </Map>
        )
    }
}

/* const style = {
    width: '100%',
    height: '100%',
} */

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDyawTAYbxvKNNP-FgSnS6fNQG3R6qMV6Y")
})(GoogleMaps)
