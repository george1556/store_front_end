import React, { Fragment } from "react";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBIcon,
  MDBBtn,
  MDBCardFooter
} from "mdbreact";

const CartMovie = props => {
  return (
    <MDBCard
      wide
      ecommerce
      style={{ display: "inline-block", marginBottom: "10px" }}
    >
      {/* <MDBCardImage
        cascade
        src="https://picsum.photos/seed/picsum/336/224"
        top
        alt="sample photo"
        style={{ padding: "5px", paddingBottom: 0 }}
      /> */}
      <MDBCardBody
        cascade
        className="text-center"
        style={{ paddingBottom: "5px" }}
      >
        <MDBRow>
          <MDBCol style={{ paddingLeft: 0, paddingRight: "2px" }}>
            {" "}
            <MDBCardImage
              cascade
              src="https://picsum.photos/seed/picsum/336/224"
              top
              alt="sample photo"
              style={{ padding: "5px", paddingBottom: "5px" }}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol style={{ paddingRight: 0, paddingLeft: "2px" }}>
            <MDBCardTitle>
              <strong
                style={{
                  textAlign: "left",
                  color: "#4285F4",
                  fontSize: "1rem"
                }}
              >
                {props.movie.title}
              </strong>
            </MDBCardTitle>
          </MDBCol>
        </MDBRow>
        {/* <MDBCardTitle>
          <strong
            style={{ textAlign: "left", color: "#4285F4", fontSize: "1.2rem" }}
          >
            {props.movie.title}
          </strong>
        </MDBCardTitle> */}
        <MDBCardFooter
          className="px-1"
          style={{
            backgroundColor: "#FFF",
            marginBottom: "0px",
            paddingBottom: "0px",
            paddingTop: "6px"
          }}
        >
          <MDBRow>
            <MDBCol>
              <div
                className="font-weight-bold"
                style={{ fontSize: "1rem", marginBottom: "0px" }}
              >
                <strong>{props.movie.price}</strong>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <div style={{ marginBottom: "3px" }}>
                Quantity: {props.movie.cartQuantity}
              </div>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol>
              <div>
                <Fragment>
                  <MDBBtn
                    color="danger"
                    size="sm"
                    style={{ marginTop: 0 }}
                    onClick={() => props.removeFromCart(props.movie.id)}
                    id={props.movie.id}
                  >
                    <MDBIcon icon="cart-arrow-down" className="mr-1" /> Remove
                    From Cart
                  </MDBBtn>
                </Fragment>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardFooter>
      </MDBCardBody>
    </MDBCard>
  );
};
export default CartMovie;
