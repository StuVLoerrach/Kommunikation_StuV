import React, { useState, Children, cloneElement } from 'react';
import { Button, Grid } from '@mui/material';

const ChapterCarousel = ({ children }) => {
  const chapters = Children.toArray(children);
  const [currentChapter, setCurrentChapter] = useState(0);

  const nextPage = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const prevPage = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  return (
    <div>
      {cloneElement(chapters[currentChapter], { key: currentChapter })}
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={prevPage} disabled={currentChapter === 0}>
            Previous Chapter
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={nextPage} disabled={currentChapter === chapters.length - 1}>
            Next Chapter
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChapterCarousel;
