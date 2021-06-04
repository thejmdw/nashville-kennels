import React from "react"
import { useState, createContext } from "react"

//The context is imported and used by individual components that need data.
export const EmployeeContext = createContext()

//This component establishes what data can be used.
export const EmployeeProvider = (props) => {
  const [employees, setEmployees] = useState([])
  const [employee, setEmployee] = useState({})

  const getEmployees = () => {
    return fetch("http://localhost:8088/employees?_expand=location")
    .then(res => res.json())
    .then(setEmployees)
  }

  const addEmployee = (employeeObj) => {
    return fetch("http://localhost:8088/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employeeObj)
    })
    .then(res => res.json())
    .then(getEmployees)
  }

  const updateEmployee = employeeObj => {
    return fetch(`http://localhost:8088/customers/${employeeObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employeeObj)
    })
    .then(getEmployees)
  }

  const getEmployeeById = employeeId => {
    return fetch(`http://localhost:8088/customers/${employeeId}`)
    .then(res => res.json())
  }

  return (
    <EmployeeContext.Provider value={{
      employee, employees, getEmployees, addEmployee, updateEmployee, getEmployeeById
    }}>
      {props.children}
    </EmployeeContext.Provider>
  )
}
