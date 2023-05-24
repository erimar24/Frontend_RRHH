import axios from "axios";
import jwtDecode from "jwt-decode";
const baseURl = import.meta.env.VITE_URL_API;
import { setHeaders } from "./utils";

/************************************* LOGIN *************************************/
export async function signIn(username, password) {
  try {
    const response = await axios.post(`${baseURl}/auth/signIn`, {
      username,
      password,
    });
    const token = response.data.access_token;
    const userData = jwtDecode(token);
    await sessionStorage.setItem("user", JSON.stringify(userData.user));
    await sessionStorage.setItem("access_token", `access-token ${token}`);
    return { success: true, message: "La autenticación fue exitosa!" };
  } catch (error) {
    return { success: false, message: error.response.data };
  }
}

/************************************* CANDIDATE *************************************/
export async function getCandidates() {
  const { data } = await axios.get(`${baseURl}/candidate/all`, setHeaders());
  return data;
}

export async function getCandidatesByPosition(id) {
  const { data } = await axios.get(`${baseURl}/candidate/allByPosition/${id}`, setHeaders());
  return data;
}

export async function getCandidatesById(vacantId) {
  const { data } = await axios.get(
    `${baseURl}/question/all/`,
    positionC,
    setHeaders()
  );
  return data;
}

export async function getCandidateById(id) {
  const { data } = await axios.get(
    `${baseURl}/candidate/single/${id}`,
    setHeaders()
  );
  return data;
}

export async function deactivateCandidate(id) {
  const { data } = await axios.put(
    `${baseURl}/candidate/deactivate/${id}`,
    {},
    setHeaders()
  );
  return data;
}

export async function updateCandidate(id, candidate) {
  const { data } = await axios.put(
    `${baseURl}/candidate/update/${id}`,
    candidate,
    setHeaders()
  );
  return data;
}

export async function createCandidate(candidate) {
  const { data } = await axios.post(
    `${baseURl}/candidate/create`,
    candidate,
    setHeaders()
  );
  return data;
}

/************************************* POSITION *************************************/
export async function getPositions() {
  const { data } = await axios.get(`${baseURl}/position/all`, setHeaders());
  return data;
}

export async function getPositionById(id) {
  const { data } = await axios.get(
    `${baseURl}/position/single/${id}`,
    setHeaders()
  );

  return data;
}

export async function createPosition(position) {
  const { data } = await axios.post(
    `${baseURl}/position/create`,
    position,
    setHeaders()
  );

  return data;
}

export async function updatePosition(position) {
  const { data } = await axios.put(
    `${baseURl}/position/update/${position.id}`,
    position,
    setHeaders()
  );
  return data;
}

export async function deactivatePosition(id) {
  const { data } = await axios.put(
    `${baseURl}/position/deactivate/${id}`,
    {},
    setHeaders()
  );
  return data;
}

/************************************* INTERVIEW *************************************/
export async function getInterviews() {
  const { data } = await axios.get(`${baseURl}/interview/all`, setHeaders());
  return data;
}

export async function getInterviewById(id) {
  const { data } = await axios.get(
    `${baseURl}/interview/single/${id}`,
    setHeaders()
  );
  return data;
}

export async function createInterview(interview) {
  const { data } = await axios.post(
    `${baseURl}/interview/create`,
    interview,
    setHeaders()
  );
  return data;
}

export async function updateInterview(interview) {
  const { data } = await axios.put(
    `${baseURl}/interview/update/${interview.id}`,
    interview,
    setHeaders()
  );
  return data;
}

export async function deactivateInterview(id) {
  const { data } = await axios.put(
    `${baseURl}/interview/deactivate/${id}`,
    {},
    setHeaders()
  );
  return data;
}

/************************************* VACANT *************************************/
export async function getVacants() {
  const { data } = await axios.get(`${baseURl}/vacant/all`, setHeaders());
  return data;
}

export async function getVacantById(id) {
  const { data } = await axios.get(
    `${baseURl}/vacant/single/${id}`,
    setHeaders()
  );
  return data;
}

