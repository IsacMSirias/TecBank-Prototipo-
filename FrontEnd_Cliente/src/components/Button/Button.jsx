// React

// Components

// Styling
import "./Button.css"

function Button(props) {
    return <button {...props}>{props.text}</button>;
  }
  
  export default Button;