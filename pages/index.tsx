import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import User from "../models/User";
import dbConnect from "../utils/mongodb";
import { InferGetStaticPropsType } from "next";

const IndexPage = ({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout showNav={true} title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    {users.map((user) => (
      <p>{user.email}</p>
    ))}
  </Layout>
);

export default IndexPage;

export async function getStaticProps() {
  await dbConnect();
  /* find all the data in our database */
  const result = await User.find({});
  const users = result.map((doc) => {
    const user = doc.toObject();
    user._id = user._id.toString();
    return user;
  });

  console.log(users);

  return {
    props: {
      users: users,
    },
  };
}
