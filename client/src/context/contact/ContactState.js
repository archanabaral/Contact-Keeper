import React, { useReducer } from "react";
import uuid from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "jill",
        email: "jill@gmail.com",
        phone: "7785836",
        type: "personal",
      },
      {
        id: 2,
        name: "pill",
        email: "pill@gmail.com",
        phone: "7785836",
        type: "personal",
      },
      {
        id: 3,
        name: "till",
        email: "till@gmail.com",
        phone: "7785836",
        type: "personal",
      },
    ],
  };
  //state allows us to access anything in our state
  //Dispatch allows us to dispatch object to the reducer
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add Contact

  //Delete Contact

  //Set Current Contact

  //Clear Current Contact

  //Update the Contact

  //Filter Contacts

  //Clear Filter

  return <ContactContext.Provider
        value={{
            contacts:state.contacts
        }}>
          {props.children}
      
        </ContactContext.Provider>;
};

export default ContactState
