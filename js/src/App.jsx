import Header from "./Header";
import { Routes, Route } from "@solidjs/router";
import { lazy } from "solid-js";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const User = lazy(() => import("./pages/User"));
const Book = lazy(() => import("./pages/Book"));
const Writes = lazy(() => import("./pages/Writes"));
const NotFound = lazy(() => import("./pages/404"));

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/user/:id" component={User} />
      <Route path="/book/:id" component={Book} />
      <Route path="/writes" component={Writes} />
      <Route path="/*" component={NotFound} />
    </Routes>
  </>
);

export default App;
