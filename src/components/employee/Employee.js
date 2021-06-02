import React from "react"
import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./Employee.css"
import { EmployeeContext } from "./EmployeeProvider"

export const Employee = () => {
  const { employees } = useContext(EmployeeContext)
  const [ employee, setEmployee ] = useState({ location:{} })

  const { employeeId } = useParams()

  useEffect(() => {
    const thisEmployee = employees.find(e => e.id === parseInt(employeeId)) || { location: {} }

    setEmployee(thisEmployee)
  }, [employeeId])

  return (
    <section className="employee">
      <h3 className="employee__name">{employee.name}</h3>
      <div className="employee__location"><strong>Location: </strong>{employee.location.name}</div>
    </section>
  )
}