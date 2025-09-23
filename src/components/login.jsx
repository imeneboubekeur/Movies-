import { Link } from "react-router-dom"

export function Form(){
    return(
        
        <div className="login">
            <p className="identifyy">S'identifier</p>
      <form>
        
<div className="inputs">
        <input
          type="email"
          placeholder="Email"
         
        
          required
        />

        <input
          type="password"
          placeholder="Password"
         
          required
        />
        </div>
<div className="checkboxContainer">
<input type="checkbox" id="remember" name="remember" value="remember"/>
<label htmlFor="remember" > Remember me</label>
</div>
        <button type="submit" >
          S'IDENTIFIER
        </button>
      </form>
      <div className="additions">
      <p style={{textAlign:"right",
        fontSize:"12px"
      }}>Mot de passe oublié?</p>
      <Link to="/signup"><p>Pas encore de compte?S'inscrire</p></Link> 
      </div>
    </div>
    )
}
 export default function Login(){
    return (
      <section className="cinema">
        <div className="inputContainer">
        <Form/>
        </div>
        </section>
    )
 } 