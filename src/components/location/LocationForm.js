import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { LocationContext } from "../location/LocationProvider"
import "./Location.css"


export const LocationForm = () => {
  const { addLocation } = useContext(LocationContext)
  
  const [ location, setLocation ] = useState({
    name: "",
    address: ""
  })

  const history = useHistory()

  const handleControlledInputChange = e => {
    const newLocation = { ...location}
    newLocation[e.target.id] = e.target.value
    setLocation(newLocation)
  }

  const handleClickSaveLocation = e => {
    e.preventDefault() 

    const newLocation = {
        name: location.name,
        address: location.address
    }
    
    addLocation(newLocation)
      .then(() => history.push("/Locations"))
  }

  return (
    <form className="locationForm">
      <h2 className="locationForm__title">New Location</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Location Name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Location Name" value={location.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="address">Location Address:</label>
          <input type="text" id="address" required autoFocus className="form-control" placeholder="Location Address" value={location.address} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      
      <button className="btn btn-primary" onClick={handleClickSaveLocation}>
        Save Location
      </button>
    </form>
  )
}
