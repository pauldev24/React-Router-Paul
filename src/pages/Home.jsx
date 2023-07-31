import {Link} from '../Link.jsx'

export default function HomePage() {
    return (
      <>
        <h1>Home</h1>
        <p>Esta una pagina base de ejemplo para crear un React Router</p>
        {/*<a href='/about'>Ir a sobre nosotros</a> */}
        <Link to='/about'>Ir a sobre nosotros</Link>
      </>
    )
  }