export default function Footer(){
    return(
        <div className="footer">
            <div className="column1">
                <ul className="sugg">
                  <li><span className="icon">♛</span> Suggérer un Contenu</li>
  <li><span className="icon">⚐</span> Signaler un Problème</li>
  <li><span className="icon">⛭</span> Répertoire XalaFlix</li>
  <li><span className="icon">✧</span> Statut des Services</li>
  <li><span className="icon"></span> DMCA</li>


                </ul>
                <p sytle={{fontWeight:"900"}}>xalaflixArt 🇫🇷 Tous droits réservés</p>
                <p style={{ fontWeight: "100",
                    textShadow:" rgb(117, 48, 173) 0px 0px 5px, rgb(117, 48, 173) 0px 0px 10px, rgb(117, 48, 173) 0px 0px 20px, rgb(117, 48, 173) 0px 0px 40px",
                color:"white",
                fontSize:"10px",
                 fontStyle:"italic"                }}>La vie est un film sans pause,sans retour en arrière,joue ton role à la perfection</p>
            </div>
            <div className="column2">
                XalaFlix.art
            </div>
        </div>
    )
}