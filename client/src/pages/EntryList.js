import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";


function EntryList({user}) {
  const [entries, setEntries] = useState([]);
  

  useEffect(() => {
    fetch("/entries")
      .then((r) => r.json())
      .then(setEntries);
  }, []);

  function handleDelete(id) {
    fetch(`/entries/${id}`, {
      method: "DELETE",
    }).then(console.log("delete"));
  }

  function handleUpdate(id) {
    fetch(`/entries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: 8 }),
    })
      .then((r) => r.json())
      .then(console.log("update"));

  }



  return (
    <div>
      {entries.length > 0 ? (
        entries.map((entry) => (
          <div key={entry.id}>
            <div>
              <h2>{entry.title}</h2>
              <p>
                <em>Rating: {entry.rating} </em>
                &nbsp;·&nbsp;
                <cite>By {entry.user.username}</cite>
              </p>
              <ReactMarkdown>{entry.comment}</ReactMarkdown>
              <button onClick={() => handleDelete(entry.id)}>Delete</button>
              <button onClick={() => handleUpdate(entry.id)}>Update</button>
            </div>
          </div>
        ))
      ) : (
        <>
          <h2>None Found</h2>
          <button as={Link} to="/new">
            Make new
          </button>
        </>
      )}
    </div>
  );
}

export default EntryList;
