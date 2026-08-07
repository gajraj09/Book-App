import {createBrowserRouter} from "react-router-dom"
import Login from "./pages/Login"
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";

const Router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/homepage",
        element:<Homepage/>
    },
    {
        path:"/register",
        element:<Register/>
    }
])
export default Router;