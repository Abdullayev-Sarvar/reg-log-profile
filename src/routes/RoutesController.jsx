import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Login from './login/Login';
import Register from './register/Register';
import Profile from './profile/Profile';

const App = () => {
    return (
        <Routes>
          <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><Register /></Suspense>} />
          <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>} />
          <Route path='/profile' element={<Suspense fallback={<div>Loading...</div>}><Profile /></Suspense>} />
        </Routes>
    );
};

export default App;
