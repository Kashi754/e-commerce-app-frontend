import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-regular-svg-icons";

export function UserLink() {  
  return (
    <Link className="user-link" to="/user">
      <FontAwesomeIcon icon={faUser} />
    </Link>
  );   
}