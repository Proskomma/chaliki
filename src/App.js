import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ToolBar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

import './App.css';

const styles = theme => ({});

const Data = props => {
    return (
        <Container>
            <p>Data {Object.keys(props)}</p>
        </Container>);
}

const Browse = props => {
    return (
        <Container>
            <p>Browse</p>
        </Container>);
}

const Search = props => {
    return (
        <Container>
            <p>Search</p>
        </Container>);
}

const Edit = props => {
    return (
        <Container>
            <p>Edit</p>
        </Container>);
}

const Alignment = props => {
    return (
        <Container>
            <p>Alignment</p>
        </Container>);
}

const Mapping = props => {
    return (
        <Container>
            <p>Mapping</p>
        </Container>);
}

const RawQuery = props => {
    return (
        <Container>
            <p>Raw Query</p>
        </Container>);
}

const About = props => {
    return (
        <Container>
            <p>About</p>
        </Container>);
}

const App = withStyles(styles)(props => {
    const {classes} = props;
    const [menuAnchor, setMenuAnchor] = useState(null);
    const clearAnchor = () => setMenuAnchor(null);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <ToolBar>
                    <IconButton
                        color="inherit"
                        aria-label="Menu"
                        onClick={e => setMenuAnchor(e.currentTarget)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={clearAnchor}
                    >
                        <MenuItem component="a" href="/data">Manage Data</MenuItem>
                        <Divider/>
                        <MenuItem component="a" href="/browse">Browse</MenuItem>
                        <MenuItem component="a" href="/search">Search</MenuItem>
                        <MenuItem component="a" href="/edit">Edit</MenuItem>
                        <MenuItem component="a" href="/alignment">Word Alignment</MenuItem>
                        <MenuItem component="a" href="/mapping">Verse Mapping</MenuItem>
                        <Divider/>
                        <MenuItem component="a" href="/raw">Raw Query</MenuItem>
                        <Divider/>
                        <MenuItem component="a" href="/about">About Chaliki</MenuItem>
                    </Menu>
                </ToolBar>
            </AppBar>
            <Router>
                <Switch>
                    <Route path="/data">
                        <Data/>
                    </Route>
                    <Route path="/browse">
                        <Browse/>
                    </Route>
                    <Route path="/search">
                        <Search/>
                    </Route>
                    <Route path="/edit">
                        <Edit/>
                    </Route>
                    <Route path="/alignment">
                        <Alignment/>
                    </Route>
                    <Route path="/mapping">
                        <Mapping/>
                    </Route>
                    <Route path="/raw">
                        <RawQuery/>
                    </Route>
                    <Route path="/">
                        <About/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
});

export default App;
