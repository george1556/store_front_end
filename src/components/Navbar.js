import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdbreact";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuExpand, setMenuExpand] = useState({ isOpen: false });
  const customers = useSelector(state => state.customers.all);

  let currentCustomerId = useSelector(state => state.customers.loggedInUser);

  let currentCustomer = customers.filter(
    customer => customer.id === currentCustomerId
  );

  const toggleCollapse = () => {
    setMenuExpand({ isOpen: !menuExpand.isOpen });
    // this.setState({ isOpen: !this.state.isOpen });
  };

  return (
    // <Router>
    <MDBNavbar color="primary-color-dark" dark expand="md">
      <MDBNavbarBrand>
        <MDBIcon icon="camera-retro" className="mr-1" />

        <strong className="white-text"> Scene It Cinema</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={menuExpand.isOpen} navbar>
        <MDBNavbarNav left></MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                {currentCustomer.length > 0 ? currentCustomer[0].name : "..."}
                <MDBIcon style={{ paddingLeft: "7px" }} icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem>
                  <Link
                    to={{
                      pathname: "/",
                      state: {}
                    }}
                  >
                    Dashboard
                  </Link>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <Link
                    to={{
                      pathname: "/inventory",
                      state: {}
                    }}
                  >
                    Inventory Page
                  </Link>
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    // </Router>
  );
};
export default Navbar;
