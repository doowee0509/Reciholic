import * as React from 'react'
import './RecipeCard.css'
import { Link } from 'react-router-dom'

export default function RecipeCard({imageUrl}) {
  return ( 
    <div className='recipe-card'>
        {/* Load the main image here */}
        <Link to='/recipe/5'>
          <img src={imageUrl} alt=""/>
        </Link>
        {/* Background div. Do not delete */}
        <div className='recipe-border-top'>

        </div>

        {/* Background div do not delete */}
        <div className='recipe-border-left'>

        </div>

        {/* Border div do not delete */}
        <div className="recipe-border-container">

        </div>
  </div>
  )
}