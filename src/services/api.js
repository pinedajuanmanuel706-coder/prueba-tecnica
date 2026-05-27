import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function fetchIssues() {
  return api.get('/issues');
}

export function createIssue(issue) {
  return api.post('/issues', issue);
}

export function updateIssue(issueId, payload) {
  return api.patch(`/issues/${issueId}`, payload);
}

export function deleteIssue(issueId) {
  return api.delete(`/issues/${issueId}`);
}
