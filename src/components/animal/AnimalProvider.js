import React from "react"
import { useState, createContext } from "react"

//The context is imported and used by individual components that need data.
export const AnimalContext = createContext()

//This component establishes what data can be used.
export const AnimalProvider = (props) => {
  const [animals, setAnimals] = useState([])

  const getAnimals = () => {
    return fetch("http://localhost:8088/animals?_expand=location&_expand=customer&_sort=location.id")
    .then(res => res.json())
    .then(setAnimals)
  }

  const addAnimal = animalObj => {
    return fetch("http://localhost:8088/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(animalObj)
    })
    .then(res => res.json())
    .then(getAnimals)
  }

  return (
    <AnimalContext.Provider value={{
      animals, getAnimals, addAnimal
    }}>
      {props.children}
    </AnimalContext.Provider>
  )
}
