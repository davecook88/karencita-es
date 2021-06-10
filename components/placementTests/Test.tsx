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
import Link from "next/link";
import React, { useState } from "react";
import { PlacementTestConfig } from "../../interfaces";
import Layout from "../Layout";

interface TestProps {
  test: PlacementTestConfig.Test;
}

const useStyles = makeStyles((theme) => ({
  unsubscribeSection: {
    padding: "1em",
  },
}));

const PreTestWindow = ({ startTest }: { startTest: Function }) => {
  const [checked, setChecked] = useState(false);
  const [slideOut, setSlideOut] = useState(false);

  const classes = useStyles();

  const onSubmitEmailClick = () => {
    setSlideOut(true);
    setTimeout(startTest, 100);
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
            // defaultValue="Hello World"
          />
          <Grid
            container
            justify="space-between"
            className={classes.unsubscribeSection}
            xs={12}
            spacing={4}
          >
            <Grid item container spacing={2}>
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

export const Test = ({ test }: TestProps) => {
  // Set to true when email address is entered to begin showing questions
  const [started, setStarted] = useState<boolean>(false);

  // Get the email address before starting the test
  if (!started) {
    return <PreTestWindow startTest={() => setStarted(true)} />;
  } else {
    return (
      <Grid item xs={12}>
        <FormControl fullWidth></FormControl>
      </Grid>
    );
  }
};
