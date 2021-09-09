import React, { useState } from "react";
import axios from "axios";
import DeleteArticle from "./DeleteArticle";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditContent] = useState("");

  // permet de formatter la date en Français
  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return newDate;
  };

  // permet d'editer un commentaire et de mettre à jour la base de donnée
  const handleEdit = () => {
    // En JSON même si seul le content est modifié, il est obligatoire de remettre l'auteur et la date
    const data = {
      author: article.author,
      content: editedContent ? editedContent : article.content, // si l'article n'a pas été modifié, on remet le contenu initial en bdd
      date: article.date,
    };

    axios.put("http://localhost:3000/articles/" + article.id, data).then(() => {
      setIsEditing(false);
    });
  };

  return (
    <div className="article" style={{background: isEditing ? '#f3feff' : "white"}}>
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateParser(article.date)}</em>
      </div>

      {isEditing ? (
        <textarea
          onChange={(e) => setEditContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : article.content}
        ></textarea>
      ) : (
        <p>{editedContent ? editedContent : article.content}</p>
      )}

      <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}>Submit</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <DeleteArticle id={article.id}/>
      </div>
    </div>
  );
};

export default Article;
