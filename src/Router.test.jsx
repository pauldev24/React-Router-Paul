import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Router } from './Router'
import { getCurrentPath } from './utils'
import { Link } from './Link'
import Route from './Route'
vi.mock('./utils.js', () => ({
    getCurrentPath: vi.fn()
}))
describe('Router', () => {
    beforeEach(() => {
        cleanup()
        vi.clearAllMocks()
    })
    it('should work without problems', () => {
        render(<Router routes={[]} />)
        expect(true).toBeTruthy()
    })

    it('should render 404 if no routes match', () => {
        render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
        expect(screen.getByText('404')).toBeTruthy()
    })

    it('should render the component of the first route that matches', () => {
        getCurrentPath.mockReturnValue('/about')
        const routes = [
            {
                path: '/',
                Component: () => <h1>Home</h1>
            },
            {
                path: '/about',
                Component: () => <h1>About</h1>
            }
        ]

        render(<Router routes={routes} />)
        expect(screen.getByText('About')).toBeTruthy()
    })

    it('should navigate using links',async () => {
        getCurrentPath.mockReturnValueOnce('/')

        render(
            <Router>
                <Route path='/' Component={() => {
                    return (
                        <>
                            <h1>Home</h1>
                            <Link to='/about'>About</Link>
                        </>
                    )
                }} />
                <Route path='/about' Component={()=><h1>About</h1>}/>

            </Router>
        )

        //Clic al link
        const button = screen.getByText(/About/)
        fireEvent.click(button)

        const aboutTitle= await screen.findByText('About')

        //Check la nueva ruta
        expect(aboutTitle).toBeTruthy()
    })
})