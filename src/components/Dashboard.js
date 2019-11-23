import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Movie from "./Movie";
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
  MDBBtn
} from "mdbreact";

import SectionContainer from "./sectionContainer";

const Dashboard = () => {
  const movies = useSelector(state => state.movies.all);
  const dispatch = useDispatch();
  console.log("MOVIES: ", movies);

  let movieCards = movies.map(movie => <Movie key={movie.id} movie={movie} />);

  return (
    <MDBContainer>
      <SectionContainer tag="section" size="9">
        <h2 className="h1-responsive font-weight-bold text-center my-5">
          Lorem ipsum
        </h2>
        <p className="grey-text text-center w-responsive mx-auto mb-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error
          amet numquam iure provident voluptate esse quasi, veritatis totam
          voluptas nostrum quisquam eum porro a pariatur veniam.
        </p>
        <MDBRow>
          <MDBCol size="10">
            <div className="card-columns">{movieCards}</div>
          </MDBCol>
          <MDBCol size="2">Cart</MDBCol>
        </MDBRow>
      </SectionContainer>
    </MDBContainer>
  );
};
export default Dashboard;
