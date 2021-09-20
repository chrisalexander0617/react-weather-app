import { render } from '@testing-library/react'
import { Nav } from './Nav'

test('Check if component renders', () =>{
    const component = render(Nav)
    expect(component).toBeTruthy()
})