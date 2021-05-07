import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import styles from '../../../global_styles';
import DocSet from './DocSet';
// import InspectQuery from "../components/InspectQuery";

const Data = withStyles(styles)((props) => {
    const {classes} = props;
    const [result, setResult] = React.useState({});
    React.useEffect(() => {
        const homeQuery =
            '{' +
            '  nDocSets nDocuments\n' +
            '  docSets {\n' +
            '    id hasMapping\n' +
            '    documents { id }\n' +
            '  }\n' +
            '}\n';
        const doQuery = async () => {
            return await props.pk.gqlQuery(homeQuery);
        };
        doQuery().then((res) => {
            setResult(res);
        });
    }, [props.pk]);
    return (
        <div className={classes.tabContent}>
            {!result.data ? (
                <Typography variant="h2" className={classes.loading}>
                    Loading...
                </Typography>
            ) : (
                <>
                    <div className={classes.docSetsSection}>
                        <Typography variant="body1">
                            {`${
                                result.data ? result.data.nDocSets : '0'
                            } docSet(s) containing ${
                                result.data ? result.data.nDocuments : '0'
                            } document(s)`}
                        </Typography>
                        <List>
                            {result.data.docSets.map((ds, index) => (
                                <ListItem key={index} button dense>
                                    <DocSet key={ds.id} state={props.state} docSet={ds}/>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </>
            )}
        </div>
    );
});

export default Data;