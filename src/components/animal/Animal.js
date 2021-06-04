import React from "react"
import { useContext, useState, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { useHistory, useParams } from "react-router-dom"
import "./Animal.css"

export const Animal = ({animalObj}) => {
  const { animals, releaseAnimal, getAnimalById } = useContext(AnimalContext)
  const [ animal, setAnimal ] = useState({ location: {}, customer: {} })

  const { animalId } = useParams()
//  debugger
  

  useEffect(() => {
    if (animalId) {
      const thisAnimal = animals.find(a => a.id === parseInt(animalId)) || { location: {}, customer: {} }

      setAnimal(thisAnimal)
    } else {
      setAnimal(animalObj)
    }
     
  }, [])


  const history = useHistory()

  const handleRelease = () => {
    releaseAnimal(animal.id)
    .then(() => {
      history.push("/animals")
    })
  }

  return (
    <section className="animal">
      <h3 className="animal__name">{ animal.name }</h3> 
      <div className="animal__breed"><strong>Breed:</strong> {animal.breed}</div>
      <div className="animal__location"><strong>Location:</strong> {animal.location.name}</div>
      <div className="animal__owner"><strong>Owner:</strong> {animal.customer.name}</div>
      <button className="animal__button" onClick={handleRelease}>Release Animal</button>
      <button className="animal__button" onClick={() => {
        history.push(`/animals/edit/${animal.id}`)
        }}>Edit</button>

    </section>
  )
}