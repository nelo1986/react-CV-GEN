import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Accordion from './Accordion';
import Img from './Img';
import Contact from './Contact';
import { v4 as uuidv4 } from 'uuid';
import Experience from './Experience';
import demoData from './data/demoData.js'
import { Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';

export default function MainGrid() {

  const [demo, setDemo] = React.useState(false);
  const [formData, setFormData] = React.useState(demo ? demoData : {
    name: '',
    email: '',
    phone: '',
    address: '',
    profession: '',
    profile_description: '',
    languages: [],
    job_experience: [],
    skills: []
  })
  const [added, setAdded] = React.useState(demoData ? true : false);
  const [expAdded, setExpAdded] = React.useState(demoData ? true : false);


  const [moreExpClicked, setMoreExpClicked] = React.useState(false);

  const [moreSkillClicked, setMoreSkillClicked] = React.useState(false);
  const [skillAdded, setSkillAdded] = React.useState(demoData ? true : false);



  const textStyle = {
    color: '#737373',
    fontFamily: 'lato',
    variant: 'body1'
  }

  const LefPaneltextStyle = {
    color: 'white',
    fontFamily: 'lato',
    variant: 'body1'
  }
  const leftPanelTitleStyle = {
    color: 'white',
    fontFamily: 'merriweather',
    fontWeight: 'bold',
    letterSpacing: '.1rem'
  }
  const hrStyle = {
    marginLeft: 'auto',
    borderBottom: '1px solid white',
    width: '100%'
  }

  function clearData() {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      profession: '',
      profile_description: '',
      languages: [],
      job_experience: []
    })
  }
  function loadDemo() {
    setDemo(true)
    setFormData(demoData)
  }
  function addName(name) {
    setFormData(prevFormData => ({ ...prevFormData, name }));
  }
  function addProfession(profession) {
    setFormData(prevFormData => ({ ...prevFormData, profession }));
  }
  function addProfile(profile_description) {
    setFormData(prevFormData => ({ ...prevFormData, profile_description }));
  }
  function addEmail(email) {
    setFormData(prevFormData => ({ ...prevFormData, email }));
  }
  function addAddress(address) {
    setFormData(prevFormData => ({ ...prevFormData, address }));
  }
  function addPhone(phone) {
    setFormData(prevFormData => ({ ...prevFormData, phone }));
  }
  function deleteLanguage(languageId) {
    setFormData(prevFormData => ({
      ...prevFormData,
      languages: prevFormData.languages.filter(lang => lang.id !== languageId)
    }));
  }

  function addLanguage({ id, language, rating }) {
    setFormData(prevFormData => ({
      ...prevFormData,
      languages: [
        ...prevFormData.languages,
        { id, language, rating }
      ]
    }));
  }

  function addSkill({ id, skill, hability }) {
    setFormData(prevFormData => ({
      ...prevFormData,
      skills: [
        ...prevFormData.skills,
        { id, skill, hability }
      ]
    }));
  }

  function deleteSkill(skillId) {
    setFormData(prevFormData => ({
      ...prevFormData,
      skills: prevFormData.skills.filter(skill => skill.id !== skillId)
    }));
  }

  function addExperience({ id, company, position, start, end, description }) {
    setFormData(prevFormData => ({
      ...prevFormData,
      job_experience: [
        ...prevFormData.job_experience,
        { id, company, position, start, end, description }
      ]
    }))
  }

  function deleteExperience(experienceId) {
    setFormData(prevFormData => ({
      ...prevFormData,
      job_experience: prevFormData.job_experience.filter(exp => exp.id !== experienceId)
    }));
  }

  function findExpById(experienceId) {
    setMoreExpClicked(true)
    const obj = formData.job_experience.find((exp) => exp.id == experienceId);
    return obj
  }

  function editExperience({ id, company, position, start, end, description }) {
    setFormData(prevFormData => {
      // Crear una copia del array job_experience
      const updatedExperiences = prevFormData.job_experience.map(exp => {
        if (exp.id === id) {
          // Actualizar solo el objeto que coincide con el id
          return { ...exp, company, position, start, end, description };
        }
        return exp;
      });

      // Establecer el nuevo array como parte del estado
      return { ...prevFormData, job_experience: updatedExperiences };
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }} padding={2}>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid xs={12} sm={12} md={4} xl={3} sx={{ backgroundColor: '#F6F6F6' }}>
          <Paper elevation={6} sx={{ textAlign: 'center', paddingTop: 2, paddingBottom: 2, fontFamily: 'merriweather' }}>Resume builder</Paper>

          <Grid container spacing={2} justifyContent='center' padding={2}>

            <Grid item>
              <Button sx={{ fontFamily: 'lato' }} variant="contained" onClick={loadDemo}>Load demo data</Button>
            </Grid>
            <Grid item>
              <Button sx={{ fontFamily: 'lato' }} padding={1} variant="contained" color='error' onClick={clearData}>Clear all data</Button>
            </Grid>
          </Grid>
          <Accordion
            generalInfo={formData}
            onAdd={addName}
            onAddProfile={addProfile}
            onAddProfession={addProfession}
            onAddEmail={addEmail}
            onAddPhone={addPhone}
            onAddAddress={addAddress}
            onAddLanguage={addLanguage}
            languages={formData.languages}
            onDeleteLanguage={deleteLanguage}
            onAddExperience={addExperience}
            jobexperiences={formData.job_experience}
            onDeleteExperience={deleteExperience}
            findExpById={findExpById}
            setLangAdded={setAdded}
            langAdded={added}

            expAdded={expAdded}
            setExpAdded={setExpAdded}
            moreExpClicked={moreExpClicked}
            setMoreExpClicked={setMoreExpClicked}

            editExperience={editExperience}

            moreSkillClicked={moreSkillClicked}
            setMoreSkillClicked={setMoreSkillClicked}
            skillAdded={skillAdded}
            setSkillAdded={setSkillAdded}
            addSkill={addSkill}
            deleteSkill={deleteSkill}
          />
        </Grid>
        <Grid xs={12} sm={10} md={3} xl={3} sx={{ backgroundColor: '#323b4c', color: 'white' }}>
          <Box padding={2}>
            <Box padding={1} width={'100%'}>
              <Img src={demo ? formData.profile_image : ""} />
            </Box>
            <Box paddingY={2}>
              <Typography variant='h5' sx={leftPanelTitleStyle}>Contact</Typography>
              <hr style={hrStyle}></hr>
              <Contact
                title={formData.title}
                phone={formData.phone}
                email={formData.email}
                address={formData.address}
              />
            </Box>
            <Box paddingY={2}>
              <Typography sx={leftPanelTitleStyle} variant='h5'>Languages</Typography>
              <hr style={hrStyle}></hr>
              {formData.languages.map((lang) =>
                <Box key={uuidv4()} paddingY={1} paddingBottom={1}>
                  <Typography sx={LefPaneltextStyle}> {lang.language}</Typography>
                  <Rating precision={0.5} name="read-only" value={lang.rating} emptyIcon={<StarIcon style={{ opacity: 0.23, color: 'white' }} fontSize="inherit" />}
                    readOnly />
                </Box>

              )}
            </Box>
            <Box paddingY={2}>

              <Typography sx={leftPanelTitleStyle} variant='h5'>Skills</Typography>
              <hr style={hrStyle}></hr>
              {formData.skills.map((skill) =>
                <Box key={uuidv4()} paddingY={1}>
                  <Typography sx={LefPaneltextStyle} component="legend">{skill.skill}</Typography>
                  <Slider
                    disabled={false}
                    marks
                    max={5}
                    min={0}
                    defaultValue={2}
                    aria-label="Default" valueLabelDisplay="auto"
                    value={skill.hability}

                  />
                </Box>

              )}
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={5} xl={6} sx={{ color: '#737373' }}>
          <Box paddingX={3}>
            <Typography letterSpacing={'.2rem'} color={'#323b4c'} variant='h3' fontFamily={'merriweather'}>{formData.name}</Typography>
            <Typography letterSpacing={'.2rem'} color={'#323b4c'} variant='h6' fontFamily={'merriweather'}>{formData.profession}</Typography>
            <Typography paddingY={2} style={textStyle}> {formData.profile_description}</Typography>
          </Box>
          <Box paddingX={3} paddingBottom={1} paddingTop={1}>
            <Typography sx={{ fontWeight: 'bold' }} letterSpacing={'.2rem'} color={'#323b4c'} variant='h5' fontFamily={'merriweather'}>Experience</Typography>
            <hr color='#323b4c'></hr>
          </Box>

          {formData.job_experience.map((experience) =>
            <Timeline
              sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
              key={uuidv4()}
            >
              <TimelineItem>
                <TimelineSeparator >
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Experience
                    company={experience.company}
                    position={experience.position}
                    start={experience.start}
                    end={experience.end}
                    description={experience.description}
                  />
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}