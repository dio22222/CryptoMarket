import Nav from './Nav'

export default function Layout({ children }) {
    return (
		<>
		<header>
			<Nav />
		</header>
    	<main className='bg-dark text-light pt-3'>{children}</main>
		<footer></footer>
		</>
	);
  }