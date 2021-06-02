import React from "react"
import { useContext, useState, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { useParams } from "react-router-dom"
import "./Animal.css"

export const Animal = () => {
  const { animals } = useContext(AnimalContext)
  const [ animal, setAnimal ] = useState({ location: {}, customer: {} })

  const { animalId } = useParams()
 
  useEffect(() => {
    const thisAnimal = animals.find(a => a.id === parseInt(animalId)) || { location: {}, customer: {} }

    setAnimal(thisAnimal)
  }, [animalId])

  return (
    <section className="animal">
      <h3 className="animal__name">{ animal.name }</h3>
      <div className="animal__breed"><strong>Breed:</strong> {animal.breed}</div>
      <div className="animal__location"><strong>Location:</strong> {animal.location.name}</div>
      <div className="animal__owner"><strong>Owner:</strong> {animal.customer.name}</div>
    </section>
  )
}