import 'bootstrap/dist/css/bootstrap.css'

export default function Layout({ children }) {
    return (
		<>
		<header></header>
    	<main>{children}</main>
		<footer></footer>
		</>
	);
  }