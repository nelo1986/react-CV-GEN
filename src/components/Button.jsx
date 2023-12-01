
function Button (props) {
  return(
  <button onClick={props.handleOnClick} type={props.type}>{props.text}</button>
  )

}

export default Button;