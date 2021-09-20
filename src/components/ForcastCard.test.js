import { render } from '@testing-library/react'
import { ForcastCard } from './ForcastCard'

test('Check if component renders', () =>{
    const component = render(ForcastCard)
    expect(component).toBeTruthy()
})