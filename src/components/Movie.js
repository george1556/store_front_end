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
import SectionContainer from "./sectionContainer";

const Movie = props => {
  //   const addToCart = e => {
  //     console.log("add to cart ", e.target.id);
  //   };

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
          <strong>
            <a href="#!">{props.movie.title}</a>
          </strong>
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
