import { Route, Routes } from "react-router-dom"
import Authenticator from "./Pages/Authenticator/Authenticator"
import Home from "./Pages/Home/Home"
import "./App.css"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {


  return (
    <>
      <div className="toast-container"><ToastContainer limit={2} /></div>
      <div>
        <Routes>
          <Route path="/" element={<Authenticator />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
