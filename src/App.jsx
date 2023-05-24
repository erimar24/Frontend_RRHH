import './App.scss'
import Home from './components/Home';
import SignIn from './routes/SignIn';
import Candidate from './components/candidate/Candidate';
import CreateCandidate from './components/candidate/CreateCandidate';
import UpdateCandidate from './components/candidate/UpdateCandidate';
import Position from './components/position/Position';
import CreatePosition from './components/position/CreatePosition';
import UpdatePosition from './components/position/UpdatePosition';
import Interview from './components/interview/Interview';
import CreateInterview from './components/interview/CreateInterview';
import UpdateInterview from './components/interview/UpdateInterview';
import Vacant from './components/vacant/Vacant';
import CreateVacant from './components/vacant/CreateVacant';
import UpdateVacant from './components/vacant/UpdateVacant';
import TechnicalTest from './components/technical_test/TechnicalTest';
import Question from './components/question/Question';
import CreateQuestion from './components/question/CreateQuestion';
import UpdateQuestion from './components/question/UpdateQuestion';
import Evaluation from './components/contracting/Evaluation';
import EvaluationCandidate from './components/contracting/EvaluationCandidate';
import User from './components/user/User';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import ProtectedRoutes from './routes/ProtectedRoutes';
import CreateUser from './components/user/CreateUser';
import UpdateUser from './components/user/UpdateUser';


const router = createBrowserRouter([
  {
    path: "/iniciar-sesion",
    element: <SignIn />,
  },
  {
    path: "/",
    element:<ProtectedRoutes><Home /></ProtectedRoutes>,
  },
  {
    path: "/candidatos",
    element:<ProtectedRoutes><Candidate /></ProtectedRoutes>,
  },
  {
    path:"/crear-candidato",
    element:<ProtectedRoutes><CreateCandidate/></ProtectedRoutes>,
  },
  {
    path:"/candidato/:id",
    element:<ProtectedRoutes><UpdateCandidate/></ProtectedRoutes>
  },
  {
    path:"/puestos",
    element:<ProtectedRoutes><Position/></ProtectedRoutes>
  },
  {
    path:"/crear-puesto",
    element:<ProtectedRoutes><CreatePosition/></ProtectedRoutes>
  },
  {
    path:"/crear-puesto/:id",
    element:<ProtectedRoutes><UpdatePosition/></ProtectedRoutes>
  },
  {
    path:"/entrevistas",
    element:<ProtectedRoutes><Interview/></ProtectedRoutes>
  },
  {
    path:"/crear-preguntaI",
    element:<ProtectedRoutes><CreateInterview/></ProtectedRoutes>
  },
  {
    path:"/crear-pregunta/:id",
    element:<ProtectedRoutes><UpdateInterview/></ProtectedRoutes>
  },
  {
    path:"/vacantes",
    element:<ProtectedRoutes><Vacant/></ProtectedRoutes>
  },
  {
    path:"/crear-vacante",
    element:<ProtectedRoutes><CreateVacant/></ProtectedRoutes>
  },
  {
    path:"/crear-vacante/:id",
    element:<ProtectedRoutes><UpdateVacant/></ProtectedRoutes>
  },
  {
    path:"/pruebasTecnicas",
    element:<ProtectedRoutes><TechnicalTest/></ProtectedRoutes>
  },
  {
    path:"/preguntas/:id",
    element:<ProtectedRoutes><Question/></ProtectedRoutes>
  },
  {
    path:"/crear-preguntaT/:id",
    element:<ProtectedRoutes><CreateQuestion/></ProtectedRoutes>
  },
  {
    path:"/crear-preguntaTT/:id",
    element:<ProtectedRoutes><UpdateQuestion/></ProtectedRoutes>
  }, 
  {
    path:"/evaluaciones/:id",
    element:<ProtectedRoutes><Evaluation/></ProtectedRoutes>
  },
  {
    path:"/evaluacion/:id",
    element:<ProtectedRoutes><EvaluationCandidate/></ProtectedRoutes>
  },
  {
    path:"/usuarios",
    element:<ProtectedRoutes><User/></ProtectedRoutes>
  },
  {
    path:"/crear-usuario",
    element:<ProtectedRoutes><CreateUser/></ProtectedRoutes>
  },
  {
    path:"/crear-usuario/:id",
    element:<ProtectedRoutes><UpdateUser/></ProtectedRoutes>
  }
]);


function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App
