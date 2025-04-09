// React

// Components
import { Link } from "react-router-dom";

// Styling
import "./AppLink.css"

function AppLink(props) {
  return (<Link {...props}>{props.text}</Link>);
}

export default AppLink