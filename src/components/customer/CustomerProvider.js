import React from "react"
import { useState, createContext } from "react"

//The context is imported and used by individual components that need data.
export const CustomerContext = createContext()

//This component establishes what data can be used.
export const CustomerProvider = (props) => {
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState({})

  const getCustomers = () => {
    return fetch("http://localhost:8088/customers?_embed=animals")
    .then(res => res.json())
    .then(setCustomers)
  }

  const addCustomer = (customerObj) => {
    return fetch("http://localhost:8088/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customerObj)
    })
    .then(getCustomers)
  }

  const updateCustomer = customerObj => {
    return fetch(`http://localhost:8088/customers/${customerObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customerObj)
    })
    .then(getCustomers)
  }

  const getCustomerById = customerId => {
    return fetch(`http://localhost:8088/customers/${customerId}`)
    .then(res => res.json())
  }
 
  return (
    <CustomerContext.Provider value={{
      customer, customers, getCustomers, addCustomer, updateCustomer, getCustomerById
    }}>
      {props.children}
    </CustomerContext.Provider>
  )
}
