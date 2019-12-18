import React, { useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addNewMovie } from "../store/movies/actions";
import { updateMovie } from "../store/movies/actions";
import { deleteMovie } from "../store/movies/actions";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBIcon,
  MDBBtn
} from "mdbreact";
import SectionContainer from "./sectionContainer";

const InventoryPage = props => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.all);

  //State of new movie
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    description: "",
    price: "",
    quantity: "",
    available_to_buy: null,
    image: ""
  });

  //State of edit movie
  const [editMovie, setEditMovie] = useState({
    id: 0,
    title: "",
    genre: "",
    description: "",
    price: "",
    quantity: "",
    available_to_buy: false,
    image: ""
  });

  //List of movie titles for edit drop down options
  let movieList = movies
    .map(movie => movie.title)
    .sort()
    .map(movie => <option key={movie.id}>{movie}</option>);

  movieList.unshift(<option key="empty"></option>);

  const editMovieSelection = e => {
    movies.forEach(movie => {
      if (e.target.value === movie.title) {
        setEditMovie({
          id: movie.id,
          title: movie.title,
          genre: movie.genre,
          description: movie.description,
          price: Number(movie.price.replace(/[^0-9.-]+/g, "")),
          quantity: movie.quantity,
          available_to_buy: movie.available_to_buy,
          image: movie.image
        });
      }
    });
  };

  // const submitHandler = e => {
  //   e.preventDefault();
  //   console.log("e.target: ", e.target);
  //   e.target.className += " was-validated";
  // };

  const newMovieSubmit = e => {
    e.preventDefault();
    dispatch(addNewMovie(newMovie));
  };

  const editMovieSubmit = e => {
    // e.preventDefault();
    dispatch(updateMovie(editMovie, editMovie.id));
  };

  const deleteMovieSubmit = e => {
    if (editMovie.id !== 0) {
      dispatch(deleteMovie(editMovie.id));
      //console.log("delete movie Id: ", editMovie.id);
    }
  };

  return (
    <MDBContainer style={{ marginTop: "10px" }}>
      <Navbar />
      <SectionContainer tag="section" size="12">
        {/*  **********ADD NEW MOVIE SECTION**********  */}
        <MDBRow>
          <MDBCol>
            <MDBCard className="card-body">
              <MDBCardTitle>
                <strong>
                  <MDBIcon icon="film" className="mr-1" />
                  Add A New Movie
                </strong>
              </MDBCardTitle>

              <form
                className="needs-validation"
                onSubmit={newMovieSubmit}
                noValidate
              >
                <MDBRow>
                  {/* ***********Column************ */}
                  <MDBCol md="4" className="mb-3">
                    <label
                      htmlFor="movieTitle"
                      className="grey-text form-inline"
                    >
                      Movie Title
                    </label>
                    <input
                      name="title"
                      onChange={e =>
                        setNewMovie({ ...newMovie, title: e.target.value })
                      }
                      type="text"
                      id="movieTitle"
                      className="form-control"
                      placeholder="Movie Title"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </MDBCol>
                  {/* ***********Column************ */}

                  <MDBCol md="4" className="mb-3">
                    <label
                      htmlFor="movieGenre"
                      className="grey-text form-inline"
                    >
                      Movie Genre
                    </label>
                    <input
                      name="genre"
                      onChange={e =>
                        setNewMovie({ ...newMovie, genre: e.target.value })
                      }
                      type="text"
                      id="movieGenre"
                      className="form-control"
                      placeholder="Movie Genre"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </MDBCol>

                  {/* ***********Column************ */}

                  <MDBCol md="4" className="mb-3">
                    <label
                      htmlFor="moviePrice"
                      className="grey-text form-inline"
                    >
                      Price (2 Decimal Places)
                    </label>
                    <input
                      name="price"
                      onChange={e =>
                        setNewMovie({ ...newMovie, price: e.target.value })
                      }
                      type="number"
                      min="1"
                      max="100"
                      step="0.01"
                      id="moviePrice"
                      className="form-control"
                      placeholder="Movie Price"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  {/* ***********Column************ */}
                  <MDBCol md="4" style={{ marginBottom: "0px !important" }}>
                    <label
                      htmlFor="movieQuantity"
                      className="grey-text form-inline"
                    >
                      Quantity
                    </label>
                    <input
                      name="price"
                      onChange={e =>
                        setNewMovie({ ...newMovie, quantity: e.target.value })
                      }
                      type="number"
                      min="0"
                      max="100000"
                      step="1"
                      id="movieQuantity"
                      className="form-control"
                      placeholder="Quantity"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </MDBCol>
                  {/* ***********Column************ */}

                  <MDBCol md="4" style={{ marginBottom: "0" }}>
                    <label
                      htmlFor="movieImage"
                      className="grey-text form-inline"
                    >
                      Image Address
                    </label>
                    <input
                      name="image"
                      onChange={e =>
                        setNewMovie({ ...newMovie, image: e.target.value })
                      }
                      type="url"
                      id="movieImage"
                      className="form-control"
                      placeholder="Image address"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </MDBCol>

                  {/* ***********Column************ */}

                  <MDBCol md="4" style={{ marginBottom: "0" }}>
                    <label htmlFor="" className="grey-text form-inline">
                      Available For Purchase
                    </label>
                    <div className="form-group">
                      <select
                        className="custom-select bMDBRowser-default"
                        required
                        onChange={e =>
                          setNewMovie({
                            ...newMovie,
                            available_to_buy: e.target.value == "true"
                          })
                        }
                      >
                        <option></option>
                        <option>True</option>
                        <option>False</option>
                      </select>
                      <div className="invalid-feedback">
                        Select a valid option.
                      </div>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="8">
                    {/* <MDBInput
                      type="textarea"
                      label="Movie Description"
                      onChange={e =>
                        setNewMovie({
                          ...newMovie,
                          description: e.target.value
                        })
                      }
                      rows="2"
                      required
                    /> */}

                    <div className="form-group">
                      <label
                        htmlFor="movieDescription"
                        className="grey-text"
                        style={{ display: "block", textAlign: "left" }}
                      >
                        Movie Description
                      </label>
                      <textarea
                        className="form-control"
                        id="movieDescription"
                        rows="2"
                        onChange={e =>
                          setNewMovie({
                            ...newMovie,
                            description: e.target.value
                          })
                        }
                      />
                    </div>
                  </MDBCol>
                </MDBRow>

                <MDBBtn color="unique" type="submit">
                  Submit
                </MDBBtn>
              </form>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        {/* ************************************** */}
        {/* **********EDIT MOVIE SECTION********** */}
        {/* ************************************** */}
        <MDBRow>
          <MDBCol>
            <MDBCard className="card-body" style={{ marginTop: "10px" }}>
              <MDBCardTitle>
                <strong>
                  <MDBIcon icon="edit" className="mr-1" />
                  Edit Movie
                </strong>
              </MDBCardTitle>

              <MDBRow>
                <MDBCol md="6" style={{ marginBottom: "0" }}>
                  <label htmlFor="" className="grey-text form-inline">
                    Select Movie To Edit
                  </label>
                  <div className="form-group">
                    <select
                      className="custom-select bMDBRowser-default"
                      required
                      onChange={editMovieSelection}
                    >
                      {movieList}
                    </select>
                    <div className="invalid-feedback">
                      Select a valid option.
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <form
                    className="needs-validation"
                    onSubmit={editMovieSubmit}
                    noValidate
                  >
                    <MDBRow>
                      {/* ***********Column************ */}
                      <MDBCol md="4" className="mb-3">
                        <label
                          htmlFor="movieTitle"
                          className="grey-text form-inline"
                        >
                          Movie Title
                        </label>
                        <input
                          name="title"
                          onChange={e =>
                            setEditMovie({
                              ...editMovie,
                              title: e.target.value
                            })
                          }
                          type="text"
                          id="movieTitle"
                          className="form-control"
                          placeholder="Movie Title"
                          defaultValue={editMovie.title}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                      </MDBCol>
                      {/* ***********Column************ */}

                      <MDBCol md="4" className="mb-3">
                        <label
                          htmlFor="movieGenre"
                          className="grey-text form-inline"
                        >
                          Movie Genre
                        </label>
                        <input
                          name="genre"
                          onChange={e =>
                            setEditMovie({
                              ...editMovie,
                              genre: e.target.value
                            })
                          }
                          type="text"
                          id="movieGenre"
                          className="form-control"
                          placeholder="Movie Genre"
                          defaultValue={editMovie.genre}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                      </MDBCol>

                      {/* ***********Column************ */}

                      <MDBCol md="4" className="mb-3">
                        <label
                          htmlFor="moviePrice"
                          className="grey-text form-inline"
                        >
                          Price (2 Decimal Places)
                        </label>
                        <input
                          name="price"
                          onChange={e =>
                            setEditMovie({
                              ...editMovie,
                              price: e.target.value
                            })
                          }
                          type="number"
                          min="1"
                          max="100"
                          step="0.01"
                          id="moviePrice"
                          className="form-control"
                          placeholder="Movie Price"
                          defaultValue={editMovie.price}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      {/* ***********Column************ */}
                      <MDBCol md="4" style={{ marginBottom: "0px !important" }}>
                        <label
                          htmlFor="movieQuantity"
                          className="grey-text form-inline"
                        >
                          Quantity
                        </label>
                        <input
                          name="price"
                          onChange={e =>
                            setEditMovie({
                              ...editMovie,
                              quantity: e.target.value
                            })
                          }
                          type="number"
                          min="0"
                          max="100000"
                          step="1"
                          id="movieQuantity"
                          className="form-control"
                          placeholder="Quantity"
                          defaultValue={editMovie.quantity}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                      </MDBCol>
                      {/* ***********Column************ */}

                      <MDBCol md="4" style={{ marginBottom: "0" }}>
                        <label
                          htmlFor="movieImage"
                          className="grey-text form-inline"
                        >
                          Image Address
                        </label>
                        <input
                          name="image"
                          onChange={e =>
                            setEditMovie({
                              ...editMovie,
                              image: e.target.value
                            })
                          }
                          type="url"
                          id="movieImage"
                          className="form-control"
                          placeholder="Image address"
                          defaultValue={editMovie.image}
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                      </MDBCol>

                      {/* ***********Column************ */}

                      <MDBCol md="4" style={{ marginBottom: "0" }}>
                        <label htmlFor="" className="grey-text form-inline">
                          Available For Purchase
                        </label>
                        <div className="form-group">
                          <select
                            className="custom-select bMDBRowser-default"
                            required
                            onChange={e =>
                              setEditMovie({
                                ...editMovie,
                                available_to_buy: e.target.value == "true"
                              })
                            }
                          >
                            <option value="" disabled></option>
                            <option value="true" selected>
                              True
                            </option>
                            <option value="false">False</option>
                          </select>
                          <div className="invalid-feedback">
                            Select a valid option.
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="8">
                        {/* <MDBInput
                          type="textarea"
                          label="Movie Description"
                          onChange={e =>
                            setEditMovie({
                              ...editMovie,
                              description: e.target.value
                            })
                          }
                          rows="2"
                          required
                          defaultValue={editMovie.description}
                        /> */}

                        <div className="form-group">
                          <label
                            htmlFor="movieDescriptionEdit"
                            className="grey-text"
                            style={{ display: "block", textAlign: "left" }}
                          >
                            Movie Description
                          </label>
                          <textarea
                            className="form-control"
                            id="movieDescriptionEdit"
                            rows="2"
                            onChange={e =>
                              setEditMovie({
                                ...editMovie,
                                description: e.target.value
                              })
                            }
                            required
                            defaultValue={editMovie.description}
                          />
                        </div>
                      </MDBCol>
                    </MDBRow>

                    <MDBBtn color="unique" type="submit">
                      Submit
                    </MDBBtn>
                    <MDBBtn
                      color="danger"
                      type="button"
                      onClick={deleteMovieSubmit}
                    >
                      Delete Movie
                    </MDBBtn>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </SectionContainer>
    </MDBContainer>
  );
};
export default InventoryPage;
