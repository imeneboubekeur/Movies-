import { Link } from "react-router-dom"

export function Form(){
    return(
        
        <div className="login">
            <p className="identifyy">S'inscrire</p>
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
         <input
          type="password"
          placeholder=" Confirm Password"
         
          required
        />
        </div>
<div className="checkboxContainer">
<input type="checkbox" id="remember" name="remember" value="remember"/>
<label htmlFor="remember" > Remember me</label>
</div>
        <button type="submit" >
          S'INSCRIRE
        </button>
      </form>
      <div className="additions">
      <Link to="/login"><p>Deja inscrit?S'identifier</p></Link> 
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