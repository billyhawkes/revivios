import React from "react";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Landing from "./components/Landing";
import HabitTracker from "./components/HabitTracker/HabitTracker";

function App() {
    return (
        <div className="App">
            <Router>
                <div style={{ display: "flex" }}>
                    <SideBar />
                    <Switch>
                        <Route exact path="/">
                            <Landing />
                        </Route>
                        <Route path="/habit">
                            <HabitTracker />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
