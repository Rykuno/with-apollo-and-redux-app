import { initializeApollo } from "../../lib/apollo";
import Guild, { GUILD_QUERY } from "../../components/Guild/Guild";
import { gql } from "@apollo/client";
import Layout from "../../components/Layout";

const GUILD_IDS_QUERY = gql`
  query GuildIds {
    guilds {
      id
    }
  }
`;

const GuildPage = () => {
  return (
    <Layout>
      <Guild />
    </Layout>
  );
};

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GUILD_QUERY,
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
  const guildIds = await apolloClient.query({
    query: GUILD_IDS_QUERY
  });

  const params = guildIds.data.guilds.map(({ id }) => ({
    params: {
      id: `${id}`
    }
  }));

  return {
    paths: params,
    fallback: true
  };
};

export default GuildPage;
