import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import {
  visibleItems,
  getIsLoading,
  getError,
  stateItems,
} from "../../redux/phonebook/phonebook-selectors";
import * as contactsOperations from "../../redux/phonebook/phonebook-operation";
import { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  List: {
    marginTop: 20,
  },
  Loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Typography: {
    marginTop: 20,
    textAlign: "center",
  },
});
export default function ContactsList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const allContacts = useSelector((state) => stateItems(state));
  const visibleContacts = useSelector((state) => visibleItems(state));
  const isLoaderRender = useSelector((state) => getIsLoading(state));
  const errorMessage = useSelector((state) => getError(state));

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);
  return (
    <>
      {errorMessage && allContacts.length < 1 && (
        <Typography
          color="primary"
          className={classes.Typography}
          variant="h3"
          component="h2"
        >
          {errorMessage}. Try another time
        </Typography>
      )}
      {isLoaderRender && allContacts.length < 1 ? (
        <Loader
          className={classes.Loader}
          type="ThreeDots"
          color="#3f51b5"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <></>
      )}

      <List className={classes.List}>
        {visibleContacts ? (
          visibleContacts.map(({ name, number, id }) => (
            <ListItem key={id}>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon aria-label="person" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} />
              <ListItemText color="primary" primary={number} />
              <ListItemSecondaryAction>
                <IconButton
                  id={id}
                  onClick={async (e) => {
                    const { id } = e.currentTarget;
                    dispatch(contactsOperations.deleteContacts(id));
                  }}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <></>
        )}
      </List>
    </>
  );
}
