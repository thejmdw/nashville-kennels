import React from "react"
import { useContext, useEffect} from "react"

import { EmployeeContext } from "./EmployeeProvider"
import "./Employee.css"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"

export const EmployeeList = () => {
  const { employees, getEmployees } = useContext(EmployeeContext)

  useEffect(() => {
    getEmployees()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory()
  return (
    <>
      <h2>Employees</h2>

      <button onClick = {
        () => history.push("/employees/create")
      }>
        Add Employee
      </button>

      <section className="Employees">
        {
          employees.map(employee => <div className="employee" key={employee.id}><h3><Link to={`/employees/detail/${employee.id}`}>
            {employee.name}</Link></h3></div>)
        }
      </section>
    </>

    // <>
    // <h2>Employees</h2>
    //   <button onClick = {
    //     () => history.push("/employees/create")
    //   }>
    //     Add Employee
    //   </button>
    // <section className="employees">
    //   {
    //     employees.map(employee => {
    //       return (
    //         <div className="employee" id={`employee--${employee.id}`} key={employee.id}>
    //           <h3 className="employee__name">
    //             {employee.name}
    //           </h3>
    //           <div className="employee__location">
    //             {employee.location.name}
    //           </div>
    //         </div>
    //       )
    //     })
    //   }
    // </section>
    // </>
  )
}