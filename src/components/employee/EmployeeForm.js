import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"
import "./Employee.css"

export const EmployeeForm = () => {
  const { addEmployee } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  const [ employee, setEmployee ] = useState({
    name: "",
    locationId: 0
  })

  const history = useHistory()

  useEffect(() => {
    getLocations()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleControlledInputChange = e => {
    const newEmployee = { ...employee}
    newEmployee[e.target.id] = e.target.value
    setEmployee(newEmployee)
  }

  const handleClickSaveEmployee = e => {
    e.preventDefault() 

    const locationId = parseInt(employee.locationId)

    if (locationId === 0) {
      window.alert("Please select a location")
    } else {
      const newEmployee = {
        name: employee.name,
        locationId: locationId
      }
      addEmployee(newEmployee)
      .then(() => history.push("/employees"))
    }
  }

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Employee Name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Employee Name" value={employee.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to Location:</label>
          <select name="locationId" id="locationId" className="form-control" value={employee.locationId} onChange={handleControlledInputChange}>
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={handleClickSaveEmployee}>
        Save Employee
      </button>
    </form>
  )
}