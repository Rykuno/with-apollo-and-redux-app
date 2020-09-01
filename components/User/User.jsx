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

export const USER_QUERY = gql`
  query User($id: Int!) {
    users_by_pk(id: $id) {
      id
      username
      guilds {
        guild {
          name
          id
        }
      }
    }
  }
`;

const User = () => {
  const router = useRouter();
  console.log(router);
  const { loading, data, error } = useQuery(USER_QUERY, {
    variables: {
      id: router.query.id
    },
    notifyOnNetworkStatusChange: true
  });
  if (error) return <ErrorMessage message="Error loading user." />;
  if (loading) return <div>Loading</div>;
  const { users_by_pk: user } = data;

  return (
    <Box>
      <Typography variant="h4">{user.username}</Typography>
      <Box m={4}>
        <Typography variant="h6">Guilds</Typography>
        <List variant="nav">
          {user.guilds.map(({ guild }) => (
            <Link href="/guilds/[id]" as={`/guilds/${guild.id}`} key={guild.id}>
              <ListItem button key={guild.id}>
                <ListItemText primary={guild.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default User;
