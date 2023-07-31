import { BUTTON, EVENTS } from './const.js'

export function navigate(href) {
    window.history.pushState({}, '', href)
    //Crear un evento personalizado para avisar que cambiamos
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
}

export function Link({ target, to, ...props }) {
    const handleClick = (event) => {

        const isMainEvent = event.button === BUTTON.primary //primary clic
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManagableEvent = target == undefined || target == '_self'

        if (isMainEvent && isManagableEvent && !isModifiedEvent) {
            event.preventDefault()
            navigate(to)
            window.scrollTo(0,0)
        }
    }

    return <a onClick={handleClick} href={to} target={target} {...props}></a>
}