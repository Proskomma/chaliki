import React from "react";
import { useQuery } from "proskomma-react-hooks";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import styles from "../../../global_styles";
import ChapterNavigation from "../../../sharedComponents/ChapterNavigation";
import Container from "@material-ui/core/Container";
import DocSetPicker from "../../../sharedComponents/DocSetPicker";
import BookPicker from "../../../sharedComponents/BookPicker";
import InspectQuery from "../../../sharedComponents/InspectQuery";
import { renderVersesItems } from "../../../lib/render_items";

const BrowseChapter = withStyles(styles)((props) => {
  const { classes } = props;
  const [result, setResult] = React.useState({});
  const [query, setQuery] = React.useState();

  let chapterQueryTemplate = `{
        documents(withBook:"%bookSelected%") {
       cv (chapter:"%chapter%") { text }
          nav: cvNavigation(chapter:"%chapter%" verse: "1") {
            previousChapter 
           nextChapter}
          }
     }`;

  // Use Query
  const proskomma = props.proskomma;
  const stateId = props.stateId;

  const { queryStateId, query: queryRun, data } = useQuery({
    proskomma,
    stateId,
    query,
  });

  React.useEffect(() => {
    const doQuery = async () => {
      if (props.browseChapter.selectedBook) {
        const chapterQuery = chapterQueryTemplate
          .replace(/%bookSelected%/g, props.browseChapter.selectedBook)
          .replace(/%chapter%/g, props.browseChapter.selectedChapter);
        const res = await data;
        setQuery(chapterQuery);
        console.log("queryRunBrowse" + chapterQuery);
        setResult(res);
      }
    };
    doQuery();
  }, [
    props.browseChapter.selectedBook,
    props.browseChapter.selectedBook,
    props.browseChapter.selectedChapter,
  ]);

  console.log(props.browseChapter.selectedChapter);

  return (
    <>
      <div className={classes.toolbarMargin} />
      <Container className={classes.page}>
        <div>
          <DocSetPicker
            selectedDocSet={props.browseChapter.selectedDocSet}
            setSelectedDocSet={props.browseChapter.setSelectedDocSet}
            app={props.app}
          />
          {props.app.docSets && props.browseChapter.selectedDocSet ? (
            <BookPicker
              selectedDocSet={props.browseChapter.selectedDocSet}
              selectedBook={props.browseChapter.selectedBook}
              setSelectedBook={props.browseChapter.setSelectedBook}
              setSelectedChapter={props.browseChapter.setSelectedChapter}
              setSelectedVerse={props.browseChapter.setSelectedVerse}
              app={props.app}
            />
          ) : (
            <Typography
              variant="h5"
              display="inline"
              className={classes.requireInput}
            >
              Please Select a DocSet
            </Typography>
          )}
          <InspectQuery app={props.app} raw={props.raw} query={query} />
        </div>
        <div>
          {result ? (
            result.documents ? (
              <ChapterNavigation
                setSelectedChapter={props.browseChapter.setSelectedChapter}
                direction="previous"
                destination={result.documents[0].nav.previousChapter}
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}

          <Typography
            variant="body1"
            display="inline"
            className={classes.browseNavigationText}
          >
            {props.browseChapter.selectedChapter || "-"}
          </Typography>

          {result ? (
            result.documents ? (
              <ChapterNavigation
                setSelectedChapter={props.browseChapter.setSelectedChapter}
                direction="next"
                destination={result.documents[0].nav.nextChapter}
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {result ? (
            result.documents ? (
              <>
                <Typography variant="body1">
                  {" "}
                  {result.documents[0].cv[0]
                    ? JSON.stringify(result.documents[0].cv[0].text)
                    : ""}{" "}
                </Typography>
                <Typography variant="body1">
                  {" "}
                  {"next " +
                    JSON.stringify(result.documents[0].nav.nextChapter)}{" "}
                </Typography>
                <Typography variant="body1">
                  {" "}
                  {"previous " + JSON.stringify(result.documents[0].nav)}{" "}
                </Typography>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        {/* {
                    'data' in result && 'docSet' in result.data && 'document' in result.data.docSet && result.data.docSet.document ?
                        [...result.data.docSet.document.mainSequence.blocks.entries()].map(
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
                            <Typography variant="body1"></Typography>
                        )
                } */}
      </Container>
    </>
  );
});

export default BrowseChapter;
