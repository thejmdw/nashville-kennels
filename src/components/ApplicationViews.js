import React from "react"
import { Route } from "react-router-dom"
import { LocationProvider } from "./location/LocationProvider"
import { AnimalProvider } from "./animal/AnimalProvider"
import { CustomerProvider } from "./customer/CustomerProvider"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import { LocationList } from "./location/LocationList"
import { AnimalList } from "./animal/AnimalList"
import { CustomerList } from "./customer/CustomerList"
import { EmployeeList } from "./employee/EmployeeList"
import { AnimalForm } from "./animal/AnimalForm"
import { EmployeeForm } from "./employee/EmployeeForm"
import { LocationForm } from "./location/LocationForm"


export const ApplicationViews = () => {
  return (
    <>
      <LocationProvider>
        <EmployeeProvider>
          <Route exact path="/">
            <LocationList />
          </Route>
        </EmployeeProvider>
      </LocationProvider>

      <LocationProvider>
        <EmployeeProvider>
          <Route exact path="/locations">
            <LocationList />
          </Route>
          <Route path="/locations/create">
              <LocationForm />
            </Route>
        </EmployeeProvider>
      </LocationProvider>

      <AnimalProvider>
        <CustomerProvider>
          <LocationProvider>
            <Route exact path="/animals">
              <AnimalList />
            </Route>
            <Route path="/animals/create">
              <AnimalForm />
            </Route>
          </LocationProvider>
        </CustomerProvider>
      </AnimalProvider>

      <CustomerProvider>
        <Route exact path="/customers">
          <CustomerList />
        </Route>
      </CustomerProvider>

      <EmployeeProvider>
        <LocationProvider>
          <Route exact path="/employees">
            <EmployeeList />
          </Route>
          <Route path="/employees/create">
            <EmployeeForm />
          </Route>
        </LocationProvider>
      </EmployeeProvider>
    </>
  )
}