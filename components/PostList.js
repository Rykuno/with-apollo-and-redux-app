import { gql, useQuery, NetworkStatus } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";

export const ALL_USERS_QUERY = gql`
  query AllUsers {
    users {
      username
      id
    }
  }
`;

export default function PostList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_USERS_QUERY,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true
    }
  );

  // const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  // const loadMorePosts = () => {
  //   fetchMore({
  //     variables: {
  //       skip: allPosts.length
  //     }
  //   });
  // };

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <div>Loading</div>;

  const { users } = data;
  // const areMorePosts = allPosts.length < _allPostsMeta.count;

  return (
    <section>
      <ul>
        {users.map((user, index) => (
          <li key={user.id}>
            <div>
              <span>{index + 1}. </span>
              <p>{user.username}</p>
              {/* <PostUpvoter id={post.id} votes={post.votes} /> */}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
