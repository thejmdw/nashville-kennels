import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { AnimalContext } from "../animal/AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Animal.css"

export const AnimalForm = () => {
  const { addAnimal } = useContext(AnimalContext)
  const { customers, getCustomers } = useContext(CustomerContext)
  const { locations, getLocations } = useContext(LocationContext)

  /*
  With React, we do not target the DOM events with `document.querySelector()`. 
  Instead, our return (render) reacts to state or props

  Define the initial state of the form inputs with useState()
  */

  const [ animal, setAnimal ] = useState({
    name: "",
    breed: "",
    locationId: 0,
    customerId: 0
  })

  const history = useHistory()

  /*
  Reach out to the world and get customers state
  and locations state on initialization
  */
  useEffect(() => {
    getCustomers().then(getLocations)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  //When a field changes, update state. The return will re-render and display based on the values in state
  //Controlled Component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state. */
    const newAnimal = { ...animal }
    /* Animal is an object with properties.
    Set the property to the new value 
    using Object Bracket Notation. */
    newAnimal[event.target.id] = event.target.value
    //Update State
    setAnimal(newAnimal)
  }

  const handleClickSaveAnimal = (e) => {
    e.preventDefault() //Prevents the browser from submitting the form

    const locationId = parseInt(animal.locationId)
    const customerId = parseInt(animal.customerId)

    if (locationId === 0 || customerId === 0) {
      window.alert("Please select a location and a customer")
    } else {
      //Invoke addAnimal passing the newAnimal object as an argument
      //Once complete, change the url and display the animal list

      const newAnimal = {
        name: animal.name,
        breed: animal.breed,
        locationId: locationId,
        customerId: customerId
      }
      addAnimal(newAnimal)
        .then(() => history.push("/animals"))
    }
  }

  return (
    <form className="animalForm">
      <h2 className="animalForm__title">New Animal</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Animal Name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Animal Name" value={animal.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="breed">Animal Breed:</label>
          <input type="text" id="breed" required autoFocus className="form-control" placeholder="Animal Breed" value={animal.breed} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to Location:</label>
          <select name="locationId" id="locationId" className="form-control" value={animal.locationId} onChange={handleControlledInputChange}>
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="customer">Assign to Customer:</label>
          <select name="customerId" id="customerId" className="form-control" value={animal.customerId} onChange={handleControlledInputChange}>
            <option value="0">Select a customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={handleClickSaveAnimal}>
        Save Animal
      </button>
    </form>
  )


 }