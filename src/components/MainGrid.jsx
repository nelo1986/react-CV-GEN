import * as React from 'react';
import CssBaseline from "@mui/material/CssBaseline";
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
export default function MainGrid() {

  const [demo, setDemo] = React.useState(false);


  const [formData, setFormData] = React.useState(demo ? demoData : {
    name: '',
    email: '',
    phone: '',
    address: '',
    languages: [],
    job_experience: []
  })
  const [added, setAdded] = React.useState(demoData ? true : false);
  const [expAdded, setExpAdded] = React.useState(demoData ? true : false);
  const [moreExpClicked, setMoreExpClicked] = React.useState(false);


  function loadDemo() {
    setDemo(true)
    setFormData(demoData)
    console.log('clicl')
  }
  function addName(name) {
    setFormData(prevFormData => ({ ...prevFormData, name }));
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
    console.log(start, end)
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
    console.log(formData)
  }
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid container xs={12} md={4}>
          <Grid xs={12} md={12} >
            <Button onClick={loadDemo}>Load demo</Button>
            <Accordion
              onAdd={addName}
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

            />
          </Grid>
          <Grid xs={12} md={12}>
          </Grid>
        </Grid>
        <Grid xs={12} md={8}>

          <div className="wrapper">
            <div className="photo"><Img src={demo && formData.profile_image} /></div>
            <div className="name">{formData.name}</div>
            <div className="nothing">{demo && formData.profession}</div>
            <div className="profile">
            {demo ? formData.profile_description : ""}
              <div className="contact">
                <Contact
                  title={formData.title}
                  phone={formData.phone}
                  email={formData.email}
                  address={formData.address}
                />
              </div>
            
            <div className="lang">Languages
              {formData.languages.map((lang) =>
                <div key={uuidv4()}>
                  <Typography component="legend">{lang.language}</Typography>
                  <Rating precision={0.5} name="read-only" value={lang.rating} readOnly />
                </div>

              )}

            </div>
            </div>
            <div className="four">Experiencia profesional
              {formData.job_experience.map((experience) =>
                <div key={uuidv4()}>
                  <Experience
                    company={experience.company}
                    position={experience.position}
                    start={experience.start}
                    end={experience.end}
                    description={experience.description}
                  />
                </div>

              )}

            </div>
            <div className="five">Five</div>
            <div className="six">Experience
            </div>
          </div>

        </Grid>
      </Grid>
    </Box>
  );
}