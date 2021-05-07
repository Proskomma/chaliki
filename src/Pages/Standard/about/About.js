import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import styles from '../../../global_styles';
const packageJson = require('../../../../package.json');

const About = withStyles(styles)((props) => {
    const {classes} = props;
    const [result, setResult] = React.useState({});
    React.useEffect(() => {
        const aboutQuery =
            '{' +
            '  processor packageVersion' +
            '}\n';
        const doQuery = async () => {
            return await props.pk.gqlQuery(aboutQuery);
        };
        doQuery().then((res) => {
            setResult(res);
        });
    }, [props.pk]);
    if (result.data) {
        const name = packageJson.name.slice(0, 1).toUpperCase() + packageJson.name.slice(1);
        return (
            <div className={classes.tabContent}>
                <>
                    <Typography variant="h5" className={classes.docSetsSection}>
                        {`${name} v${packageJson.version}`}
                    </Typography>
                    <Typography variant="body1" className={classes.docSetsSection}>
                        {packageJson.description}
                    </Typography>
                    <Typography variant="body2" className={classes.docSetsSection}>
                        {packageJson.homepage}
                    </Typography>
                    <Typography variant="body2" className={classes.docSetsSection}>
                        {`Using ${result.data.processor} v${result.data.packageVersion}`}
                    </Typography>
                    <Typography variant="body2" className={classes.docSetsSection}>
                        {`© ${packageJson.author}, ${packageJson.license} license`}
                    </Typography>
                </>
            </div>
        );
    } else {
        return(<div>Loading</div>);
    }
});

export default About;
