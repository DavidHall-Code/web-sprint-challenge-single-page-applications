import React from 'react'
import { useHistory } from 'react-router-dom'
import image from './assets/Pizza.jpg'

const HomePage = (props) => {
    const history = useHistory()
    console.log('history', history)
    const navToPizzaForm = (e) => {
        history.push('/pizza')
    }

    return (
        <>
        <image alt='pizza-image' id='homePage-image' src={image} />
        <h2>Craving the tase of pizza cooked by Dragons Breath</h2>
        <button className='homePage-button' onClick={navToPizzaForm}>ORDER NOW</button>
        </>
    )
}

export default HomePage