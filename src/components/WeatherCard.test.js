import { render } from '@testing-library/react'
import { WeatherCard } from './WeatherCard'

test('Check if component renders', () =>{
    const component = render(WeatherCard)
    expect(component).toBeTruthy()
})