import {
    Routes,
    Route
} from "react-router-dom";

import ProtectedRoute
    from "./routes/ProtectedRoute";

import Dashboard
    from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Jobs from "./pages/Jobs";


function App() {

    return (

       <div>
           <Navbar/>
            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                     path="/dashboard"
                     element={
                   <ProtectedRoute>
                   <Dashboard />
                  </ProtectedRoute>}
                   />
                  <Route
                    path="/jobs"
                    element={<Jobs />}
                   />

            </Routes>
       </div>

           

        

    );
}

export default App;