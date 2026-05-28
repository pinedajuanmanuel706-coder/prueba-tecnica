import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // asegúrate de levantar json-server en este puerto
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});

export const fetchIssues = () => api.get('/issues');
export const createIssue = (issue) => api.post('/issues', issue);
export const updateIssue = (id, changes) => api.patch(`/issues/${id}`, changes);
export const deleteIssue = (id) => api.delete(`/issues/${id}`);
