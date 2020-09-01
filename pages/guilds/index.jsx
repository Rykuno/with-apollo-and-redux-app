import { initializeApollo } from "../../lib/apollo";
import GuildList, {
  ALL_GUILDS_QUERY
} from "../../components/GuildList/GuildList";
import Layout from "../../components/Layout";

const Guilds = () => {
  return (
    <Layout>
      <GuildList />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_GUILDS_QUERY
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    },
    revalidate: 1
  };
};

export default Guilds;
