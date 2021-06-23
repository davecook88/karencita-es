import {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";

import Layout from "../../../components/Layout";
import List from "../../../components/List";
import { PlacementTestModel } from "../../../models/PlacementTest";
import {
  Button,
  Container,
  createStyles,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { PlacementTestTypes } from "../../../interfaces/placementTest";
import { BASE_URL, TEST_CONFIG } from "../../../utils/config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

const AddNewTestForm = () => {
  const blankTestStructure: PlacementTestTypes.TestStructure = {
    name: "",
    description: "",
    image: {
      title: "",
      url: "",
    },
    slug: "",
    level: "elementary",
  };
  const [testConfig, setTestConfig] =
    useState<PlacementTestTypes.TestStructure>(blankTestStructure);

  useEffect(() => {
    const slug = testConfig.name.toLowerCase().split(" ").join("-");
    setTestConfig({ ...testConfig, slug });
  }, [testConfig.name]);

  const clickHandler = () => {
    fetch(BASE_URL + "api/placementTests", {
      method: "POST",
      body: JSON.stringify(testConfig),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setTestConfig(blankTestStructure);
      }
    });
  };

  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid item container xs={12}>
        <Typography component="h2" variant="h4">
          Add new test
        </Typography>
      </Grid>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="test-name-text-input"
            value={testConfig.name}
            fullWidth
            onChange={(e) =>
              setTestConfig({ ...testConfig, name: e.target.value })
            }
            label="Test Name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="test-description-text-input"
            label="Description"
            multiline
            fullWidth
            rows={4}
            onChange={(e) =>
              setTestConfig({ ...testConfig, description: e.target.value })
            }
            value={testConfig.description}
            variant="outlined"
          />{" "}
        </Grid>
        <Grid item xs={6}>
          <Select
            labelId="test-level-select"
            id="test-level-select"
            value={testConfig.level}
            onChange={(e) =>
              setTestConfig({ ...testConfig, level: e.target.value })
            }
          >
            {TEST_CONFIG.levels.map((l) => (
              <MenuItem value={l} key={l}>
                {l}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Button color="primary" variant="outlined" onClick={clickHandler}>
            Add Test
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

const AdminScreen = ({
  tests,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout showNav={true} title="Admin">
      <Container>
        <Grid container justify="center">
          <Grid item>
            <Typography component="h2" variant="h4">
              Admin
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm">
        <Grid container justify="center">
          <Grid item container justify="center">
            <Grid item xs={12}>
              <Typography component="h2" variant="h4">
                Tests
              </Typography>
            </Grid>
            <Grid item>
              <Typography>Existing tests</Typography>
            </Grid>
            <Grid item>
              <List items={tests} type="placementTests" />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm">
        <AddNewTestForm />
      </Container>

      <Link href="/">
        <a>Go home</a>
      </Link>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const result = await PlacementTestModel.find({});
  const tests = result.map((doc) => {
    const test = doc.toObject();
    test._id = test._id.toString();
    delete test.questions;
    return test;
  });
  return {
    props: {
      tests: tests || [],
    },
  };
};

export default AdminScreen;
