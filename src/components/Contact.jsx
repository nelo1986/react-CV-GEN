import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Grid } from '@mui/material';

export default function Contact(props) {
  return (
    <>
      <Box paddingY={1} display="flex" alignItems="center">
        <AlternateEmailIcon style={{ marginRight: '8px' }} />
        {props.email}
      </Box>
      <Box paddingY={1} display="flex" alignItems="center">
        <ContactPhoneIcon style={{ marginRight: '8px' }} />
        {props.phone}
      </Box>
      <Box paddingY={1} display="flex" alignItems="center">
        <HomeIcon style={{ marginRight: '8px' }} />
        {props.address}
      </Box>
    </>
  );
}
