import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Test } from "../../components/placementTests/Test";
import { PlacementTestTypes } from "../../interfaces/placementTest";
import { PlacementTestModel } from "../../models/PlacementTest";

import {
  getAllPlacementTests,
  getPlacementTest,
} from "../../utils/placementTests";
const useStyles = makeStyles({
  questionCard: {
    width: "100%",
    padding: "3em",
    margin: "2em",
    minHeight: "50vh",
  },
});

const PlacementTest = (props: { item: PlacementTestTypes.TestStructure }) => {
  console.log(props);
  const router = useRouter();
  const classes = useStyles();
  const { slug } = router.query;

  return (
    <Layout showNav={false} title={props.item.name}>
      <Container>
        <Grid container justify="center">
          <Grid item>
            <Typography component="h2" variant="h4">
              {props.item.name}
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="sm">
        <Grid container alignItems="center">
          <Grid
            item
            container
            component={Paper}
            className={clsx(classes.questionCard)}
            alignItems="center"
          >
            {/* <Test test={props.item}></Test> */}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users

  const tests = await PlacementTestModel.find({});
  const paths = tests.map((test) => ({
    params: { slug: test.slug.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params.slug instanceof Array ? params.slug[0] : params.slug;

    const result = await PlacementTestModel.find({});
    const tests = result.map((doc) => {
      const test = doc.toObject();
      test._id = test._id.toString();
      return test;
    });
    return {
      props: {
        tests: tests || [],
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

export default PlacementTest;
