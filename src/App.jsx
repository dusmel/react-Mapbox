import React, { Component } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import logo from './logo.svg';
import './App.css';

class MapBox extends Component {
  state = {
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: -1.959630,
      longitude: 30.058069,
      zoom: 16,
    },
    userLocation: {},
    markerSetted: false,
  };

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
        const newViewport = {
            height: "100vh",
            width: "100vw",
            zoom: 17,
            ...userLocation,
        }
        this.setState({
            viewport: newViewport,
            userLocation,
            markerSetted: true,
        });
    });
  }

  pulsingDot () {
    return (
      <div class="ring-container">
          <div class="ringring"></div>
          <div class="circle"></div>
      </div>
    );
  }

  render(){
    const { viewport, markerSetted, userLocation } = this.state;
    return (
      <div className="App">
        <button onClick={this.setUserLocation}>My location</button>
       <ReactMapGl
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken="pk.eyJ1IjoiZHVzbWVsIiwiYSI6ImNrMWtqcnEwbTBjNDkzanBiY2lxc2RnbzMifQ.f6t_g6R1pUpPh7syoVygRA"
        onViewportChange={(userViewport => this.setState({ viewport: userViewport }))}
        >
          {markerSetted && (
            <Marker
              {...userLocation}
            >
              {this.pulsingDot()}
            </Marker>
          )}
       </ReactMapGl>
      </div>
    );
  }
}

export default MapBox;
