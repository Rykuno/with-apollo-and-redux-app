import { initializeApollo } from "../../lib/apollo";
import User, { USER_QUERY } from "../../components/User/User";
import { gql } from "@apollo/client";
import Layout from "../../components/Layout";

const USER_IDS_QUERY = gql`
  query UserIds {
    users {
      id
    }
  }
`;

const GuildPage = () => {
  return (
    <Layout>
      <User />
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: USER_QUERY,
    variables: {
      id: params.id
    }
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: USER_IDS_QUERY
  });

  const params = data.users.map(({ id }) => ({
    params: {
      id: `${id}`
    }
  }));

  return {
    // paths: params,
    paths: [{ params: { id: "1" } }],
    fallback: true
  };
};

export default GuildPage;
