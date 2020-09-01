import { gql, useQuery } from "@apollo/client";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Link from "next/link";

export const ALL_USERS_QUERY = gql`
  query AllUsers {
    users {
      id
      username
    }
  }
`;

const Guilds = () => {
  const { loading, error, data } = useQuery(ALL_USERS_QUERY);
  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;
  const { users } = data;

  return (
    <List component="nav" aria-label="main mailbox folders">
      {users.map(user => (
        <Link href="/users/[id]" as={`/users/${user.id}`} key={user.id}>
          <ListItem button>
            <ListItemText primary={user.username} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default Guilds;
