import React from "react"
import { useState, createContext } from "react"

//The context is imported and used by individual components that need data.
export const AnimalContext = createContext()

//This component establishes what data can be used.
export const AnimalProvider = (props) => {
  const [animals, setAnimals] = useState([])
  const [animal, setAnimal] = useState({})
  const [ searchTerms, setSearchTerms ] = useState("")


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

  const releaseAnimal = animalId => {
    return fetch(`http://localhost:8088/animals/${animalId}`, {
      method: "DELETE"
    })
    .then(getAnimals)
  }

  const updateAnimal = animalObj => {
    return fetch(`http://localhost:8088/animals/${animalObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(animalObj)
    })
    .then(getAnimals)
  }

  const getAnimalById = (animalId) => {
    return fetch(`http://localhost:8088/animals/${animalId}`)
    .then(res => res.json())
    // .then(setAnimal)
  }


  return (
    <AnimalContext.Provider value={{
      animal, animals, getAnimals, addAnimal, releaseAnimal, updateAnimal , getAnimalById, searchTerms, setSearchTerms                  
    }}>
      {props.children}
    </AnimalContext.Provider>
  )
}
