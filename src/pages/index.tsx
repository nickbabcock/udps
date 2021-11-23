import React from "react";
import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { Incidents } from "../features/incidents";
import { Welcome } from "../components/Welcome";

const Home: NextPage = () => {
  return (
    <Layout>
      <Welcome/>
      <Incidents/>
    </Layout>
  );
};

export default Home;
