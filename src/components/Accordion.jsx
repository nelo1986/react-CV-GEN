import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import HoverRating from './HoverRating';
import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Lang from './Lang';
import ClearIcon from '@mui/icons-material/Clear';

export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  const [rating, setRating] = React.useState(2);
  const [language, setLanguage] = React.useState('');
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);

  };
  function handleOnChange(e) {
    // eslint-disable-next-line react/prop-types
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        // eslint-disable-next-line react/prop-types
        props.onAdd(value);
        break;
      case 'email':
        // eslint-disable-next-line react/prop-types
        props.onAddEmail(value);
        break;
      case 'phone':
        // eslint-disable-next-line react/prop-types
        props.onAddPhone(value);
        break;
      case 'address':
        // eslint-disable-next-line react/prop-types
        props.onAddAddress(value);
        break;
    }
  }

  function handleOnClick() {
    clicked ? setClicked(false) : setClicked(true);
  }
  function getRating(rating) {
    setRating(rating);
    //console.log(`Puntuación: ${rating}`)
  }
  function handleLanguageChange(event) {
    let lang = event.target.value;
    setLanguage(lang)
  }

  function handleSubmit(e) {
    e.preventDefault();
    const id = uuidv4();
    if (!language.trim()) {
      console.log('El campo Language es requerido');
      return;
    }
    // eslint-disable-next-line react/prop-types
    props.onAddLanguage({ id, language, rating })
    setAdded(true)
    setLanguage('')
    setRating(2)

  }
  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            General information
          </Typography>

        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }} variant="filled" >

            <TextField name="name" id="fullname" label="Full name" variant="outlined" onChange={handleOnChange} />
            <TextField name="email" id="email" label="Email" variant="outlined" onChange={handleOnChange} />
            <TextField name="phone" id="phone" label="Phone number" variant="outlined" onChange={handleOnChange} />
            <TextField name="address" id="adress" label="Adress" variant="outlined" onChange={handleOnChange} />
          </FormControl>

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>Educational experience</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField id="standard-basic" label="Standard" variant="standard" />

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            Practical experience
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            Languages
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {added &&
            // eslint-disable-next-line react/prop-types
            props.languages.map((lang =>
              <div key={uuidv4()} className='wrapperLang2'>
                <Lang lang={lang.language} />
                <ClearIcon onClick={() => props.onDeleteLanguage(lang.id)}/>
              </div>
            ))

          }

          {clicked ?
            <form onSubmit={handleSubmit}>
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
                  <Button sx={{ height: "4em" }} variant="contained" type="submit">Add</Button>
                </div>
                <div className='rating'>
                </div>
              </div>
            </form>
            :
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
              <Fab color="primary" aria-label="add" size='small' onClick={handleOnClick}>
                <AddIcon />
              </Fab>
            </div>
          }


        </AccordionDetails>
      </Accordion>

    </div>
  );
}