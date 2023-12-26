import * as React from 'react';
import HoverRating from './HoverRating';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import { Button, Box, Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export default function Language(props) {
  const [rating, setRating] = React.useState(2);
  const [language, setLanguage] = React.useState('');

  function getRating(rating) {
    setRating(rating);
  }

  function handleLanguageChange(event) {
    let lang = event.target.value;
    setLanguage(lang)
  }

  function handleMoreLangOnClick() {
    props.moreLangClicked ? props.setMoreLangClicked(false) : props.setMoreLangClicked(true);
  }

  function handleLangSubmit(e) {
    e.preventDefault();
    const id = uuidv4();
    if (!language.trim()) {
      console.log('El campo Language es requerido');
      return;
    }
    // eslint-disable-next-line react/prop-types
    props.onAddLanguage({ id, language, rating })
    // eslint-disable-next-line react/prop-types
    props.setLangAdded(true)
    props.setMoreLangClicked(false)
    setLanguage('')
    setRating(2)
  }

  return (
    <>
      {props.langAdded &&
        // eslint-disable-next-line react/prop-types
        props.languages.map((lang =>
          <Box key={lang.id}>
            <Grid container alignItems='center' spacing={1}>
              <Grid item xs>
                <Typography fontFamily={'lato'}>{lang.language}</Typography>
              </Grid>
              <Grid item style={{ marginLeft: 'auto', paddingRight: 20, paddingBottom: 8 }}>
                <Tooltip title="Delete">
                  <IconButton>
                    <ClearIcon onClick={() => props.onDeleteLanguage(lang.id)} style={{ cursor: 'pointer' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
        ))

      }
      {props.moreLangClicked ?
        <form onSubmit={handleLangSubmit}>
          <div className='wrapperLang'>
            <div className='languages'>
              <TextField onChange={handleLanguageChange}
                value={language}
                name="language"
                id="filled-basic"
                label="Language"
                variant="outlined"
                required />
              <HoverRating name="rating" getrating={getRating} rating={rating} />
            </div>
            <div className='addButton'>
              <Button sx={{ height: "4em" }} variant="text" type="submit">Add</Button>
            </div>
            <div className='rating'>
            </div>
          </div>
        </form>
        :
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
          <Fab color="primary" aria-label="add" size='small' onClick={handleMoreLangOnClick}>
            <AddIcon />
          </Fab>
        </div>
      }

    </>
  )
}