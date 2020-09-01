import { useDispatch } from "react-redux";
import { initializeStore } from "../lib/redux";
import { initializeApollo } from "../lib/apollo";
import Layout from "../components/Layout";
// import PostList, { ALL_USERS_QUERY } from "../components/PostList";

const IndexPage = () => {
  return (
    <Layout>
      <h1>Welcome to GuildHub</h1>
    </Layout>
  );
};

export default IndexPage;
