import type { Component } from 'solid-js';
import { lazy } from 'solid-js';
import { Routes, Route, A } from '@solidjs/router';

const Home = lazy(() => import ("./pages/Home"));
const Login = lazy(() => import ("./pages/Login"));
const Signup = lazy(() => import ("./pages/Signup"));
const User = lazy(() => import ("./pages/User"));
const Book = lazy(() => import ("./pages/Book"));
const Writes = lazy(() => import ("./pages/Writes"));

const App: Component = () => (
    <div class="bg-gray-200 h-screen m-0">
      <nav>
        <A href="/">Home</A>
        <A href="/login">Login</A>
        <A href="/signup">Signup</A>
        <A href="/user">User</A>
        <A href="/book">Book</A>
        <A href="/writes">Writes</A>
      </nav>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/user/:id" component={User} />
        <Route path="/book" component={Book} />
        <Route path="/writes" component={Writes} />
      </Routes>
    </div>
  );

export default App;
