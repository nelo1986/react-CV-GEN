import { Typography } from "@mui/material"
export default function Experience(props) {

  const datesStyle = {
    fontWeight: 'bold',
    fontFamily: 'lato',
    color: '#737373'
  }
  const companyStyle = {
    fontFamily: 'lato',
    color: '#737373',
  }
  const jobStyle = {
    fontWeight: 'bold',
    fontFamily: 'lato',
    color: '#737373'
  }
  const descStyle = {
    fontFamily: 'lato',
    color: '#737373'
  }
  return (
    <>
      <Typography sx={datesStyle} variant="subtitle1">{props.start} - {props.end}</Typography>
      <Typography sx={companyStyle} variant="subtitle1">{props.company}</Typography>
      <Typography paddingBottom={1} sx={jobStyle} variant={'h6'}>{props.position}</Typography>
      <Typography sx={descStyle} variant="body1">{props.description}</Typography>
    </>

  );
}



