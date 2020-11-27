import React from "react";
import {Layout} from "../components/Layout";
import {Dashboard} from "../components/Dashboard";

export default function Home({user}) {
  return (
    <Layout user={user}>
      {
        user
          ? <Dashboard />
          : ""
      }
    </Layout>
  )
}
