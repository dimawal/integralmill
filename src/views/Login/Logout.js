
import { logout } from "../../services/auth";

function Sair(props){
 
    if(window.confirm('Deseja sair do sistema?')){
      logout();
      props.history.push('/')
    }
}

export default Sair