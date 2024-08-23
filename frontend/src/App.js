import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';


const App = () => {

    return (
        <Router>
            <Switch>
                {/* Route for the TaskList component */}
                <Route exact path="/" component={TaskList} />
                {/* Route for the AddTask component */}
                <Route path="/add-task" component={AddTask} />
            </Switch>
        </Router>
    );
};

export default App;
