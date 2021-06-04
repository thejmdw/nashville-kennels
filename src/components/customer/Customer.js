import React from "react"
import { useContext, useEffect, useState } from "react"
import { CustomerContext } from "./CustomerProvider"
import "./Customer.css"
import { useParams, useHistory } from "react-router-dom"

export const Customer = () => {
  const { customers } = useContext(CustomerContext)
  const [ customer, setCustomer ] = useState({ animals: [] })

  const { customerId } = useParams()

  useEffect(() => {
    const thisCustomer = customers.find(c => c.id === parseInt(customerId)) || { animals: [] }

    setCustomer(thisCustomer)
  }, [customerId])

  const history = useHistory()

  return (
    <section className="customer">
      <h3 className="customer__name">{customer.name}</h3>
      <div className="customer__address"><strong>Address: </strong>{customer.address}</div>
      <div className="customer__animals"><strong>Animals:</strong>
      {customer.animals.map(animal => 
          <li className="customer_animal">{animal.name}</li>
        )}
      </div>
      <button onClick={() => {
        history.push(`/customers/edit/${customer.id}`)
        }}>Edit</button>
    </section>
  )
}