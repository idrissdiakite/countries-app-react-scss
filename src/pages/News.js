import axios from "axios";
import React, { useEffect, useState } from "react";
import Article from "../components/Article";
import Navigation from "../components/Navigation";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3000/articles")
      .then((res) => setNewsData(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // permet de ne pas recharger la page quand on soumet

    if (content.length < 140) {
      // si le contenu est inférieur à 140 caractère, je passe l'erreur à true
      setError(true);
    } else {
      axios
        .post("http://localhost:3000/articles", {
          author, // = "author: author"
          content,
          date: Date.now(),
        })
        .then(() => {
          setError(false);
          setAuthor(""); // permet de vider l'input une fois le post envoyé
          setContent("");
          getData(); // permet d'afficher l'article automatiquement sans avoir à recharger la page
        });
    }
  };

  return (
    <div className="news">
      <Navigation />
      <h1>News</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          placeholder="Name"
          value={author}
        />
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid $color-3" }} // ternaire, si l'erreur est à true j'affiche une bordure rouge
          onChange={(e) => setContent(e.target.value)}
          placeholder="Message"
          value={content}
        ></textarea>
        {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
        <input type="submit" value="Send" />
      </form>

      <ul>
        {newsData
          .sort((a, b) => b.date - a.date) // permet d'afficher les articles les plus récents en haut
          .map((article) => (
            <Article key={article.id} article={article} />
          ))}
      </ul>
    </div>
  );
};

export default News;
