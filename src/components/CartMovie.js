import React, { Fragment } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardUp,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBAvatar,
  MDBRotatingCard,
  MDBIcon,
  MDBBtn,
  MDBCardFooter,
  MDBTooltip
} from "mdbreact";

const CartMovie = props => {
  return (
    <MDBCard
      wide
      ecommerce
      style={{ display: "inline-block", marginBottom: "10px" }}
    >
      <MDBCardImage
        cascade
        src="https://picsum.photos/seed/picsum/336/224"
        top
        alt="sample photo"
      />
      <MDBCardBody
        cascade
        className="text-center"
        style={{ paddingBottom: "5px" }}
      >
        <MDBCardTitle>
          <strong style={{ textAlign: "left" }}>
            <a href="#!">{props.movie.title}</a>
          </strong>
        </MDBCardTitle>
        {/* <MDBCardText>{props.movie.description}</MDBCardText> */}
        <MDBCardFooter
          className="px-1"
          style={{
            backgroundColor: "#FFF",
            marginBottom: "0px",
            paddingBottom: "0px"
          }}
        >
          <MDBRow>
            <MDBCol>
              <div
                className="font-weight-bold"
                style={{ fontSize: "1.2rem", marginBottom: "6px" }}
              >
                <strong>{props.movie.price}</strong>
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol>
              <div>Quantity: {props.movie.cartQuantity}</div>
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
                    <MDBIcon icon="arrow-alt-circle-right" className="mr-1" />{" "}
                    Remove From Cart
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
