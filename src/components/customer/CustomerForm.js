import React from "react"
import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { AnimalProvider } from "../animal/AnimalProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import "./Customer.css"

export const CustomerForm = () => {
  const { updateCustomer, getCustomerById } = useContext(CustomerContext)
  

  const [ customer, setCustomer ] = useState({
    name: "",
    address: "",
    email: ""
  })

  const [isLoading, setIsLoading] = useState(true)

  const { customerId } = useParams()

  const history = useHistory()

  useEffect(() => {
    if (customerId) {
      getCustomerById(parseInt(customerId))
      .then(customer => {
        setCustomer(customer)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  } , [])

  const handleControlledInputChange = e => {
    const newCustomer = { ...customer }

    newCustomer[e.target.id] = e.target.value

    setCustomer(newCustomer)
  }

  const handleUpdate = (e) => {
    // e.preventDefault()  

    setIsLoading(true)

      const editedCustomer = {
        id: customer.id,
        name: customer.name,
        address: customer.address,
        email: customer.email
      }
      updateCustomer(editedCustomer)
        .then(() => history.push(`/customers/detail/${customer.id}`))
    
  }

  return (
    <form className="customerForm">
      <h2 className="customerForm__title">Edit Customer</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Customer Name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Customer Name" value={customer.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="breed">Customer Address:</label>
          <input type="text" id="address" required autoFocus className="form-control" placeholder="Customer Address" value={customer.address} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="breed">Customer Email:</label>
          <input type="email" id="email" required autoFocus className="form-control" placeholder="Customer Email" value={customer.email} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault() // Prevent browser from submitting the form and refreshing the page
            handleUpdate()
          }}>
          Update Customer
      </button>
    </form>
  )
}