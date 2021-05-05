import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ToolBar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import './App.css';

import { pagesArray, pages } from './conf.js';

import {UWProskomma} from 'uw-proskomma';
const pk = new UWProskomma();

const styles = theme => ({});

const App = withStyles(styles)(props => {
    const {classes} = props;
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [pageTitle, setPageTitle] = useState('');
    const clearAnchor = () => setMenuAnchor(null);

    const DynamicRouter = props => {
        const page = pages[props.location.pathname.substring(1)] || pages.data;
        setPageTitle(page.pageTitle);
        return <page.pageClass pk={pk}/>;
    }

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
                        {pagesArray.map(
                            p =>
                                <MenuItem component="a" key={p.url} href={p.url}>{p.menuEntry}</MenuItem>
                        )}
                    </Menu>
                    <Typography variant="title">
                        {pageTitle}
                    </Typography>
                </ToolBar>
            </AppBar>
            <Router>
                <Route path={'/'}>
                    {DynamicRouter}
                </Route>
            </Router>
        </div>
    );
});

export default App;
