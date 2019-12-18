import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBIcon
} from "mdbreact";
import SectionContainer from "./sectionContainer";
import Navbar from "./Navbar";

const Login = props => {
  let emailLabel = (
    <strong>
      <MDBIcon icon="envelope" className="mr-1" />
      Type your e-mail
    </strong>
  );

  let passwordLabel = (
    <strong>
      <MDBIcon icon="lock" className="mr-1" />
      Type your password
    </strong>
  );

  const submitLogin = e => {
    e.preventDefault();
    console.log("submit stuff");
  };

  return (
    <MDBContainer style={{ marginTop: "10px" }}>
      <Navbar />
      <SectionContainer tag="section" size="12">
        <MDBRow>
          <MDBCol md="4" />
          <MDBCol md="4">
            <MDBCard className="card-body">
              <form onSubmit={submitLogin}>
                <p className="h5 text-center mb-4">Sign in</p>
                <div className="grey-text">
                  <MDBInput
                    label={emailLabel}
                    // icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label={passwordLabel}
                    // icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center">
                  <MDBBtn type="submit">Login</MDBBtn>
                </div>
              </form>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4" />
        </MDBRow>
      </SectionContainer>
    </MDBContainer>
  );
};
export default Login;
