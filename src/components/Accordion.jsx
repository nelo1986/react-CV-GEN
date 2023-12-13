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
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [moreLangClicked, setMoreLangClicked] = React.useState(false);
  const [editClicked, setEditClicked] = React.useState(false);

  const [rating, setRating] = React.useState(2);
  const [language, setLanguage] = React.useState('');

  const [formExpData, setExpFormData] = React.useState({
    id: '',
    company: '',
    position: '',
    start: '',
    end: '',
    description: ''
  })
  const [checked, setChecked] = React.useState(false);

  const handleToggle = (event) => {
    setChecked(event.target.checked);
  };
  React.useEffect(() => {
    console.log("formExpData ha cambiado:", formExpData);
  }, [formExpData]);



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
      case 'profile_description':
        // eslint-disable-next-line react/prop-types
        props.onAddProfile(value);
        break;
      case 'profession':
        // eslint-disable-next-line react/prop-types
        props.onAddProfession(value);
    }
  }

  function handleMoreLangOnClick() {
    moreLangClicked ? setMoreLangClicked(false) : setMoreLangClicked(true);
  }

  function handleMoreExpOnClick() {
    // eslint-disable-next-line react/prop-types
    props.moreExpClicked ? props.setMoreExpClicked(false) : props.setMoreExpClicked(true);
    setChecked(false)

  }
  function getRating(rating) {
    setRating(rating);
  }
  function handleLanguageChange(event) {
    let lang = event.target.value;
    setLanguage(lang)
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
    setLanguage('')
    setRating(2)
  }

  function handleExpOnChange(e, datePickerName) {
    let value, name;
    //date picket name solo viene del date picker
    if (datePickerName) {
      value = e.format('YYYY-MM-DD')
      name = datePickerName;
    } else {
      name = e.target.name;
      value = e.target.value;
    }

    setExpFormData((prevExpValues => ({
      ...prevExpValues,
      [name]: value
    })))

  }

  function handleExpSubmit(e) {
    e.preventDefault();
    let { id, company, position, start, end, description } = formExpData;
    if (checked) end = 'currently';
    if (!company.trim() || !position.trim() || !start || !end || !description.trim()) {
      console.log('El campo es requerido');
      return;
    }
    //const id =uuidv4();
    // eslint-disable-next-line react/prop-types
    props.onAddExperience({ id, company, position, start, end, description });
    e ?? setExpFormData({
      id: '',
      company: '',
      position: '',
      start: '',
      end: '',
      description: ''
    });
    // eslint-disable-next-line react/prop-types
    props.setExpAdded(true)
    // eslint-disable-next-line react/prop-types
    props.setMoreExpClicked(false)

  }

  function addDataToFieldsToEdit(id) {
    // eslint-disable-next-line react/prop-types
    const newData = props.findExpById(id);
    newData.end === 'currently' ? setChecked(true) : setChecked(false)
    setExpFormData(prevExpValues => ({
      ...prevExpValues,
      id: newData.id,
      company: newData.company,
      position: newData.position,
      start: dayjs(newData.start),
      end: dayjs(newData.end),
      description: newData.description
    }))
    setEditClicked(true)
  }

  function handleExpEdit(e) {
    //objeto modificado
    e.preventDefault();
    let { id, company, position, start, end, description } = formExpData;
    if (typeof (start) === 'object') {
      start = start.format('YYYY-MM-DD');
    }
    if (typeof (end) === 'object') {
      if (checked) end = "currently"
      else end = end.format('YYYY-MM-DD');
    }
    console.log(end)
    // eslint-disable-next-line react/prop-types
    props.editExperience({ id, company, position, start, end, description })
    setExpFormData({
      id: '',
      company: '',
      position: '',
      start: '',
      end: '',
      description: ''
    });

    setEditClicked(false)
    // eslint-disable-next-line react/prop-types
    props.setMoreExpClicked(false)

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

            <TextField value={props.generalInfo.name} name="name" id="fullname" label="Full name" variant="outlined" onChange={handleOnChange} />
            <TextField value={props.generalInfo.email} name="email" id="email" label="Email" variant="outlined" onChange={handleOnChange} />
            <TextField value={props.generalInfo.phone} name="phone" id="phone" label="Phone number" variant="outlined" onChange={handleOnChange} />
            <TextField value={props.generalInfo.address} name="address" id="adress" label="Adress" variant="outlined" onChange={handleOnChange} />
            <TextField value={props.generalInfo.profession} name="profession" id="profession" label="profession" variant="outlined" onChange={handleOnChange} />
            <TextField value={props.generalInfo.profile_description} name="profile_description" id="profile_description" label="profile" onChange={handleOnChange} variant='outlined' multiline rows={10} />

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
          {props.expAdded &&
            // eslint-disable-next-line react/prop-types
            props.jobexperiences.map((experience =>
              <div key={uuidv4()} className='wrapperLang2'>
                <p>{experience.company}</p>
                <div>
                  <ClearIcon onClick={() => props.onDeleteExperience(experience.id)} />
                  <EditIcon onClick={() => addDataToFieldsToEdit(experience.id)} />
                </div>
              </div>
            ))
          }
          {props.moreExpClicked ?
            <form onSubmit={!editClicked ? handleExpSubmit : handleExpEdit}>
              <div>
                <TextField value={formExpData.company} name="company" onChange={handleExpOnChange} label="company" variant='outlined' required />
                <TextField value={formExpData.position} name="position" onChange={handleExpOnChange} label="position" variant='outlined' required />
                <div className='datePicker'>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {editClicked ?
                      <>
                        <DatePicker label="start" value={formExpData.start} defaultValue={formExpData.start} onChange={(fecha) => handleExpOnChange(fecha, 'start')} />
                        {checked ?
                          <DatePicker disabled label="end" value={formExpData.end} defaultValue={formExpData.end} onChange={(fecha) => handleExpOnChange(fecha, 'end')} />
                          :
                          <DatePicker label="end" value={formExpData.end} defaultValue={formExpData.end} onChange={(fecha) => handleExpOnChange(fecha, 'end')} />
                        }
                        <FormControlLabel
                          value="Currently"
                          control={<Checkbox checked={checked} onChange={handleToggle} inputProps={{ 'aria-label': 'controlled' }} />}
                          label="Currently"
                          labelPlacement="end"
                        />
                      </>
                      :
                      <>
                        <DatePicker label="start" defaultValue={formExpData.start} onChange={(fecha) => handleExpOnChange(fecha, 'start')} />
                        {checked ?
                          <DatePicker disabled label="end" defaultValue={formExpData.end} onChange={(fecha) => handleExpOnChange(fecha, 'end')} />
                          :
                          <DatePicker label="end" defaultValue={formExpData.end} onChange={(fecha) => handleExpOnChange(fecha, 'end')} />
                        }
                        <FormControlLabel
                          value="Currently"
                          control={<Checkbox checked={checked} onChange={handleToggle} inputProps={{ 'aria-label': 'controlled' }} />}
                          label="Currently"
                          labelPlacement="end"
                        />
                      </>
                    }
                  </LocalizationProvider>
                </div>
                <TextField value={formExpData.description} name="description" label="description" onChange={handleExpOnChange} variant='outlined' multiline rows={4} required />
                {!editClicked ?
                  <Button variant="text" type='submit'>Add experience</Button>

                  :
                  <Button variant="text" type='submit'>Edit experience</Button>
                }

              </div>
            </form>
            :
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
              <Fab color="primary" aria-label="add" size='small' onClick={handleMoreExpOnClick}>
                <AddIcon />
              </Fab>
            </div>
          }
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        {//LANG}
        }
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
          {props.langAdded &&
            // eslint-disable-next-line react/prop-types
            props.languages.map((lang =>
              <div key={uuidv4()} className='wrapperLang2'>
                <Lang lang={lang.language} />
                <ClearIcon onClick={() => props.onDeleteLanguage(lang.id)} />
              </div>
            ))

          }
          {moreLangClicked ?
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
        </AccordionDetails>
      </Accordion>

    </div>
  );
}