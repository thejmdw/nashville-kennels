import React from "react"
import { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { Link, useHistory } from "react-router-dom"
import "./Animal.css"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext)

  //useEffect - reach out to the world for something 
  useEffect(() => {
    console.log("AnimalList: useEffect - getAnimals")
    getAnimals()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory()

  return (

    <>
      <h2>Animals</h2>
      
      <button onClick = {
        () => history.push("/animals/create")
      }>
        Add Animal
      </button>
      
      <section className="animals">
        {console.log("AnimalList: Render", animals)}
        {
          animals.map(animal => <div className="animal"><h3><Link to={`/animals/detail/${animal.id}`}>
            {animal.name}
          </Link></h3>
          <div><strong>Breed:</strong> {animal.breed}</div></div>
          )

          // animals.map(animal => {
          //   return (
          //     <div className="animal" id={`animal--${animal.id}`} key={animal.id}>
          //       <h3 className="animal__name">
          //         { animal.name }
          //       </h3>
          //       <div className="animal__breed">
          //         <strong>Breed:</strong> { animal.breed }
          //       </div>
          //       <div className="animal__owner">
          //         <strong>Owner:</strong> {animal.customer.name}
          //       </div>
          //       <div className="animal__location">
          //         <strong>Location:</strong> {animal.location.name}
          //       </div>
          //     </div>
          //   )
          // })
        }
      </section>
    </>
  )                                                                        
}