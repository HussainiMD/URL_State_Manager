import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Header} from "./Header";
import {Footer} from "./Footer";
import {Main} from "./Main";
import { getUserPosts } from "../lib/helper";



const browserRouter = createBrowserRouter([
    {
        path:'/',
        element: <HomePage />,
        errorElement: <div>Page not found</div>,
        loader: getUserPosts
    }
]);

export function App() {
    return <RouterProvider router={browserRouter}/>;
}

function HomePage() {
    return (<>
        <Header />
        <Main />
        <Footer />
    </>);
}