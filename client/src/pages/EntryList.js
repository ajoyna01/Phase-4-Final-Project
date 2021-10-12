import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { Box, Button } from "../styles";
import styled from "styled-components";
import '../styles/App.css';
import EntryCard from "./EntryCard"

function EntryList({ user }) {
  const [entries, setEntries] = useState([]);
  

  useEffect(() => {
    fetch("/entries")
      .then((r) => r.json())
      .then(setEntries);
     
  }, []);

function handleDeleteEntry(id) {
  const updatedEntryArray = entries.filter((entry) => entry.id !== id);
  setEntries(updatedEntryArray);
}
function handleUpdateEntry(updatedEntry) {
  const updatedRating = entries.map((entry) => 
  entry.id === updatedEntry.id ? updatedEntry : entry
  );
   setEntries(updatedRating);
}
return (
    <Wrapper>
      {entries.length > 0 ? (
        entries.map((entry) => (
          <Box key={entry.id}>
           <EntryCard
           user={user}
           entry={entry}
           onDeleteEntry={handleDeleteEntry}
           onUpdateEntry={handleUpdateEntry}
           />
          </Box>
        ))
      ) : (
        <>
          <h2 className="nonefound">None Found: Make your first entry...</h2>
          <Link className="link1" as={Link} to="/new">
            Make new
          </Link>
        </>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;
export default EntryList;
