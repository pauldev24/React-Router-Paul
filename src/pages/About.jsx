import {Link} from '../Link.jsx'

const i18n = {
  es: {
    title: 'Sobre nosotros',
    description: '!Hola¡, me llamo Paul y estoy creando un clon de React Router.',
    button: 'Ir a la Home'
  },
  en: {
    title: 'About us',
    description: '!Hi!, My name is Paul and I am creating a clone of React Router.',
    button : 'Go to Home'
  }
}

const useI18n = (lang) =>{
  return i18n[lang] || i18n.en
}

export default function AboutPage({routeParams}) {
  const i18n = useI18n(routeParams.lang ?? 'es')  
  return (
      <>
        <h1>{i18n.title}</h1>
        <div>
          <img src='/cat.jpg' alt='Foto de un gato extraido de pixabay' />
          <p>{i18n.description}</p>
        </div>
        <Link to='/'>{i18n.button}</Link>
      </>
    )
  }