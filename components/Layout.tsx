import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "../theme/muiTheme";
import NavBar from "./NavBar";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { Facebook, Instagram, YouTube } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  socMedLink: {
    margin: theme.spacing(1),
  },
  facebook: {
    "&:hover": {
      color: "#4267B2",
    },
  },
  youtube: {
    "&:hover": {
      color: "#c4302b",
    },
  },
  instagram: {
    "&:hover": {
      color: "#d6249f ",
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

type Props = {
  children?: ReactNode;
  title?: string;
  showNav: boolean;
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      La Karencita {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SocialMedia = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item>
        <a href="https://facebook.com/LaKarencitaMX" target="_blank">
          <Box className={classes.socMedLink}>
            <Facebook
              fontSize="large"
              className={clsx(classes.icon, classes.facebook)}
            />
          </Box>
        </a>
      </Grid>
      <Grid item>
        <a
          href="https://www.youtube.com/channel/UCJ9lYSdFSSr_d8wrb2neIHA"
          target="_blank"
        >
          <Box className={classes.socMedLink}>
            <YouTube
              fontSize="large"
              className={clsx(classes.icon, classes.youtube)}
            />
          </Box>
        </a>
      </Grid>
      <Grid item>
        <a href="https://www.instagram.com/lakarencitaa/" target="_blank">
          <Box className={classes.socMedLink}>
            <Instagram
              fontSize="large"
              className={clsx(classes.icon, classes.instagram)}
            />
          </Box>
        </a>
      </Grid>
    </>
  );
};

const Layout = ({
  children,
  title = "This is the default title",
  showNav,
}: Props) => {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <header>
          {showNav && <NavBar />}
          {/* <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
          |{" "}
          <Link href="/about">
            <a>About</a>
          </Link>{" "}
          |{" "}
          <Link href="/users">
            <a>Users List</a>
          </Link>{" "}
          | <a href="/api/users">Users API</a>
        </nav> */}
        </header>
        {children}
        <footer className={classes.footer}>
          <Grid container>
            <Grid item md={4}></Grid>

            <Grid xs={12} item md={4}>
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
                component="p"
              >
                Don't just survive in Spanish, thrive in Spanish!
              </Typography>
              <Copyright />
            </Grid>
            <Grid item container xs={12} md={4} justify="center">
              <SocialMedia />
            </Grid>
          </Grid>
        </footer>
      </div>
    </MuiThemeProvider>
  );
};

export default Layout;
