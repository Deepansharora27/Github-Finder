import React, { useState } from "react";

const Search = ({ searchUser, showClear, clearUsers, setAlert }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please Enter Something", "light");
    } else {
      //Passing This Prop to the Parent Component Using Our Event Handler.
      searchUser(text);
      setText("");
    }
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users"
          value={text}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      <button className="btn btn-light btn-block" onClick={clearUsers}>
        Clear
      </button>
    </div>
  );
};

export default Search;
