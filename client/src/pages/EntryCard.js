import { useEffect } from "react";

function EntryCard({ user, entry, onDeleteEntry, onUpdateEntry }) {

const { id, title, comment, rating } = entry;

function handleDeleteClick() {
  fetch(`/entries/${id}`, {
    method: "DELETE",
  }).then((r) => {
    if (r.ok) {
     onDeleteEntry(id);
    }
  });
}

function handleUpdateClick() {
  const updateObj = {
    rating: entry.rating + 1,
  };
  fetch(`/entries/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateObj),
  })
    .then((r) => r.json())
    .then(onUpdateEntry);
}

return (
  <div className="box1">
  <h1 className="title">{title}</h1>
  <p>Stokes 🔥: {rating} </p>
  <p>By: {user.username}</p>
  <p>Entry: {comment}</p>
  
  <button className="link1" onClick={handleDeleteClick}>❌ Delete Entry</button>
  <button className="link1" onClick={handleUpdateClick}>Stoke 🔥 </button>


</div>


)
}
export default EntryCard;