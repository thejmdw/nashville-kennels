import React from "react"
import { useContext, useEffect} from "react"
import { LocationContext } from "./LocationProvider"
import { EmployeeContext } from "../employee/EmployeeProvider"
import "./Location.css"
import { useHistory } from "react-router"

export const LocationList = () => {
  const { locations, getLocations } = useContext(LocationContext)
  const { employees, getEmployees } = useContext(EmployeeContext)
  
  useEffect(() => {
    getLocations().then(getEmployees)
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   getEmployees()
  // }, [])
  const history = useHistory()
  return (
    <>
    <h2>Locations</h2>
      <button onClick = {
        () => history.push("/locations/create")
      }>
        Add Location
      </button>
    <section className="locations">
      {
        locations.map(location => {

          const locationEmployees = employees.filter(employee => employee.locationId === location.id)

          return (
            <div className="location" id={`location--${location.id}`} key={location.id}>
              <h3 className="location__name">
                {location.name}
              </h3>
              <div className="location__address">
                {location.address}
              </div>
              <div className="location__employees"><strong>Employees</strong>
                { locationEmployees.map(employee => {
                  return (
                  <li className="location__employee">{employee.name}</li>
                  )
                })}
              </div>
              <div className="location__animals"><strong>Animals</strong>
              { location.animals.map(animal=> {
                  return (
                  <li className="location__animal">{animal.name}</li>
                  )
                })}
              </div>
              
            </div>
          )
        })
      }
    </section>
    </>
  )
}