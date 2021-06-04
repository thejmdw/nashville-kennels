import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"
import "./Employee.css"

export const EmployeeForm = () => {
  const { addEmployee, updateEmployee, getEmployeeById } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  const [ employee, setEmployee ] = useState({
    name: "",
    locationId: 0
  })

  const [isLoading, setIsLoading] = useState(true)

  const { employeeId } = useParams()

  const history = useHistory()

  useEffect(() => {
    getLocations()
      .then(() => {
        if (employeeId) {
          getEmployeeById(parseInt(employeeId) )
           .then(employee => {
             setEmployee(employee)
             setIsLoading(false)
           })
        } else {
          setIsLoading(false)
        }
      })
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
      setIsLoading(true)
      if (employeeId) {

        const editedEmployee = {
          id: employee.id,
          name: employee.name,
          locationId: locationId,
        }
        updateEmployee(editedEmployee)
          .then(() => history.push(`/employees/detail/${employee.id}`))

      } else {
        //Invoke addAnimal passing the newAnimal object as an argument
        //Once complete, change the url and display the animal list

        const newEmployee = {
          name: employee.name,
          locationId: locationId,
        }
        addEmployee(newEmployee)
          .then(() => history.push("/employees"))
      }
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