export async function createVacant(vacant) {
  const { data } = await axios.post(
    `${baseURl}/vacant/create`,
    vacant,
    setHeaders()
  );
  return data;
}

export async function updateVacant(vacant) {
  const { data } = await axios.put(
    `${baseURl}/vacant/update/${vacant.id}`,
    vacant,
    setHeaders()
  );
  return data;
}

export async function deactivateVacant(id) {
  const { data } = await axios.put(
    `${baseURl}/vacant/deactivate/${id}`,
    {},
    setHeaders()
  );
  return data;
}

/************************************* TECHNICAL TEST *************************************/
export async function getTechnicalTest() {
  const { data } = await axios.get(
    `${baseURl}/technical_test/all`,
    setHeaders()
  );
  return data;
}

/************************************* QUESTION *************************************/
export async function getQuestions(id) {
  const { data } = await axios.get(
    `${baseURl}/question/all/${id}`,
    setHeaders()
  );
  return data;
}

export async function getQuestionById(id) {
  const { data } = await axios.get(
    `${baseURl}/question/single/${id}`,
    setHeaders()
  );
  return data;
}

export async function createQuestion(id, question) {
  const { data } = await axios.post(
    `${baseURl}/question/create/${id}`,
    question,
    setHeaders()
  );
  return data;
}

export async function updateQuestion(question) {
  const { data } = await axios.put(
    `${baseURl}/question/update/${question.id}`,
    question,
    setHeaders()
  );
  return data;
}

export async function deactivateQuestion(id) {
  const { data } = await axios.put(
    `${baseURl}/question/deactivate/${id}`,
    {},
    setHeaders()
  );
  return data;
}

/************************************* EVALUATION *************************************/
export async function getEvaluations(id) {
  const { data } = await axios.get(
    `${baseURl}/evaluation/all/${id}`,
    setHeaders()
  );
  return data;
}

export async function getEvaluationById(id) {
  const { data } = await axios.get(
    `${baseURl}/evaluation/single/${id}`,
    setHeaders()
  );
  return data;
}

export async function getEvaluationCById(candidateId) {
  const { data } = await axios.get(
    `${baseURl}/candidate/single/${candidateId}`,
    setHeaders()
  );
  return data;
}

export async function createEvaluation(evaluation) {
  const { data } = await axios.put(
    `${baseURl}/evaluation/add/${evaluation.id}`,
    evaluation,
    setHeaders()
  );
  return data;
}

export async function addCandidate(id, vacantId) {
  const valores = {
    fa_level: 0,
    fa_ability: 0,
    exp_general: 0,
    exp_spicify: 0,
    interview: 0,
    tecnhinal_test: 0,
    vacantId: vacantId,
    candidateId: id,
  };
  const { data } = await axios.post(
    `${baseURl}/evaluation/add`,
    valores,
    setHeaders()
  );
  return data;
}

export async function deactivateCandidateEvaluation(id) {
  const { data } = await axios.put(
    `${baseURl}/evaluation/deactivate/${id}`,
    {},
    setHeaders()
  );
  return data;
}

export async function getReport(id) {
  const { data } = await axios.get(
    `${baseURl}/evaluation/report/${id}`,
    setHeaders()
  );
  return data;
}

/************************************* USER *************************************/
export async function getUsers() {
  const { data } = await axios.get(`${baseURl}/user/all`, 
  setHeaders());
  return data;
}

export async function getUserById(id) {
  const { data } = await axios.get(
    `${baseURl}/user/single/${id}`,
    setHeaders()
  );

  return data;
}

export async function createUser(user) {
  const { data } = await axios.post(
    `${baseURl}/user/create`,
    user,
    setHeaders()
  );

  return data;
}

export async function updateUser(user) {
  const { data } = await axios.put(
    `${baseURl}/user/update/${user.id}`,
    user,
    setHeaders()
  );
  return data;
}

export async function deactivateUser(id) {
  const { data } = await axios.put(
    `${baseURl}/user/deactivate/${id}`,
    {},
    setHeaders()
  );
  return data;
}
