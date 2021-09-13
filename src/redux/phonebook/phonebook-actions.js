import { createAction } from "@reduxjs/toolkit";

export const filterContact = createAction("contacts/CHANGE_FILTER");

export const contactsRequest = createAction("contacts/fetchContactsRequest");
export const fetchContactsSuccess = createAction(
  "contacts/fetchContactsSuccess"
);
export const contactsError = createAction("contacts/fetchContactsError");

export const addContactsSuccess = createAction("contacts/addContactsSuccess");

export const deleteContactsSuccess = createAction(
  "contacts/deleteContactsSuccess"
);

const defaultExport = {
  filterContact,
  contactsRequest,
  fetchContactsSuccess,
  contactsError,
  addContactsSuccess,
  deleteContactsSuccess,
};

export default defaultExport;
