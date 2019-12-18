import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBIcon
} from "mdbreact";
import Navbar from "./Navbar";
import SectionContainer from "./sectionContainer";

const TransactionView = props => {
  return (
    <MDBContainer style={{ marginTop: "10px" }}>
      <Navbar />
      <SectionContainer tag="section" size="12">
        {/*  **********VIEW TRANSACTIONS SECTION**********  */}
        <MDBRow>
          <MDBCol>
            <MDBCard className="card-body">
              <MDBCardTitle>
                <strong>
                  <MDBIcon icon="film" className="mr-1" />
                  View Transactions
                </strong>
              </MDBCardTitle>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </SectionContainer>
    </MDBContainer>
  );
};
export default TransactionView;
