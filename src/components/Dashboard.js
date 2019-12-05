import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Movie from "./Movie";
import CartMovie from "./CartMovie";
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
  MDBInput,
  MDBInputSelect
} from "mdbreact";

import SectionContainer from "./sectionContainer";

const Dashboard = () => {
  const [update, setUpdate] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const movies = useSelector(state => state.movies.all);
  const dispatch = useDispatch();

  const searchFilter = e => {
    setSearch(e.target.value.toLowerCase());
  };

  //Receives movieId from individual movie card, and updates cart in state to re-render.
  const addToCart = movieId => {
    setCart([...cart, movieId]);
    console.log("movieId: ", movieId);
  };

  //Removes a movie from the cart, and updates state.
  const removeFromCart = movieId => {
    //Makes a copy of the current cart
    let newCart = cart;
    //Finds the index of the movieId, and removes that from the array.
    newCart.splice(
      cart.findIndex(id => id === movieId),
      1
    );
    //Sets state using newCart updated array
    setCart(newCart);
    //setUpdate forces a re-render, because previous setCart was not re-rendering.
    setUpdate([...update, movieId]);
  };
  console.log("cart: ", cart);
  //Array to hold all the movie cards
  let movieCards = [];

  //Check to see if the movie is "available to buy" and then push it to the movieCards array if true
  movies.forEach(movie => {
    if (movie.available_to_buy) {
      movieCards.push(
        <Movie key={movie.id} movie={movie} addToCart={addToCart} />
      );
    }
  });

  //displayMovies is the final render. It will either display all movie cards created above, or filter them based on text in search field.
  let displayMovies = [];

  if (search === "") {
    displayMovies = movieCards;
  } else {
    displayMovies = movieCards.filter(movie => {
      if (movie.props.movie.title.toLowerCase().includes(search)) {
        return movie;
      }
    });

    if (displayMovies.length <= 0) {
      displayMovies = ["No movies match your search."];
    }
    console.log("displayMovies: ", displayMovies);
  }

  //cartMovies array will either hold and
  let cartMovies = [];

  if (cart.length > 0) {
    movies.forEach(movie => {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i] === movie.id) {
          //Loop and count to find duplicates in the cart for a particular book. A duplicate indicates a quantity greater than 1.
          let count = 0;
          for (let j = 0; j < cartMovies.length; j++) {
            if (cartMovies[j].id === cart[i]) {
              count++;
            }
          }
          if (count > 0) {
            cartMovies[cartMovies.findIndex(mov => mov.id === cart[i])]
              .cartQuantity++;
          } else {
            let currentMovie = movie;
            currentMovie["cartQuantity"] = 1;
            cartMovies.push(currentMovie);
          }
        }
      }
    });
  }

  console.log("cartMovies", cartMovies);
  let displayCart = "Your cart is empty.";
  let cartTotal = 0;

  if (cartMovies.length > 0) {
    displayCart = cartMovies.map(movie => (
      <CartMovie key={movie.id} movie={movie} removeFromCart={removeFromCart} />
    ));
    cartTotal = cartMovies
      .reduce((acc, current) => {
        return (
          acc +
          Number(current.price.replace(/[^0-9.-]+/g, "") * current.cartQuantity)
        );
      }, 0)
      .toFixed(2);
    console.log("cartTotal: ", cartTotal);
  }

  console.log("cartMovies: ", cartMovies);

  let searchLabel = (
    <strong>
      <MDBIcon icon="search" className="mr-1" />
      Search for Movies
    </strong>
  );

  return (
    <MDBContainer style={{ marginTop: "10px" }}>
      <SectionContainer tag="section" size="12">
        <MDBRow>
          <MDBCol size="9">
            <MDBCard className="card-body">
              <MDBCardTitle>
                <strong>
                  <MDBIcon icon="film" className="mr-1" />
                  Movies
                </strong>
              </MDBCardTitle>

              <MDBRow style={{ marginBottom: "10px" }}>
                <MDBCol md="12">
                  <MDBInput
                    onChange={searchFilter}
                    label={searchLabel}
                    valueDefault=""
                  />
                </MDBCol>
              </MDBRow>

              <div className="card-columns">{displayMovies}</div>
            </MDBCard>
          </MDBCol>
          <MDBCol size="3">
            <MDBCard className="card-body">
              <MDBCardTitle>
                <strong>
                  <MDBIcon icon="dolly" className="mr-1" />
                  Shopping Cart
                </strong>
              </MDBCardTitle>

              {displayCart}
              {cartMovies.length > 0 ? (
                <div>
                  <h5>
                    <strong>Total: ${cartTotal}</strong>
                  </h5>
                  <MDBBtn
                    color="dark-green"
                    size="sm"
                    style={{ marginTop: "3px", marginBottom: "0px" }}
                    onClick={() => {}}
                    className="btn-block"
                  >
                    <MDBIcon icon="credit-card" className="mr-1" />{" "}
                    <strong>Checkout</strong>
                  </MDBBtn>
                </div>
              ) : (
                <div></div>
              )}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </SectionContainer>
    </MDBContainer>
  );
};
export default Dashboard;
