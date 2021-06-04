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
import { CustomerForm } from "./customer/CustomerForm"
import { Animal } from "./animal/Animal"
import { Employee } from "./employee/Employee"
import { Location } from "./location/Location"
import { Customer } from "./customer/Customer"
import { Welcome } from "./Welcome"
import { AnimalSearch } from "./animal/AnimalSearch"



export const ApplicationViews = () => {
  return (
    <>

      <LocationProvider>
        <AnimalProvider>
          <CustomerProvider>
            <EmployeeProvider>

              <Route exact path="/">
                <Welcome />
              </Route>

              <Route exact path="/locations">
                <LocationList />
              </Route>
              <Route exact path="/locations/detail/:locationId(\d+)">
                <Location />
              </Route>
              <Route exact path="/locations/create">
                <LocationForm />
              </Route>
              <Route path="/locations/edit/:locationId(\d+)">
                <LocationForm />
              </Route>

              <Route exact path="/animals">
                <AnimalSearch />
                <AnimalList />
              </Route>
              <Route exact path="/animals/detail/:animalId(\d+)">
                <Animal />
              </Route>
              <Route exact path="/animals/create">
                <AnimalForm />
              </Route>       
              <Route path="/animals/edit/:animalId(\d+)">
                <AnimalForm />
              </Route>

              <Route exact path="/customers">
                <CustomerList />
              </Route>
              <Route exact path="/customers/detail/:customerId(\d+)">
                <Customer />
              </Route>
              <Route path="/customers/edit/:customerId(\d+)">
                <CustomerForm />
              </Route>

              <Route exact path="/employees">
                <EmployeeList />
              </Route>
              <Route exact path="/employees/detail/:employeeId(\d+)">
                <Employee />
              </Route>
              <Route exact path="/employees/create">
                <EmployeeForm />
              </Route>
              <Route path="/employees/edit/:employeeId(\d+)">
                <EmployeeForm />
              </Route>

            </EmployeeProvider>
          </CustomerProvider>
        </AnimalProvider>
      </LocationProvider>

      {/* <LocationProvider>
        <EmployeeProvider>
          <Route exact path="/">
            <Welcome />
          </Route>
        </EmployeeProvider>
      </LocationProvider>

      <LocationProvider>
        <EmployeeProvider>
          <Route exact path="/locations">
            <LocationList />
          </Route>
          <Route exact path="/locations/detail/:locationId(\d+)">
              <Location />
            </Route>
          <Route exact path="/locations/create">
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
            <Route exact path="/animals/detail/:animalId(\d+)">
              <Animal />
            </Route>
            <Route exact path="/animals/create">
              <AnimalForm />
            </Route>       
            <Route path="/animals/edit/:animalId(\d+)">
                <AnimalForm />
            </Route>
          </LocationProvider>
        </CustomerProvider>
      </AnimalProvider>

      <CustomerProvider>
        <Route exact path="/customers">
          <CustomerList />
        </Route>
        <Route exact path="/customers/detail/:customerId(\d+)">
          <Customer />
        </Route>
      </CustomerProvider>

      <EmployeeProvider>
        <LocationProvider>
          <Route exact path="/employees">
            <EmployeeList />
          </Route>
          <Route exact path="/employees/detail/:employeeId(\d+)">
              <Employee />
            </Route>
          <Route exact path="/employees/create">
            <EmployeeForm />
          </Route>
        </LocationProvider>
      </EmployeeProvider> */}
    </>
  )
}