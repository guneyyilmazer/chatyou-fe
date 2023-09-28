import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import { store } from "./app/store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  //@ts-ignore doesn't have an easy fix
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<App />} />
          <Route path="auth">
            <Route index element={<AuthPage />} />
          </Route>
          <Route path="users">
            <Route path=":userId" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
