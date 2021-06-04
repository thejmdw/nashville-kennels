import React from "react"
import { useState, createContext } from "react"

//The context is imported and used by individual components that need data.
export const LocationContext = createContext()

//This component establishes what data can be used.
export const LocationProvider = (props) => {
  const [locations, setLocations] = useState([])
  const [location, setLocation] = useState({})

  const getLocations = () => {
    return fetch("http://localhost:8088/locations?_embed=animals&_embed=employees")
    .then(res => res.json())
    .then(setLocations)
  }

  const addLocation = (locationObj) => {
    return fetch("http://localhost:8088/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(locationObj)
    })
    .then(getLocations)
  }

  const updateLocation = locationObj => {
    return fetch(`http://localhost:8088/locations/${locationObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(locationObj)
    })
    .then(getLocations)
  }

  const getLocationById = (locationId) => {
    return fetch(`http://localhost:8088/locations/${locationId}`)
    .then(res => res.json())
  }

  return (
    <LocationContext.Provider value={{
      location, locations, getLocations, addLocation, updateLocation, getLocationById
    }}>
      {props.children}
    </LocationContext.Provider>
  )
}