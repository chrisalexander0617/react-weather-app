import { render } from '@testing-library/react'
import { Forcast } from './Forcast'

test('Check if component renders', () =>{
    const component = render(Forcast)
    expect(component).toBeTruthy()
})