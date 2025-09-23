import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from "./components/home"
import Movies from "./components/mainMovies"
import Series from "./components/mainSeries"
import Single from "./components/mainSingle"
import Login from "./components/login.jsx"
import Signup from "./components/signup.jsx"
import SingleSerie from "./components/singleSerie.jsx"
import Episods from "./components/episods.jsx"
import Episode from "./components/singleEpisode.jsx"
import Layout from './components/layout.jsx'

 export function NotFound() {
  return <h2 style={{color:"red"}}>404 - Page Not Found</h2>;
}
const layout="grid"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {path:"",element:<Home/>}, 
      {path:"movies", element:<Movies category={"movie"} layout={layout}/>},
      {path:"series", element:<Series category={"tv"} layout={layout}/>},
      {path:"movies/genre/:idGenre",element:<Movies layout={layout}/>},
      {path:"movies/:id",element:<Single category={"movie"}/>},
      {path:"series/:id",element:<SingleSerie />},
      {path:"movies/genre/:idGenre/:sort",element:<Movies layout={layout}/>},
     {path:"movies/sort/:sort",element:<Movies layout={layout}/>},
                {path:"series/:id/:season",element:<Episods />},
      {path:"series/:id/:season/:episode",element:<Episode />},

    ]
  },{path:"login",element:<Login />},
  {path:"signup",element:<Signup />},
  { path:"*", element:<NotFound />}
]);
export default function App(){
 return <RouterProvider router={router} />
  
  
}