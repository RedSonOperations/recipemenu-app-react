import { useFetch } from '../../hooks/useFetch'
import './Recipe.css'
import React from 'react'
import {useParams} from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

export default function Recipe() {
  // below same as:
  // const params=useParams()
  // const id=params.id
  // const url="http://localhost:3000/recipes/"+id
  const {id} = useParams()
  const url="http://localhost:3000/recipes/"+id
  const {data: recipe, isPending, error}=useFetch(url)
  const {mode}=useTheme()
  // const navigate=useNavigate()

  // useEffect(() => {
  //   if(error){
  //     setTimeout(()=>navigate('/'), 1000)
  //   }
  // }, [error])
  
  return (
    <div className={`recipe ${mode}`}>
        {isPending && <p className='loading'>Loading Recipe...</p>}
        {error && <p className='error'>{error}</p>}
        {recipe && 
          <>
            <h1 className='page-title'>{recipe.title}</h1>
            <p>Takes {recipe.cookingTime} to cook.</p>
            <ul>
              {recipe.ingredients.map(ingred=><li key={ingred}>{ingred}</li>
              )}
            </ul>
            <p className='method'>{recipe.method}</p>
          </>
        }
    </div>

  )
}
