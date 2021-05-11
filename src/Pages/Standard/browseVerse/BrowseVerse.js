import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import styles from '../../../global_styles';
import BrowseVerseNavigation from './BrowseVerseNavigation';
import Container from "@material-ui/core/Container";
import DocSetPicker from "../../../sharedComponents/DocSetPicker";
import BookPicker from "../../../sharedComponents/BookPicker";
import InspectQuery from "../../../sharedComponents/InspectQuery";

const BrowseVerse = withStyles(styles)((props) => {
    const {classes} = props;
    const [selectedDocSet, setSelectedDocSet] = React.useState(null);
    const [selectedBook, setSelectedBook] = React.useState(null);
    const [selectedChapter, setSelectedChapter] = React.useState(null);
    const [selectedVerse, setSelectedVerse] = React.useState(null);
    const [result, setResult] = React.useState({});
    const [query, setQuery] = React.useState('');
    const verseQueryTemplate =
        '{\n' +
        '  docSet(id:"%docSetId%") {\n' +
        '    document(bookCode: "%bookCode%") {\n' +
        '      title: header(id: "toc2")\n' +
        '      cv (chapter:"%chapter%" verses:["%verse%"]) { text }\n' +
        '      nav: cvNavigation(chapter:"%chapter%" verse: "%verse%") {\n' +
        '        previousVerse { chapter verse }\n' +
        '        nextVerse { chapter verse }\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '}';
    React.useEffect(() => {
        const doQuery = async () => {
            if (selectedDocSet && selectedBook) {
                const browseQuery = verseQueryTemplate
                    .replace(/%docSetId%/g, selectedDocSet)
                    .replace(/%bookCode%/g, selectedBook)
                    .replace(/%chapter%/g, selectedChapter)
                    .replace(/%verse%/g, selectedVerse);
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
            console.log('Selected DocSet', selectedDocSet);
            setSelectedBook(
                props.app.docSets
                    .filter(ds => ds.id === selectedDocSet)[0]
                    .documents[0]
                    .bookCode
            );
            console.log("after")
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
                        'data' in result && 'docSet' in result.data && 'document' in result.data.docSet ?
                            <BrowseVerseNavigation
                                setSelectedChapter={setSelectedChapter}
                                setSelectedVerse={setSelectedVerse}
                                direction="previous"
                                destination={result.data.docSet.document.nav.previousVerse}
                            /> : ''
                    }
                    <Typography variant="body1" display="inline" className={classes.browseNavigationText}>
                        {`${selectedChapter || '-'}:${selectedVerse || '-'}`}
                    </Typography>
                    {
                        'data' in result && 'docSet' in result.data && 'document' in result.data.docSet ?
                            <BrowseVerseNavigation
                                setSelectedChapter={setSelectedChapter}
                                setSelectedVerse={setSelectedVerse}
                                direction="next"
                                destination={result.data.docSet.document.nav.nextVerse}
                            /> : ''
                    }
                </div>
                {
                    'data' in result && 'docSet' in result.data && 'document' in result.data.docSet && 'cv' in result.data.docSet.document ? (
                        <Typography variant="body1">
                            {result.data.docSet.document.cv[0].text}
                        </Typography>
                    ) : (
                        <Typography variant="body1">No Results</Typography>
                    )
                }
            </Container>
        </>
    );
});

export default BrowseVerse;
