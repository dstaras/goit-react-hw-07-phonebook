import * as contactsActions from "./phonebook-actions";
import * as contactsAPI from "./phonebook-api";
export const fetchContacts = () => async (dispatch) => {
  dispatch(contactsActions.contactsRequest());
  try {
    const contacts = await contactsAPI.fetchContacts();
    dispatch(contactsActions.fetchContactsSuccess(contacts));
  } catch (error) {
    dispatch(contactsActions.contactsError(error.message));
  }
};

export const addContacts =
  ({ name, number }, contacts) =>
  async (dispatch) => {
    dispatch(contactsActions.contactsRequest());
    try {
      const data = await contactsAPI.addContacts({ name, number }, contacts);
      if (!data) {
        return alert("this contact is already in the phone book");
      }
      dispatch(contactsActions.addContactsSuccess(data));
    } catch (error) {
      dispatch(contactsActions.contactsError(error.message));
    }
  };

export const deleteContacts = (id) => async (dispatch) => {
  dispatch(contactsActions.contactsRequest());
  try {
    const data = await contactsAPI.deleteContacts(id);
    dispatch(contactsActions.deleteContactsSuccess(data));
  } catch (error) {
    dispatch(contactsActions.contactsError(error.message));
  }
};
