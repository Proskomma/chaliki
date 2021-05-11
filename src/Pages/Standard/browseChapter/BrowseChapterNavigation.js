import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import styles from '../../../global_styles';

const BrowseChapterNavigation = withStyles(styles) (
  (props) => {
  return (
    <IconButton
      aria-label={props.direction}
      disabled={!props.destination}
      onClick={() => {
        props.setSelectedChapter(props.destination);
      }}
    >
      {props.direction === 'previous' ? <ArrowBackIcon/> : <ArrowForwardIcon/>}
    </IconButton>
  );
});

export default BrowseChapterNavigation;
