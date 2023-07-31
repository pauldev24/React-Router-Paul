import { useEffect, useState } from 'react'
import { EVENTS } from './const'
import { match } from 'path-to-regexp'
import { Children } from 'react'
import { getCurrentPath } from './utils'

export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> }) {
    const [currenPath, setCurrentPath] = useState
        (getCurrentPath)

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(getCurrentPath)
        }

        //El popstate es para manejar el retroceso y el push para abrir hacia adelante
        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.addEventListener(EVENTS.POPSTATE, onLocationChange)

        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
        }
    }, [])

    let routeParams = {}

    //Añadir las rutas del children <Route />
    const routesFromChildren = Children.map(children, ({ props, type }) => {
        const { name } = type
        const isRoute = name == 'Route'

        return isRoute ? props : null
    })

    //Unirlo a las rutas ya añadidas
    const routeToUse = routes.concat(routesFromChildren).filter(Boolean)

    const Page = routeToUse.find(({ path }) => {
        if (path == currenPath) return true

        //Se utilizar regexp para detectar rutas dinamicas
        const matchUrl = match(path, { decode: decodeURIComponent })
        const matched = matchUrl(currenPath)
        if (!matched) return false

        //Guardar los parametros dinamicos de la url
        routeParams = matched.params //{query:'js'}// /search/js
        return true
    })?.Component
    return Page ? <Page routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />
}