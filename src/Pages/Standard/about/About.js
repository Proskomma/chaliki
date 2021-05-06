import Container from "@material-ui/core/Container";
import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import styles from '../../../global_styles';

const About = withStyles(styles)((props) => {
    const {classes} = props;
    const [result, setResult] = React.useState({});
    const homeQuery =
        '{' +
        '  id processor packageVersion' +
        '}\n';
    React.useEffect(() => {
        const doQuery = async () => {
            return await props.pk.gqlQuery(homeQuery);
        };
        doQuery().then((res) => {
            setResult(res);
        });
    }, [props.mutationCount]);
    return (
        <div className={classes.tabContent}>
            {!result.data ? (
                <Typography variant="h2" className={classes.loading}>
                    Loading...
                </Typography>
            ) : (
                <>
                    <Typography variant="body1" className={classes.docSetsSection}>
                        {`Using ${result.data.processor} Version ${result.data.packageVersion} (ID=${result.data.id}).`}
                    </Typography>
                </>
            )}
        </div>
    );
});

export default About;
