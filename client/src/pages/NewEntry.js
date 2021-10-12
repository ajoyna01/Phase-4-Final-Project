import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";



function NewEntry({ user }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("1")
  const [parks, setParks] = useState([])
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch("https://developer.nps.gov/api/v1/parks?api_key=jiubTrXhccHzfcEc6ihhjVV18MssQBvGoLrHNkQw")
      .then((r) => r.json())
      .then((data) => {
        setParks(data.data);
        console.log(data.data)
      });
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        comment,
        rating
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2 className="createentry">Create Entry</h2>
        <form className="box1" onSubmit={handleSubmit}>
        <FormField>
          <h1 className="title2">Title</h1>
           
      <select className="dropdown" type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}>
      <option value="">--Please choose an option--</option>
      {parks.map((parks) => {
            return(
                <option value={parks.fullName} key={parks.fullName}>{parks.fullName}</option>
            )
        })}
      </select>
          </FormField>
         
          <FormField>
            <h1 className="title2"htmlFor="comment">Comments:</h1>
            <Textarea placeholder="Your experience here..."
             
             
              rows="10"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FormField>
          <FormField>
            <button className="link1" color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Entry"}
            </button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>

    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewEntry;
