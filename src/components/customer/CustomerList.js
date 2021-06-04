import React from "react"
import { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import "./Customer.css"
import { Link } from "react-router-dom"

export const CustomerList = () => {
  const { customers, getCustomers } = useContext(CustomerContext)

  useEffect(() => {
    getCustomers()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="customers">
      {
        customers.map(customer => 
          <div className="customer" key={customer.id}>
            <h3><Link to={`/customers/detail/${customer.id}`}>
            {customer.name}  
            </Link></h3>
          </div>
        //   {

        //   return (
        //     <div className="customer" id={`customer--${customer.id}`} key={customer.id}>
        //       <h3 className="customer__name">
        //         {customer.name}
        //       </h3>
        //       <div className="customer__address">
        //         {customer.address}
        //       </div>
        //       <div className="customer__animals"><strong>Animals</strong>
        
        //         { customer.animals.map(animal=> {
        //           return (
        //           <li className="customer__animal" key={animal.id}>{animal.name}</li>
        //           )
        //         })}
              
        //       </div>
        //     </div>
        //   )
        // }
        )
      }
    </section>
  )
}
