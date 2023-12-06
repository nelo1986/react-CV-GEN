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

export default function MainGrid() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    languages: [],

  })

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
    console.log(languageId)
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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid container xs={12} md={4}>
          <Grid xs={12} md={12} >
            <Accordion
              onAdd={addName}
              onAddEmail={addEmail}
              onAddPhone={addPhone}
              onAddAddress={addAddress}
              onAddLanguage={addLanguage}
              languages={formData.languages}
              onDeleteLanguage={deleteLanguage}
             
            />
          </Grid>
          <Grid xs={12} md={12}>
          </Grid>
        </Grid>
        <Grid xs={12} md={8}>

          <div className="wrapper">
            <div className="photo"><Img src="/images/ruben.jpeg" /></div>
            <div className="name">{formData.name}</div>
            <div className="nothing">Administrador de Sistemas</div>
            <div className="profile">Perfil</div>
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
            <div className="three"></div>
            <div className="four">Experiencia profesional</div>
            <div className="five">Five</div>
            <div className="six">Six</div>
          </div>

        </Grid>
      </Grid>
    </Box>
  );
}