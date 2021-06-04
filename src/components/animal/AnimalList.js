import React, { useState } from "react"
import { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import {Animal} from "./Animal"
import { Link, useHistory, useParams } from "react-router-dom"
import "./Animal.css"
import { AnimalSearch } from "./AnimalSearch"

export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals, getAnimalById, searchTerms } = useContext(AnimalContext)
  const animalId = useParams()

  const history = useHistory()
  const [ filteredAnimals, setFilteredAnimals ] = useState([])
  //useEffect - reach out to the world for something 
  useEffect(() => {
    console.log("AnimalList: useEffect - getAnimals")
    getAnimals()
    .then(getAnimalById(animalId))
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchTerms !== "") {
      
      // If the search field is not blank, display matching animals
      const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms.toLowerCase()))
      setFilteredAnimals(subset)
    } else {
      // If the search field is blank, display all animals
      setFilteredAnimals(animals)
    }
  }, [searchTerms, animals])


  return (

    <>
      <h2>Animals</h2>
      
      <button onClick = {
        () => history.push("/animals/create")
      }>
        Add Animal
      </button>
      
      {/* <div className="animalSearch">
      <AnimalSearch />
      </div> */}

      <section className="animals">
        {console.log("AnimalList: Render", animals)}
        {
          filteredAnimals.map(animal => {
            {
              return <Animal key={animal.id} animalObj={animal} />
            }
          }
          )


        //   <div className="animal" key={animal.id}><h3><Link to={`/animals/detail/${animal.id}`}>
        //   {animal.name}
        // </Link></h3>
        // <div><strong>Breed:</strong> {animal.breed}</div></div>

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