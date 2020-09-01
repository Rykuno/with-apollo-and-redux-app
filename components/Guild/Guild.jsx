import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import ErrorMessage from "../ErrorMessage";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box
} from "@material-ui/core";
import Link from "next/link";

export const GUILD_QUERY = gql`
  query Guild($id: Int!) {
    guilds_by_pk(id: $id) {
      id
      name
      users {
        user {
          username
          id
        }
      }
    }
  }
`;

const Guild = () => {
  const router = useRouter();
  const { loading, data, error } = useQuery(GUILD_QUERY, {
    variables: {
      id: router.query.id
    },
    notifyOnNetworkStatusChange: true
  });
  if (error) console.log(error);
  if (error) return <ErrorMessage message="Error loading guilds." />;
  if (loading) return <div>Loading</div>;
  const { guilds_by_pk: guild } = data;

  return (
    <Box>
      <Typography variant="h4">{guild.name}</Typography>
      <Box m={4}>
        <Typography variant="h6">Users</Typography>
        <List variant="nav">
          {guild.users.map(({ user }) => (
            <Link href="/users/[id]" as={`/users/${user.id}`} key={guild.id}>
              <ListItem button key={user.id}>
                <ListItemText primary={user.username} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Guild;
