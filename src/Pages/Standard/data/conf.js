import Data from './Data';

const conf = {
  url: "data",
  menuEntry: "Manage Data Sources",
  pageTitle: "Data Sources",
  description: "View, add and remove docSets",
  pageClass: Data,
  state: [
      ['docSets', {}],
  ],
};

export default conf;
