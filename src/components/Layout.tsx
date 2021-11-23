import Head from "next/head";
import React from "react";
import { Header } from "./Header";

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Umich DPS</title>
        <meta
          name="description"
          content="The University of Michigan's Department of Public Safety (DPS) publishes their data and this website allows users to geographically view incidents along with statistical information."
        />

        <meta name="color-scheme" content="dark light"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <main>{children}</main>
      </div>
      <style jsx>{`
        div {
          display: grid;
          grid-template-rows: auto 1fr;
          width: min(100%, 900px);
          min-height: 100vh;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};
