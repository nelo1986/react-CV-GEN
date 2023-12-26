import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from './Accordion';
import demoData from './data/demoData1.js'
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Cv from './Cv.jsx';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas"
import Container from '@mui/material/Container';

export default function MainGrid() {


  const [demo, setDemo] = React.useState(false);
  const [formData, setFormData] = React.useState(demo ? demoData : {
    profile_image: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    profession: '',
    profile_description: '',
    languages: [],
    job_experience: [],
    skills: [],
    education: []
  })
  const [langAdded, setLangAdded] = React.useState(demoData ? true : false);
  const [expAdded, setExpAdded] = React.useState(demoData ? true : false);
  const [moreExpClicked, setMoreExpClicked] = React.useState(false);
  const [moreLangClicked, setMoreLangClicked] = React.useState(false);
  const [moreSkillClicked, setMoreSkillClicked] = React.useState(false);
  const [skillAdded, setSkillAdded] = React.useState(demoData ? true : false);
  const [moreEdClicked, setMoreEdClicked] = React.useState(false);
  const [educationAdded, setEducationAdded] = React.useState(demoData ? true : false);

  function clearData() {
    setFormData({
      profile_image: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      profession: '',
      profile_description: '',
      languages: [],
      job_experience: [],
      skills: [],
      education: []
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

  function addEducation({ id, start_year, end_year, degree_and_field, center }) {
    setFormData(prevFormData => ({
      ...prevFormData,
      education: [
        ...prevFormData.education,
        { id, start_year, end_year, degree_and_field, center }
      ]
    }));
    console.log(formData)
  }

  function deleteEducation(educationId) {
    setFormData(prevFormData => ({
      ...prevFormData,
      education: prevFormData.education.filter(ed => ed.id !== educationId)
    }));
  }

  function addPicture(src) {
    setFormData(prevFormData => ({
      ...prevFormData,
      profile_image: src
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
      const updatedExperiences = prevFormData.job_experience.map(exp => {
        if (exp.id === id) {
          return { ...exp, company, position, start, end, description };
        }
        return exp;
      });
      return { ...prevFormData, job_experience: updatedExperiences };
    });
  }



  function downloadPdfDocument() {
    const input = document.getElementById('lolo')
    html2canvas(input, {
      width: input.scrollWidth,
      height: input.scrollHeight,
      scale: 1 // Ajusta esto según sea necesario
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('download.pdf');
    });
  }
  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1 }} padding={1} alignContent={'center'}>
        <CssBaseline />
        <Grid container spacing={1}>
          <Grid xs={12} sm={12} md={4} xl={3}>
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
              setLangAdded={setLangAdded}
              langAdded={langAdded}
              expAdded={expAdded}
              setExpAdded={setExpAdded}
              moreExpClicked={moreExpClicked}
              setMoreExpClicked={setMoreExpClicked}
              moreLangClicked={moreLangClicked}
              setMoreLangClicked={setMoreLangClicked}
              editExperience={editExperience}
              moreSkillClicked={moreSkillClicked}
              setMoreSkillClicked={setMoreSkillClicked}
              skillAdded={skillAdded}
              setSkillAdded={setSkillAdded}
              addSkill={addSkill}
              deleteSkill={deleteSkill}
              addPicture={addPicture}

              educationAdded={educationAdded}
              setEducationAdded={setEducationAdded}
              moreEdClicked={moreEdClicked}
              setMoreEdClicked={setMoreEdClicked}
              deleteEducation={deleteEducation}
              addEducation={addEducation}


            />
          </Grid>

          <Cv formData={formData} />
          {/* <Button onClick={downloadPdfDocument}>download</Button> */}

        </Grid>


      </Box>
    </Container>
  );
}