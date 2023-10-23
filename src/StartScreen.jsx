import React from 'react'

export default function StartScreen ({NumQuestions , dispatch}) {
  return (
    <div className='start'>
        <h2>Welcome to The React Quiz!</h2>
        <h3>{NumQuestions} Questions To Test Your React Mastery </h3>
        <button className='btn btn-ui' 
         onClick={()=> dispatch({ type: "start" })} 
         >Let`s Start</button>
    </div>
  )
}
