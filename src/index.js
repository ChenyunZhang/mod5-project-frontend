import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import './tailwind.output.css';
import App from "./App";

// REDUX STUFF HERE
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

// ######################## post reducer ###########################
let initialStateOfPostReducer = {
  posts: [],
};

let postReducer = (state = initialStateOfPostReducer, action) => {
  switch (action.type) {
    case "SET_POST":
      return {
        ...state,
        posts: action.payload,
      };
    case "ADD_POST":
      let copyOfPosts = [action.payload, ...state.posts];
      return {
        ...state,
        posts: copyOfPosts,
      };
    case "DELETE_POST":
      let copyOfPosts_2 = state.posts.filter(
        (post) => post.id !== action.payload.id
      );
      return {
        ...state,
        posts: copyOfPosts_2,
      };
    case "UPDATE_POST":
        let copyOfPost_3 = state.posts.map((post) => {
          if(post.id === action.payload.id){
            return action.payload
          } else {
            return post
          }})
    return {
      ...state,
      posts: copyOfPost_3
    };

    default:
      return state;
  }
};

// ######################## searchedBook reducer ###########################
let initialStateOfSearchedPostsReducer = {
  searchedBooks: [],
};

let searchedBooksReducer = (state = initialStateOfSearchedPostsReducer, action) => {
  switch (action.type) {
    case "SET_SEARCH_BOOK":
      return {
        ...state,
        searchedBooks: action.payload,
      };
    default:
      return state;
  }
};

// ######################## book reducer ###########################
let initialStateOfBookReducer = {
  books: [],
};

let bookReducer = (state = initialStateOfBookReducer, action) => {
  switch (action.type) {
    case "SET_BOOK":
      return {
        ...state,
        books: action.payload,
      };
    default:
      return state;
  }
};

// ######################## user reducer ###########################
let initialStateOfUserReducer = {
  email: "",
  token: "",
  username: "",
  id: "",
  avatar: "",
};

let userReducer = (state = initialStateOfUserReducer, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        username: action.payload.user.username,
        email: action.payload.user.email,
        token: action.payload.token,
        id: action.payload.user.id,
        avatar: action.payload.user.avatar,
      };
    case "LOG_OUT":
      return {
        ...state,
        email: "",
        token: "",
        username: "",
        id: "",
      };
    case "UPDATE_USER_INFO":
      return {
        ...state,
        username: action.payload.user.username,
        email: action.payload.user.email,
        token: action.payload.token,
        avatar: action.payload.user.avatar,
        id: action.payload.user.id,
      };
    default:
      return state;
  }
};

// ######################## combine reducer ###########################
let infoCamp = {
  postsInfo: postReducer,
  userInfo: userReducer,
  searchedBook: searchedBooksReducer,
  bookInfo: bookReducer
};

let rootReducer = combineReducers(infoCamp);

let storeObj = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={storeObj}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
