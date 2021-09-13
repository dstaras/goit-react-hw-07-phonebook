import shortid from "shortid";
import axios from "axios";
axios.defaults.baseURL = " http://localhost:3000";
export async function fetchContacts() {
  const { data } = await axios.get("/contacts");
  return data;
}

export async function addContacts({ name, number }, contacts) {
  const data = {
    id: shortid.generate(),
    name,
    number,
  };
  let repeat = contacts.some(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );
  if (repeat) {
    return null;
  }
  axios.post("http://localhost:3000/contacts", data);
  return data;
}
export async function deleteContacts(id) {
  axios.delete(`http://localhost:3000/contacts/${id}`);
  return id;
}
