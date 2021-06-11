import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import User from "../models/User";
import dbConnect from "../utils/mongodb";

const IndexPage = () => (
  <Layout showNav={true} title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect();
  /* find all the data in our database */
  const result = await User.find({});
  const users = result.map((doc) => {
    const user = doc.toObject();
    user._id = user._id.toString();
    return user;
  });

  return {
    props: {
      users: users,
    },
  };
}
