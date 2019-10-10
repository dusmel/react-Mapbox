import React, { Component } from 'react';
import ReactMapGl from 'react-map-gl';
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
    }
  };

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
        let newViewport = {
            height: "100vh",
            width: "100vw",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 12
        }
        this.setState({
            viewport: newViewport
        });
    });
  }

  render(){
    const { viewport } = this.state;
    return (
      <div className="App">
        <button onClick={this.setUserLocation}>My location</button>
       <ReactMapGl
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken="pk.eyJ1IjoiZHVzbWVsIiwiYSI6ImNrMWtqcnEwbTBjNDkzanBiY2lxc2RnbzMifQ.f6t_g6R1pUpPh7syoVygRA"
        onViewportChange={(userViewport => this.setState({ viewport: userViewport }))}
        >
       </ReactMapGl>
      </div>
    );
  }
}

export default MapBox;
