import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  makeStyles,
  Slide,
  TextField,
  Typography,
  Zoom,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import Link from "next/link";
import React, { useState } from "react";
import UserModel from "../../models/User";
import mongoose from "mongoose";
import { UserTypes } from "../../interfaces/user";
import { PlacementTestTypes } from "../../interfaces/placementTest";

const useStyles = makeStyles((theme) => ({
  unsubscribeSection: {
    padding: "1em",
  },
}));

const PreTestWindow = ({
  startTest,
  setError,
}: {
  startTest: Function;
  setError: Function;
}) => {
  const [checked, setChecked] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [email, setEmail] = useState("");

  const classes = useStyles();

  const onSubmitEmailClick = () => {
    if (email.indexOf("@") === -1) {
      setError("Please enter an email address");
      return;
    }

    const user: UserTypes.CreateUserPayload = {
      email: email,
      emailUnsubscribed: checked,
    };

    fetch("/api/users", {
      body: JSON.stringify(user),
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log(res);
        setSlideOut(true);
        setTimeout(startTest, 100);
      } else {
        setError("Error saving email");
      }
    });
  };

  return (
    <Grid item xs={12}>
      <Zoom in={!slideOut} mountOnEnter unmountOnExit>
        <FormControl fullWidth>
          <TextField
            required
            id="standard-required"
            fullWidth
            label="Enter your email address to begin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // defaultValue="Hello World"
          />
          <Grid
            container
            item
            justify="space-between"
            className={classes.unsubscribeSection}
            xs={12}
            spacing={4}
          >
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={2}>
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="caption" gutterBottom>
                  Check if you don't want to receive information about new
                  courses and free learning materials
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12} justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={onSubmitEmailClick}
              >
                Start Test
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </Zoom>
    </Grid>
  );
};

export const Test = ({ test }: { test: PlacementTestTypes.Test }) => {
  // Set to true when email address is entered to begin showing questions
  const [started, setStarted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Get the email address before starting the test
  if (!started) {
    return (
      <PreTestWindow startTest={() => setStarted(true)} setError={setError} />
    );
  } else {
    return (
      <Grid item xs={12}>
        <FormControl fullWidth></FormControl>
        {error && <Alert severity="error">{error}</Alert>}
      </Grid>
    );
  }
};
