import React from "react";
import { NextPage } from "next";
import { Layout } from "../../components/Layout";
import { Welcome } from "../../components/Welcome";
import { Incidents } from "../../features/incidents";

const Date: NextPage = () => {
  return (
    <Layout>
      <Welcome />
      <Incidents />
    </Layout>
  );
};

export default Date;
