import './Create.css'
import React, {useState, useRef, useEffect} from 'react'
import {useFetch} from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
export default function Create() {
  const [title, setTitle]=useState('')
  const [method, setMethod]=useState('')
  const [cookingTime, setCookingTime]=useState('')
  const [ingredient, setIngredient]=useState('')
  const [ingredients, setIngredients]=useState([])
  const ingredientInput=useRef(null)
  const navigate=useNavigate()

  const {postData, data, error}=useFetch('http://localhost:3000/recipes', 'POST')

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({title, ingredients, method, cookingTime: cookingTime + ' minutes'})
    
  }

  const handleAdd = (e) =>{
    e.preventDefault()
    const ing=ingredient.trim()
    //if ing is not null and there are no current ings of the same name in ingredients list, do...
    if(ing &&!ingredients.includes(ing)){
      setIngredients(ingredients=>[...ingredients, ing])
    }
    setIngredient('')
    //can type right away without having to click into input to type
    ingredientInput.current.focus()
  }

  useEffect(() => {
    if(data){
      navigate("/")
    }
  }, [data, navigate])
  

  return (
    <div className='create'>
      <div className='error'>{error && <p>Error loading data.</p>}</div>
      <h2 className='page-title'>Add a New Recipe!</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Recipe title:</span>
            <input type='text' value={title} onChange={e=>setTitle(e.target.value)} required />
          </label>

          <label>
            <span>Recipe ingredients:</span>
            <div className='ingredients'>
              <input type='text' value={ingredient} onChange={e=>setIngredient(e.target.value)} ref={ingredientInput}/>
              <button onClick={handleAdd} className='btn'>Add</button>
            </div>
          </label>
          <p>Current ingredients: {ingredients.map(ingred=><em key={ingred}>{ingred},</em>)}</p>

          <label>
            <span>Recipe method:</span>
            <textarea value={method} onChange={e=>setMethod(e.target.value)} required />
          </label>

          <label>
            <span>Cooking time (in mins):</span>
            <input type='number' value={cookingTime} onChange={e=>setCookingTime(e.target.value)} required />
          </label>

          <button type='submit' className='btn'>Submit new recipe</button>
        </form>
    </div>
  )
}
