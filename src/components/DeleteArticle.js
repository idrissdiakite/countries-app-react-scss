import React from "react";
import axios from "axios";

const DeleteArticle = ({id}) => {
  const handleDelete = () => {
      axios.delete("http://localhost:3000/articles/" + id);
      window.location.reload(); // exceptionnel, utiliser plutôt "Redux"
  };

  return (
    <button
      onClick={() => {
        if (window.confirm("Are you sure you want to delete ?")) {
          handleDelete();
        }
      }}>Delete</button>
  );
};

export default DeleteArticle;
