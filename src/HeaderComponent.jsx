import { Link } from "react-router-dom";

export default function HeaderComponent(){
    return(
         <header className="border-bottom border-light border-5 p-2 ">
                <div className="container-fluid">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                           {/* Toggler button (hamburger) */}
                            <button
                                 className="navbar-toggler"
                                 type="button"
                                 data-bs-toggle="collapse"
                                 data-bs-target="#navbarNav"
                                 aria-controls="navbarNav"
                                 aria-expanded="false"
                                 aria-label="Toggle navigation"
                            >
                                 <span className="navbar-toggler-icon"></span>
                            </button>
        
                            <div className="collapse navbar-collapse"  id="navbarNav">
                                <ul className="navbar-nav ms-auto">
        
                                <li className="nav-item fs-5">
                                { isAuthenticated &&
                                     <Link className="nav-link" to="/regulationtypes">Regulation Types</Link>
                                }
                                </li>
                              </ul>
                            </div>
                        </nav>
                    </div>
              </div>
            </header>
    )
}