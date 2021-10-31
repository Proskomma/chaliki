import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import styles from '../../../global_styles';
import ChapterNavigation from '../../../sharedComponents/ChapterNavigation';
import Container from "@material-ui/core/Container";
import DocSetPicker from "../../../sharedComponents/DocSetPicker";
import BookPicker from "../../../sharedComponents/BookPicker";
import InspectQuery from "../../../sharedComponents/InspectQuery";
import {renderVersesItems} from '../../../lib/render_items';
import { useQuery } from 'proskomma-react-hooks';


const BrowseChapter = withStyles(styles)((props) => {
    const {classes} = props;
    const [result, setResult] = React.useState({});
    const [query, setQuery] = React.useState('');
    const chapterQueryTemplate =
        '{\n' +
        '  docSet(id:"unfoldingWord/en_ult") {\n' +
        '    document(bookCode: "%bookCode%") {\n' +
        '      title: header(id: "toc2")\n' +
        '      mainSequence {\n' +
        '         blocks(withScriptureCV: "%chapter%") {\n' +
        '            bs { payload }\n' +
        '            items { type subType payload }\n' +
        '         }\n' +
        '      }\n' +
        '      nav: cvNavigation(chapter:"%chapter%" verse: "1") {\n' +
        '        previousChapter\n' +
        '        nextChapter\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '}';

        const proskomma = props.proskomma;
        const stateId = props.stateId;
        const { queryStateId, query: queryRun, data } = useQuery({
            proskomma,
            stateId,
            query,
          });

    React.useEffect(() => {
        const doQuery = async () => {
            if (props.browseChapter.selectedDocSet && props.browseChapter.selectedBook) {
                const browseQuery = chapterQueryTemplate
                    .replace(/%docSetId%/g, props.browseChapter.selectedDocSet)
                    .replace(/%bookCode%/g, props.browseChapter.selectedBook)
                    .replace(/%chapter%/g, props.browseChapter.selectedChapter)
                setQuery(browseQuery);
                // const res = await props.pk.gqlQuery(browseQuery);
                setResult(data);
                console.log("result query chapter" + JSON.stringify(result))
            }
        };
        doQuery();
    }, [
        props.browseChapter.selectedDocSet,
        props.browseChapter.selectedBook,
        props.browseChapter.selectedChapter,
        data
    ]);

    // React.useEffect(() => {
    //     if (props.browseChapter.selectedDocSet) {
    //         props.browseChapter.selectedBook || props.browseChapter.setSelectedBook(
    //             props.app.docSets
    //                 .filter(ds => ds.id === props.browseChapter.selectedDocSet)[0]
    //                 .documents[0]
    //                 .bookCode
    //         );
    //         props.browseChapter.selectedChapter || props.browseChapter.setSelectedChapter(1);
    //     }
    // }, [props.browseChapter.selectedDocSet, props.browseChapter.selectedChapter]);

    return (
        <>
            <div className={classes.toolbarMargin}/>
            <Container className={classes.page}>
                <div>
                    <DocSetPicker
                        selectedDocSet={props.browseChapter.selectedDocSet}
                        setSelectedDocSet={props.browseChapter.setSelectedDocSet}
                        app={props.app}
                    />
                    {props.app.docSets && props.browseChapter.selectedDocSet ?
                        <BookPicker
                            selectedDocSet={props.browseChapter.selectedDocSet}
                            selectedBook={props.browseChapter.selectedBook}
                            setSelectedBook={props.browseChapter.setSelectedBook}
                            setSelectedChapter={props.browseChapter.setSelectedChapter}
                            setSelectedVerse={props.browseChapter.setSelectedVerse}
                            app={props.app}
                        /> :
                        <Typography variant="h5" display="inline" className={classes.requireInput}>Please Select a
                            DocSet</Typography>
                    }
                    <InspectQuery app={props.app} raw={props.raw} query={query}/>
                </div>
                <div>
                    {
                        result ? result.docSet ? result.docSet.document?
                            <>
                            <ChapterNavigation
                                setSelectedChapter={props.browseChapter.setSelectedChapter}
                                direction="previous"
                                destination={result.docSet.document.nav.previousChapter}
                            /> 
                    
                    <Typography variant="body1" display="inline" className={classes.browseNavigationText}>
                        {props.browseChapter.selectedChapter || '-'}
                    </Typography>
                    
                            <ChapterNavigation
                                setSelectedChapter={props.browseChapter.setSelectedChapter}
                                direction="next"
                                destination={result.docSet.document.nav.nextChapter}
                            />
                            </> : '' : '' : ''
                    }
                </div>
                {
                    result ? result.docSet ? result.docSet.document?
                        [...result.docSet.document.mainSequence.blocks.entries()].map(
                            b => <Typography key={b[0]} variant="body1"
                                             className={classes[`usfm_${b[1].bs.payload.split('/')[1]}`]}>
                                {
                                    renderVersesItems(
                                        b[1].items,
                                        null,
                                        null,
                                        props.browseChapter,
                                        props.browseVerse,
                                        props.app,
                                    )
                                }
                            </Typography>
                        ) : (
                            <Typography variant="body1">No Results</Typography>
                        ): '' : ''
                }
            </Container>
        </>
    );
});

export default BrowseChapter;
