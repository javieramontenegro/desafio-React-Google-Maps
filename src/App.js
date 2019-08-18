import React, { useState } from 'react';
import './App.css';
import List from './List'
import * as dataStore from "./store_directory.json"
/* import YourComponent from "./YourComponent"; */
import {GoogleMap,withScriptjs,withGoogleMap,Marker,InfoWindow} from "react-google-maps"


class Map extends React.Component{
 
  
  constructor(props) {
    super(props);
    this.state = {
      selectedStore: null,
      favorites:[]
    };
    this.addList = this.addList.bind(this);
    this.removeList = this.removeList.bind(this)
  }
  addList(store) {
console.log(store)
    let existsFav = false;
    
    this.state.favorites.forEach(storeList => {
    
    if(storeList.Name === store.Name){
    
    existsFav = true; }})
    
    if(!existsFav){
    
    this.setState({favorites:  this.state.favorites.concat([store]) })
    
    alert("Tienda agregada a favoritos")
    
    }
    
    else{
    
    alert("Ya existe esta tienda en favoritos ⭐")
    
    }
    
    
    
    }
    
    removeList(store) {

      const removed = this.state.favorites.filter(deleteStore => deleteStore.Name !== store.Name)
       this.setState({ favorites: removed })
      
      }



 render(){
  return(
   <React.Fragment>
<h1>Lista de favoritos</h1>

{this.state.favorites.map((ele,index)=>
 <React.Fragment>
 <div>
   <button className="delete" key={ele.Name}   onClick={()=>{ this.removeList(ele) }}>X</button>
 
  </div>
  <div  className="list-store">  <p key={index}>{ele.Name}</p>              </div>
  </React.Fragment>
 
  )}



<GoogleMap 
      defaultZoom={12}
      defaultCenter={{lat:19.432608,lng:-99.133209}}
               >
              {dataStore.map(store=>(
           <Marker 
                 key={store.Name}
                 position={{
                      lat:store.Coordinates.lat,
                      lng:store.Coordinates.lng
                          }}
                 onClick={()=>{
                  this.setState({ selectedStore: store})
                  this.addList(store)      
                         }}
               />

               ))}
         { this.state.selectedStore && (
  
                   <InfoWindow
                        position={{
                             lat:this.state.selectedStore.Coordinates.lat,
                             lng:this.state.selectedStore.Coordinates.lng
                                  }}
                                  onCloseClick={()=>{
                                    this.setState({ selectedStore: null})
                                          
                                           }}
 
                               >
 
                         <div>
                           <p>{this.state.selectedStore.Name}  </p>
                           <p>{this.state.selectedStore.Address} </p>
                         
                         </div>
 
                      </InfoWindow>
                     
                           )}


  </GoogleMap>
 
  </React.Fragment>
  
     );
                            }
}

const WrappedMap=withScriptjs(withGoogleMap(Map));

export default function App(){

    return(
      <React.Fragment>
      <h1 className="title">Mapa de tiendas</h1>
     <div className="border">
       <div className="map">
             <WrappedMap
             googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A`}
             loadingElement={<div style={{ height: `100%` }} />}
             containerElement={<div style={{ height: `100%` }} />}
             mapElement={<div style={{ height: `100%` }} />}
             />
         </div>
        
     </div> 
   </React.Fragment>
   )
}


