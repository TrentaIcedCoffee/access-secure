import React, { useState, useEffect } from "react";
import "./styles.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Container,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import fire from "../../config/Fire";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { flexbox } from "@material-ui/system";
import { red } from "@material-ui/core/colors";

function useLogs() {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    fire
      .firestore()
      .collection("logs")
      .onSnapshot(snapshot => {
        const newLog = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setLogs(newLog);
      });
  }, []);

  return logs;
}

function sendDataToParent(type, message) {
  console.log("logsPage -> Parent");
  this.props.parentCallback(type, message);
}
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  centerContainer: {
    gap: 10
  }
}));

const LogList = () => {
  const classes = useStyles();
  const [way, setWay] = React.useState("");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  const handleChange = event => {
    setWay(event.target.value);
  };
  const logs = useLogs();
  return (
    <div>
      <Container>
        <Typography variant="h4" className="title" align="center">
          Log List
        </Typography>
      </Container>
      <Container className={classes.centerContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={way}
            onChange={handleChange}
          >
            <MenuItem value={1}>Time (new first)</MenuItem>
            <MenuItem value={2}>Time (new last)</MenuItem>
          </Select>
        </FormControl>
        <Tooltip title="Add new log">
          <IconButton>
            <NoteAddIcon />
          </IconButton>
        </Tooltip>
      </Container>
      <ol>
        {logs.map(log => (
          <li>
            <Typography align="left">
              {log.ip} {log.userid} {log.message}
              <IconButton
                onClick={() => {
                  sendDataToParent("success", "Log Deleted");
                }}
              >
                <DeleteForeverIcon style={{ color: red[300] }} />
              </IconButton>
              <Divider />
            </Typography>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LogList;
