import { initializeApollo } from "../../lib/apollo";
import UserList, { ALL_USERS_QUERY } from "../../components/UserList/UserList";
import Layout from "../../components/Layout";

const Users = () => {
  return (
    <Layout>
      <UserList />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_USERS_QUERY
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export default Users;
