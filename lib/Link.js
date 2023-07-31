import{jsx as _jsx}from"react/jsx-runtime";import{BUTTON,EVENTS}from"./const.js";export function navigate(href){window.history.pushState({},"",href);const navigationEvent=new Event(EVENTS.PUSHSTATE);window.dispatchEvent(navigationEvent)}export function Link({target,to,...props}){const handleClick=event=>{const isMainEvent=event.button===BUTTON.primary;const isModifiedEvent=event.metaKey||event.altKey||event.ctrlKey||event.shiftKey;const isManagableEvent=target==undefined||target=="_self";if(isMainEvent&&isManagableEvent&&!isModifiedEvent){event.preventDefault();navigate(to);window.scrollTo(0,0)}};return _jsx("a",{onClick:handleClick,href:to,target:target,...props})}