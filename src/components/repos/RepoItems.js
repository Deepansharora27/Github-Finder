import React from "react";

const RepoItems = (props) => {
  return (
    <div className="card">
      <h3>
        <a href={props.repo.html_url}>{props.repo.name}</a>
      </h3>
    </div>
  );
};

export default RepoItems;
