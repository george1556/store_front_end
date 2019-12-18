import React, { Fragment } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
  MDBBtn,
  MDBCardFooter
} from "mdbreact";

const Movie = props => {
  return (
    <MDBCard wide ecommerce style={{ display: "inline-block" }}>
      <MDBCardImage
        cascade
        src="https://picsum.photos/seed/picsum/336/224"
        top
        alt="sample photo"
      />
      <MDBCardBody cascade className="text-center">
        <MDBCardTitle>
          <strong style={{ color: "#4285F4" }}>{props.movie.title}</strong>
        </MDBCardTitle>
        <MDBCardText>{props.movie.description}</MDBCardText>
        <MDBCardFooter
          className="px-1"
          style={{ backgroundColor: "#FFF", paddingBottom: 0 }}
        >
          <div
            className="font-weight-bold "
            style={{ fontSize: "1.2rem", marginBottom: "0px" }}
          >
            <strong>{props.movie.price}</strong>
          </div>
          {/* <div className="float-right"> */}
          <Fragment>
            <MDBBtn
              color="amber"
              size="sm"
              style={{ marginTop: 0, marginBottom: "0px" }}
              onClick={() => props.addToCart(props.movie.id)}
              id={props.movie.id}
            >
              <MDBIcon icon="shopping-cart" className="mr-1" /> Add To Cart
            </MDBBtn>
          </Fragment>
          {/* </div> */}
        </MDBCardFooter>
      </MDBCardBody>
    </MDBCard>
  );
};
export default Movie;
