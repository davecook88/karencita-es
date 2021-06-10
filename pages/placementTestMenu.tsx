import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import Layout from "../components/Layout";
import { PlacementTestConfig } from "../interfaces";
import { getAllPlacementTests } from "../utils/placementTests";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const CourseCard = ({ course }: { course: PlacementTestConfig.Test }) => {
  const classes = useStyles();
  return (
    <Grid item key={course.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {course.name}
          </Typography>
          <Typography>{course.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <Link href={`/placementTests/${course.slug}`}>Take the test</Link>
          </Button>
          {/* <Button size="small" color="primary">
                        Edit
                      </Button> */}
        </CardActions>
      </Card>
    </Grid>
  );
};

const PlacementTestMenu = () => {
  const [courses, setCourses] = useState<PlacementTestConfig.Test[]>([]);

  useEffect(() => {
    getAllPlacementTests()
      .then((tests) => setCourses(tests))
      .catch((err) => console.log(err));
  }, []);
  const classes = useStyles();
  return (
    <Layout showNav={true} title="La Karencita - Placement Test">
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Find the course for you
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              We need to find out your current Spanish level so that we can
              identify which course is perfect for your level.
            </Typography>
            <Typography
              // variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Don't worry if there isn't a course for you right now. We're
              working on new courses right now. Leave your email address to get
              free materials and to find out when new courses are available.
            </Typography>
          </Container>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {courses.map((course) => (
                <CourseCard course={course} />
              ))}
            </Grid>
          </Container>
        </div>
      </main>
    </Layout>
  );
};

export default PlacementTestMenu;
