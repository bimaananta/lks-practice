import { useEffect, useState } from "react";

export default function Navbar({role, active}) {
    const [userRole, setUserRole] = useState(0);

    useEffect(() => {
      setUserRole(role);
    }, [role]);

    return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand fw-bold" href="/">
          Rent<span className="text-warning">Cars</span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <NavItem role={userRole} active={active}/>
        </div>
      </div>
    </nav>
  );
}

function NavItem({role, active}){
    const activeClass = "nav-link active";

    if(role !== 1 && role !== 2){
      return (<></>);
    }

    return (
      <ul className="navbar-nav ms-auto d-flex gap-lg-5">
        <li class="nav-item">
          <a className={(active === "home") ? activeClass : "nav-link"} aria-current="page" href="/">
            Home
          </a>
        </li>
        {(role === 1) ? (
          <>
            <li class="nav-item">
              <a className={(active === "rent") ? activeClass : "nav-link"} href="/rent">
                Rent
              </a>
            </li>
            <li class="nav-item">
              <a className={(active === "return") ? activeClass : "nav-link"} href="/return">
                Return
              </a>
            </li>
            <li class="nav-item">
              <a className={(active === "penalties") ? activeClass : "nav-link"} href="/penalties">
                Penalties
              </a>
            </li>
            <li class="nav-item">
              <a className={(active === "register") ? activeClass : "nav-link"} href="/register-list">
                Register
              </a>
            </li>
          </>
          ) : (
          <>
            <li class="nav-item">
              <a className={(active === "rent") ? activeClass : "nav-link"} href="/rent">
                Rent Cars
              </a>
            </li>
            <li class="nav-item">
              <a className={(active === "transaction") ? activeClass : "nav-link"} href="/transaction">
                Transaction
              </a>
            </li>
          </>
          )}
          <li class="nav-item">
            <a href="/auth/logout" className="nav-link d-flex align-items-center gap-2">
              Log Out
              <i className="bi bi-box-arrow-right"></i>
            </a>
          </li>
      </ul>
    );
}
