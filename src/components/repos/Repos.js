import React from "react";
import RepoItems from "./RepoItems";

const Repos = (props) => {
  return props.repos.map((repo) => <RepoItems repo={repo} key={repo.id} />);
};

export default Repos;
