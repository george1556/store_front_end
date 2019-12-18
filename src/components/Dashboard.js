import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Movie from "./Movie";
import CartMovie from "./CartMovie";
import Navbar from "./Navbar";
import { addNewTransaction } from "../store/transactions/actions";
import { updateMovie } from "../store/movies/actions";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBIcon,
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

import SectionContainer from "./sectionContainer";

const Dashboard = () => {
  const [update, setUpdate] = useState([]);
  const [cartError, setCartError] = useState({ modal6: false });
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const movies = useSelector(state => state.movies.all);
  const dispatch = useDispatch();
  //const customers = useSelector(state => state.customers.all);
  //const transactions = useSelector(state => state.transactions.all);

  //Toggles the cart modal indicating the customer has reached the maximum available quantity.
  const toggle = () => {
    setCartError({ modal6: !cartError.modal6 });
  };

  //Establishes the current customer who is logged in to track for the cart transactions.
  let currentCustomerId = useSelector(state => state.customers.loggedInUser);
  //   let currentCustomer = customers.filter(
  //     customer => customer.id === currentCustomerId
  //   );

  const searchFilter = e => {
    setSearch(e.target.value.toLowerCase());
  };

  //Receives movieId from individual movie card, and updates cart in state to re-render.
  const addToCart = movieId => {
    let currentMovie = movies.filter(movie => movieId === movie.id);

    if (currentMovie[0].cartQuantity >= currentMovie[0].quantity) {
      //Shows error modal that too many are in the cart
      toggle();
    } else {
      setCart([...cart, movieId]);
    }
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
    //setUpdate forces a re-render, because setCart was not re-rendering.
    setUpdate([...update, movieId]);
  };
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

  //displayMovies is the final render. It will either display all movie cards created above, or filter them based on text in the search field.
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
  }

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
  }

  //Checkout to add cart contents to transactions
  const checkout = e => {
    //Creates an array that contains each individual transaction
    let transactionArray = [];

    //Loops through all movies in the cart, and breaks up movies/quantity into individual transactions
    cartMovies.forEach(movie => {
      for (let i = 0; i < movie.cartQuantity; i++) {
        transactionArray.push({
          movie_id: movie.id,
          customer_id: currentCustomerId,
          price: movie.price
        });
      }
    });

    //Dispatches the transactions
    dispatch(addNewTransaction(transactionArray));

    //Updates the movie quantity based on the checkout transaction
    for (let i = 0; i < cartMovies.length; i++) {
      let currentMovieUpdate = cartMovies[i];
      currentMovieUpdate.quantity =
        currentMovieUpdate.quantity - currentMovieUpdate.cartQuantity;
      delete currentMovieUpdate.cartQuantity;
      dispatch(updateMovie(currentMovieUpdate, currentMovieUpdate.id));
    }

    //Clears the cart and updates cart state
    cartMovies = [];
    setCart([]);
  };

  let searchLabel = (
    <strong>
      <MDBIcon icon="search" className="mr-1" />
      Search for Movies
    </strong>
  );

  return (
    <MDBContainer style={{ marginTop: "10px" }}>
      <Navbar />
      {/* Modal when cart quantity tries to exceed avaialble quanity.  */}
      <MDBModal
        isOpen={cartError.modal6}
        toggle={toggle}
        side
        position="top-right"
      >
        <MDBModalHeader toggle={toggle}>
          Quantity exceeds available quantity.
        </MDBModalHeader>
        <MDBModalBody>
          You already have the maximum availble quantity of that movie in your
          cart.
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>

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
              {/* <hr /> */}

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
                    onClick={checkout}
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
