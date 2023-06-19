import React from "react";
import {
  gql,
  useQuery,
  ApolloClient,
  NormalizedCacheObject
} from "@apollo/client";
import MasterDetail from "./MasterDetail";

const GET_REPOS = gql`
  query GetRepos($organization: String!) {
    organization(login: $organization) {
      repositories(first: 100, privacy: PUBLIC) {
        nodes {
          id
          name
          description
        }
      }
    }
  }
`;

interface RepoListProps {
  client: ApolloClient<NormalizedCacheObject>;
}

const RepoList: React.FC<RepoListProps> = ({ client }) => {
  const { loading, error, data } = useQuery(GET_REPOS, {
    variables: { organization: process.env.GITHUB_ORG },
    client
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const repos = data?.organization?.repositories?.nodes || [];

  return (
    <MasterDetail>
      {/* for each repo, render a MasterDetail item */}
      {repos.map((repo: any) => (
        <MasterDetail.Item payload={{ content: repo.description }}>
          {repo.name}
        </MasterDetail.Item>
      ))}

      <MasterDetail.Detail>
        {(payload: { content: string }) => payload.content}
      </MasterDetail.Detail>
    </MasterDetail>
  );
};

export default RepoList;
