import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FormLayout from "./components/FormLayout";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import CreatePin from "./pages/CreatePin";
import Profile from "./pages/Profile";
import ProfileUser from "./pages/ProfileUser";
import ChangePass from "./pages/ChangePass";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
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
            path="/forgot"
            element={<Forgot />}
          />
          <Route
            path="/reset-password"
            element={
              <ResetPassword />
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
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
         {/* New Profile Route with Username */}
         <Route
          path="/profile/:username"
          element={
            <RequireAuth>
              <ProfileUser />
            </RequireAuth>
          }
        />
        <Route
          path="/change-password"
          element={
            <RequireAuth>
              <ChangePass />
            </RequireAuth>
          }
        />
          
        <Route
          path="/search/:query"
          element={
            <RequireAuth>
              <Search />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
         <Route
          path="/pin/create"
          element={
            <RequireAuth>
              <CreatePin />
            </RequireAuth>
          }
        />
         <Route
          path="/todo"
          element={
            <RequireAuth>
              <TodoPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
