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
import VerseNavigation from "../../../sharedComponents/VerseNavigation";

const BrowseVerseBlocks = withStyles(styles)((props) => {
    const {classes} = props;
    const [selectedDocSet, setSelectedDocSet] = React.useState(null);
    const [selectedBook, setSelectedBook] = React.useState(null);
    const [selectedChapter, setSelectedChapter] = React.useState(null);
    const [selectedVerse, setSelectedVerse] = React.useState(null);
    const [result, setResult] = React.useState({});
    const [query, setQuery] = React.useState('');
    const chapterQueryTemplate =
        '{\n' +
        '  docSet(id:"%docSetId%") {\n' +
        '    document(bookCode: "%bookCode%") {\n' +
        '      title: header(id: "toc2")\n' +
        '      mainSequence {\n' +
        '         blocks(withScriptureCV: "%chapter%:%verse%") {\n' +
        '            bs { payload }\n' +
        '            items { type subType payload }\n' +
        '         }\n' +
        '      }\n' +
        '      nav: cvNavigation(chapter:"%chapter%" verse: "%verse%") {\n' +
        '        previousChapter\n' +
        '        nextChapter\n' +
        '        previousVerse { chapter verse }\n' +
        '        nextVerse { chapter verse }\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '}';

    React.useEffect(() => {
        const doQuery = async () => {
            if (selectedDocSet && selectedBook) {
                const browseQuery = chapterQueryTemplate
                    .replace(/%docSetId%/g, selectedDocSet)
                    .replace(/%bookCode%/g, selectedBook)
                    .replace(/%chapter%/g, selectedChapter)
                    .replace(/%verse%/g, selectedVerse)
                setQuery(browseQuery);
                const res = await props.pk.gqlQuery(browseQuery);
                setResult(res);
            }
        };
        doQuery();
    }, [
        selectedDocSet,
        selectedBook,
        selectedChapter,
        selectedVerse,
    ]);

    React.useEffect(() => {
        if (selectedDocSet) {
            setSelectedBook(
                props.app.docSets
                    .filter(ds => ds.id === selectedDocSet)[0]
                    .documents[0]
                    .bookCode
            );
            setSelectedChapter(1);
            setSelectedVerse(1);
        }
    }, [selectedDocSet]);

    return (
        <>
            <div className={classes.toolbarMargin}/>
            <Container className={classes.page}>
                <div>
                    <DocSetPicker
                        selectedDocSet={selectedDocSet}
                        setSelectedDocSet={setSelectedDocSet}
                        app={props.app}
                    />
                    {props.app.docSets && selectedDocSet ?
                        <BookPicker
                            selectedDocSet={selectedDocSet}
                            selectedBook={selectedBook}
                            setSelectedBook={setSelectedBook}
                            app={props.app}
                        /> :
                        <Typography variant="h5" display="inline" className={classes.requireInput}>Please Select a
                            DocSet</Typography>
                    }
                    <InspectQuery app={props.app} raw={props.raw} query={query}/>
                </div>
                <div>
                    {
                        'data' in result && 'docSet' in result.data && 'document' in result.data.docSet && result.data.docSet.document ?
                            <>
                                <ChapterNavigation
                                    setSelectedChapter={setSelectedChapter}
                                    setSelectedVerse={setSelectedVerse}
                                    direction="previous"
                                    destination={result.data.docSet.document.nav.previousChapter}
                                />
                                <VerseNavigation
                                    setSelectedChapter={setSelectedChapter}
                                    setSelectedVerse={setSelectedVerse}
                                    direction="previous"
                                    destination={result.data.docSet.document.nav.previousVerse}
                                />
                            </> : ''
                    }
                    <Typography variant="body1" display="inline" className={classes.browseNavigationText}>
                        {`${selectedChapter || '-'}:${selectedVerse || '-'}`}
                    </Typography>
                    {
                        'data' in result && 'docSet' in result.data && 'document' in result.data.docSet && result.data.docSet.document ?
                            <>
                                <VerseNavigation
                                    setSelectedChapter={setSelectedChapter}
                                    setSelectedVerse={setSelectedVerse}
                                    direction="next"
                                    destination={result.data.docSet.document.nav.nextVerse}
                                />
                                <ChapterNavigation
                                    setSelectedChapter={setSelectedChapter}
                                    setSelectedVerse={setSelectedVerse}
                                    direction="next"
                                    destination={result.data.docSet.document.nav.nextChapter}
                                />
                            </> : ''
                    }
                </div>
                {
                    'data' in result && 'docSet' in result.data && 'document' in result.data.docSet && result.data.docSet.document ?
                        [...result.data.docSet.document.mainSequence.blocks.entries()].map(
                            b => <Typography key={b[0]} variant="body1"
                                             className={classes[`usfm_${b[1].bs.payload.split('/')[1]}`]}>
                                {
                                    renderVersesItems(
                                        b[1].items,
                                        false,
                                        selectedVerse,
                                    )
                                }
                            </Typography>
                        ) : (
                            <Typography variant="body1">No Results</Typography>
                        )
                }
            </Container>
        </>
    );
});

export default BrowseVerseBlocks;