import fse from 'fs-extra';
import path from "path";
import React, {useState, useEffect} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import ToolBar from '@material-ui/core/Toolbar';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {UWProskomma} from 'uw-proskomma';
import './App.css';

import { pagesArray, pages } from './conf.js';

const pk = new UWProskomma();
const mappingQueries = [];
const translationSources = [
    './data/unfoldingWord_en_ult_pkserialized.json',
    './data/unfoldingWord_en_ust_pkserialized.json',
    './data/unfoldingWord_hbo_uhb_pkserialized.json',
    './data/unfoldingWord_grc_ugnt_pkserialized.json',
    './data/ebible_en_web_pkserialized.json',
    './data/ebible_fr_lsg_pkserialized.json',
    './data/dbl_en_drh_pkserialized.json',
    './data/dbl_en_gnv_pkserialized.json',
].map((ts) => path.resolve(ts));

for (const [docSetId, vrsSource] of [
    ['ebible/en_web', 'data/web.vrs'],
    ['dbl/en_drh', 'data/drh.vrs'],
]) {
    const vrs = fse.readFileSync(path.resolve(vrsSource)).toString();
    const mutationQuery = `mutation { setVerseMapping(docSetId: "${docSetId}" vrsSource: """${vrs}""")}`;
    mappingQueries.push(mutationQuery);
}

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

    useEffect(() => {
        const loadTranslations = async () => {
            for (const translationSource of translationSources) {
                pk.loadSuccinctDocSet(fse.readJsonSync(translationSource));
            }
        };
        const loadMappings = async () => {
            for (const query of mappingQueries) {
                await pk.gqlQuery(query);
            }
        };
        loadTranslations().then(() =>
            loadMappings().then(() => {
                // setMutationCount(1);
            })
        );
    }, []);

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
                                <MenuItem component="a" key={p.url} href={`#${p.url}`} onClick={clearAnchor}>{p.menuEntry}</MenuItem>
                        )}
                    </Menu>
                    <Typography variant="title">
                        {pageTitle}
                    </Typography>
                </ToolBar>
            </AppBar>
            <HashRouter>
                <Route path={'/'}>
                    {DynamicRouter}
                </Route>
            </HashRouter>
        </div>
    );
});

export default App;
