import dataConf from './Pages/Standard/data/conf';
import browseConf from './Pages/Standard/browse/conf';
import searchConf from './Pages/Standard/search/conf';
import editConf from './Pages/Standard/edit/conf';
import alignmentConf from './Pages/Standard/alignment/conf';
import mappingConf from './Pages/Standard/mapping/conf';
import rawConf from './Pages/Standard/rawQuery/conf';
import aboutConf from './Pages/Standard/about/conf';

const pagesArray = [dataConf, browseConf, searchConf, editConf, alignmentConf, mappingConf, rawConf, aboutConf];
let pages = {};
let stateSpec = {};
for (const page of pagesArray) {
    pages[page.url] = page;
    stateSpec[page.url] = page.state || [];
}

export {pagesArray, pages, stateSpec};
