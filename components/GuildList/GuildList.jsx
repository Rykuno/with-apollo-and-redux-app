import { gql, useQuery } from "@apollo/client";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Link from "next/link";

export const ALL_GUILDS_QUERY = gql`
  query AllGuilds {
    guilds {
      id
      name
    }
  }
`;

const Guilds = () => {
  const { loading, error, data } = useQuery(ALL_GUILDS_QUERY);
  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;
  const { guilds } = data;

  return (
    <List component="nav" aria-label="main mailbox folders">
      {guilds.map(guild => (
        <Link href="/guilds/[id]" as={`/guilds/${guild.id}`} key={guild.id}>
          <ListItem button>
            <ListItemText primary={guild.name} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default Guilds;
