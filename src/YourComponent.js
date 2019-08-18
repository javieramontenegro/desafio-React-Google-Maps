import React, { Component } from 'react';


class YourComponent extends Component {
  render() {
    return (
      <div style={divStyle} id="map">
        <h1> Put your solution here!</h1>
     {/* <GoogleMap/> */}
      </div>
    );
  }
}

var divStyle = {
  border: 'red',
  borderWidth: 2,
  borderStyle: 'solid',
  padding: 20
};

export default YourComponent;
