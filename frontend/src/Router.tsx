import {createBrowserRouter} from "react-router-dom"
import Login from "./pages/Login"

const Router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/homepage",
        element:"<Homepage/>"
    }
])
export default Router;