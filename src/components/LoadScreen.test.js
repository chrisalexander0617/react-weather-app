import { render } from '@testing-library/react'
import { LoadScreen } from './LoadScreen'

test('Check if component renders', () =>{
    const component = render(LoadScreen)
    expect(component).toBeTruthy()
})