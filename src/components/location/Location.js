import React from "react"
import { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import { useParams } from "react-router-dom"
import "./Location.css"

export const Location = () => {
  const { locations } = useContext(LocationContext)
  const [ location, setLocation ] = useState({ animals: [], employees: [] })

  const { locationId } = useParams()

  useEffect(() => {
    const thisLocation = locations.find(l => l.id === parseInt(locationId)) || { animals: [], employees: [] }

    setLocation(thisLocation)
  }, [locationId])

  return (
    <section className="location">
      <h3 className="location__name">{location.name}</h3>
      <div className="location__address"><strong>Address: </strong>{location.address}</div>
      <div className="location__animals"><strong>Animals:</strong>{ location.animals.map(animal=> {
                  return (
                  <li className="location__animal">{animal.name}</li>
                  )
                })}</div>
      <div className="location__employees"><strong>Employees:</strong>{ location.employees.map(employee => {
        return ( 
          <li className="location__employee">{employee.name}</li>
        )
      })}</div>
    </section>
  )
}