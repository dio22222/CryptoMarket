import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-primary">
            <div className="container-fluid">
                <Link href={'/'}><a className="navbar-brand  text-primary">Crypto Market</a></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link href={'/'}><a className="nav-link active" aria-current="page">Home</a></Link>
                    </li>
                </ul>
                <span className="navbar-text">
                    The place that keeps you up to date!
                </span>
                </div>
            </div>
        </nav>
    )
}