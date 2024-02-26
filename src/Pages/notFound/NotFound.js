import { Link } from 'react-router-dom';
import './notFound.css';

export function NotFound() {
  return (
    <main className='not-found'>
      <section>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to='/'>Home</Link>
      </section>
    </main>
  );
}
