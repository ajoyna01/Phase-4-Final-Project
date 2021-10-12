import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import EntryList from "../pages/EntryList";
import NewEntry from "../pages/NewEntry";
import Header from "./Header";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
    {/* <div style={{ backgroundImage:}} */}
    <Header user={user}/>
      <NavBar user={user} setUser={setUser} />
      
      <main>
      

        <Switch>
          <Route path="/new">
            <NewEntry user={user} />
          </Route>
          <Route path="/">
            <EntryList  user={user} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
