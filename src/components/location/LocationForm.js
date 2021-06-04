import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { LocationContext } from "../location/LocationProvider"
import "./Location.css"


export const LocationForm = () => {
  const { addLocation, updateLocation, getLocationById } = useContext(LocationContext)
  
  const [ location, setLocation ] = useState({
    name: "",
    address: ""
  })

  const history = useHistory()

  const [isLoading, setIsLoading] = useState(true)

  const { locationId } = useParams()

  useEffect(() => {
    if (locationId) {
      getLocationById(parseInt(locationId))
      .then(location => {
        setLocation(location)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleControlledInputChange = e => {
    const newLocation = { ...location}
    newLocation[e.target.id] = e.target.value
    setLocation(newLocation)
  }

  const handleClickSaveLocation = e => {
    // e.preventDefault() 

    setIsLoading(true)
      if (locationId) {

        const editedLocation = {
          id: location.id,
          name: location.name,
          address: location.address,
        }
        updateLocation(editedLocation)
          .then(() => history.push(`/locations/detail/${location.id}`))

      } else {
        //Invoke addAnimal passing the newAnimal object as an argument
        //Once complete, change the url and display the animal list

        const newLocation = {
          name: location.name,
          address: location.address,
        }
        addLocation(newLocation)
          .then(() => history.push("/locations"))
      }
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
      
      <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleClickSaveLocation()
          }}>
        {locationId ? <>Save Location</> : <>Update Location</>}</button>
    </form>
  )
}
