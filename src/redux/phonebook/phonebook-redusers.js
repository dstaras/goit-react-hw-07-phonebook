import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import actions from "./phonebook-actions";
const initialItems = [];
const initialFilter = "";
const itemReducer = createReducer(initialItems, {
  [actions.fetchContactsSuccess]: (_, { payload }) => payload,
  [actions.addContactsSuccess]: (state, { payload }) => [...state, payload],
  [actions.deleteContactsSuccess]: (state, { payload }) =>
    state.filter((contact) => contact.id !== payload),
});
const filterReducer = createReducer(initialFilter, {
  [actions.filterContact]: (_, { payload }) => payload,
});

const isLoading = createReducer(false, {
  [actions.contactsRequest]: () => true,
  [actions.fetchContactsSuccess]: () => false,
  [actions.contactsError]: () => false,
});
const error = createReducer(null, {
  [actions.contactsRequest]: () => null,
  [actions.contactsError]: (_, { payload }) => payload,
});

export const contactsReducer = combineReducers({
  items: itemReducer,
  filter: filterReducer,
  isLoading,
  error,
});
