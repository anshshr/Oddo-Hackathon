import "./App.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import Userprofile from "./pages/Userprofile";
import Products from "./pages/Products";
import ProductDes from "./pages/ProductDes"
;
import Admin from "./pages/Admin";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        
        { path: "auth", element: <AuthPage/> },
         { path: "user/:userId", element: <Userprofile/> },
            { path: "products", element: <Products/> },
             { path: "productdes/:id", element: <ProductDes/> },
{ path: "admin", element: <Admin/> },
   
        // { path: "machine/:id", element: <MachineDashboard /> },


        // {
        //   path: 'admindashboard',
        //   element: (
        //     <PrivateRoute>
        //      <AdiminDashboard/>
        //     </PrivateRoute>
        //   ),
        // },
 
       
      ],
    },
  ]);

  return (
    <>
     
      <RouterProvider router={router} />
    </>
  );
}

export default App;
