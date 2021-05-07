import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import styles from '../../../global_styles';

const handleChange = (ev, setQuery) => {
    if (ev) {
        setQuery(ev.target.value);
    }
};

const RawQuery = withStyles(styles)((props) => {
    const { classes } = props;
    const [result, setResult] = React.useState({});
    const [queryTime, setQueryTime] = React.useState(-1);
    React.useEffect(() => {
        const doQuery = async () => {
            const now = Date.now();
            setQueryTime(-1);
            const res = await props.pk.gqlQuery(props.shared.raw.query);
            setResult(res);
            setQueryTime(Date.now() - now);
            // console.log(query, res);
        };
        doQuery();
    }, [props.shared.raw.query]);
    return (
        <div className={classes.tabContent}>
            {!result ? (
                <Typography variant="h2" className={classes.loading}>
                    No Result
                </Typography>
            ) : (
                <>
                    <TextareaAutosize
                        className={classes.pkQueryTextarea}
                        rowsMin="5"
                        rowsMax="25"
                        display="block"
                        onChange={async (event) => handleChange(event, props.shared.raw.setQuery)}
                        value={props.shared.raw.query}
                    />
                    <div>
                        {queryTime >= 0 ? (
                            <Typography variant="body2" display="inline">
                                {`Query completed in ${queryTime} msec`}
                            </Typography>
                        ) : (
                            ''
                        )}
                    </div>
                    <Typography variant="body2" className={classes.pre}>
                        {JSON.stringify(result, null, 4)}
                    </Typography>
                </>
            )}
        </div>
    );
});

export default RawQuery;
