import React from "react";
import { NextPage } from "next";
import { Layout } from "../components/Layout";
import { Statistics as StatisticsContent } from "../features/statistics";

const Statistics: NextPage = () => {
  return (
    <Layout>
      <StatisticsContent/>
    </Layout>
  );
};

export default Statistics;
