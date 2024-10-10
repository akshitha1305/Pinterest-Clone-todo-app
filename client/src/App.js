import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import FormLayout from "./components/FormLayout";
import Login from "./pages/Login";

import Signup from "./pages/Signup";

import { RequireAuth, NotRequireAuth } from "./routes/routes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FormLayout />}>
          <Route
            path="/login"
            element={
              <NotRequireAuth>
                <Login />
              </NotRequireAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <NotRequireAuth>
                <Signup />
              </NotRequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
