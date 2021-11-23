import React from "react";
import { NextPage } from "next";
import { Layout } from "../components/Layout";
import { About as AboutContent } from "../components/About";

const About: NextPage = () => {
  return (
    <Layout>
      <AboutContent />
    </Layout>
  );
};

export default About;
