import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";

import { User } from "../../interfaces";
import { sampleUserData } from "../../utils/sample-data";
import Layout from "../../components/Layout";
import List from "../../components/List";
import { PlacementTestModel } from "../../models/PlacementTest";
import { PlacementTestTypes } from "../../interfaces/placementTest";

type Props = {
  tests: PlacementTestTypes.TestStructure[];
};

const WithStaticProps = ({ tests }: Props) => (
  <Layout showNav={true} title="Users List | Next.js + TypeScript Example">
    <h1>Placement Test List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List type="placementTests" items={tests} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const result = await PlacementTestModel.find({});
  const tests = result.map((doc) => {
    const test = doc.toObject();
    test._id = test._id.toString();
    const testStructure: PlacementTestTypes.TestStructure = {
      description: test.description,
      image: test.image,
      level: test.level,
      name: test.name,
      slug: test.slug,
      _id: test._id,
    };
    return testStructure;
  });
  return {
    props: {
      tests: tests || [],
    },
  };
};

export default WithStaticProps;
