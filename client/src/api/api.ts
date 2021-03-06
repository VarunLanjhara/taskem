import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const login = (data: { email: string; password: string }) =>
  API.post(`/user/login`, data);
export const register = (data: {
  username: string;
  email: string;
  password: string;
}) => API.post("/user/register", data);
export const getUser = (token: string) =>
  API.get("/user/profile", {
    headers: {
      token: token,
    },
  });
export const updateUser = (
  data: { username: string; email: string; bio: string },
  token: string
) =>
  API.put("/user/update_profile", data, {
    headers: {
      token: token,
    },
  });

export const getTodayTasks = (token: string) =>
  API.get("/task/today", {
    headers: {
      token: token,
    },
  });

export const createTodayTask = (
  data: { title: string; description: string },
  token: string
) =>
  API.post("/task/today", data, {
    headers: {
      token: token,
    },
  });

export const deleteTodayTask = (token: string, taskId: string) =>
  API.delete(`/task/today/${taskId}`, {
    headers: {
      token: token,
    },
  });

export const updateTodayTask = (
  data: { title: string; description: string },
  token: string,
  taskId: string
) =>
  API.put(`/task/today/${taskId}`, data, {
    headers: {
      token: token,
    },
  });

export const complteTodayTask = (token: string, taskId: string) =>
  API.put(
    `/task/today/complete/${taskId}`,
    {},
    {
      headers: {
        token: token,
      },
    }
  );

export const getInboxTasks = (token: string) =>
  API.get("/task/inbox", {
    headers: {
      token: token,
    },
  });

export const createInboxTask = (
  data: { title: string; description: string },
  token: string
) =>
  API.post("/task/inbox", data, {
    headers: {
      token: token,
    },
  });

export const deleteInboxTask = (token: string, taskId: string) =>
  API.delete(`/task/inbox/${taskId}`, {
    headers: {
      token: token,
    },
  });

export const updateInboxTask = (
  data: { title: string; description: string },
  token: string,
  taskId: string
) =>
  API.put(`/task/inbox/${taskId}`, data, {
    headers: {
      token: token,
    },
  });

export const completeInboxTask = (token: string, taskId: string) =>
  API.put(
    `/task/inbox/complete/${taskId}`,
    {},
    {
      headers: {
        token: token,
      },
    }
  );

export const getWeeklyTasks = (token: string) =>
  API.get("/task/weekly", {
    headers: {
      token: token,
    },
  });

export const createWeeklyTask = (
  data: { title: string; description: string },
  token: string
) =>
  API.post("/task/weekly", data, {
    headers: {
      token: token,
    },
  });

export const deleteWeeklyTask = (token: string, taskId: string) =>
  API.delete(`/task/weekly/${taskId}`, {
    headers: {
      token: token,
    },
  });

export const updateWeeklyTask = (
  data: { title: string; description: string },
  token: string,
  taskId: string
) =>
  API.put(`/task/weekly/${taskId}`, data, {
    headers: {
      token: token,
    },
  });

export const completeWeeklyTask = (token: string, taskId: string) =>
  API.put(
    `/task/weekly/complete/${taskId}`,
    {},
    {
      headers: {
        token: token,
      },
    }
  );

export const getProjects = (token: string) =>
  API.get("/project", {
    headers: {
      token: token,
    },
  });

export const createProject = (
  data: { name: string; description: string; color: string },
  token: string
) =>
  API.post("/project", data, {
    headers: {
      token: token,
    },
  });

export const deleteProject = (token: string, projectId: string) =>
  API.delete(`/project/${projectId}`, {
    headers: {
      token: token,
    },
  });

export const updateProject = (
  data: { name: string; description: string; color: string },
  token: string,
  projectId: string
) =>
  API.put(`/project/${projectId}`, data, {
    headers: {
      token: token,
    },
  });

export const getProject = (token: string, projectId: string) =>
  API.get(`/project/${projectId}`, {
    headers: {
      token: token,
    },
  });

export const getTags = (token: string) =>
  API.get("/tag", {
    headers: {
      token: token,
    },
  });

export const createTag = (
  data: { name: string; description: string; color: string },
  token: string
) =>
  API.post("/tag", data, {
    headers: {
      token: token,
    },
  });

export const deleteTag = (token: string, tagId: string) =>
  API.delete(`/tag/${tagId}`, {
    headers: {
      token: token,
    },
  });

export const updateTag = (
  data: { name: string; description: string; color: string },
  token: string,
  tagId: string
) =>
  API.put(`/tag/${tagId}`, data, {
    headers: {
      token: token,
    },
  });

export const getTag = (token: string, tagId: string) =>
  API.get(`/tag/${tagId}`, {
    headers: {
      token: token,
    },
  });

export const commentProject = (
  token: string,
  projectId: string,
  comment: string
) =>
  API.put(
    `/project/${projectId}/comment`,
    {
      comment,
    },
    {
      headers: {
        token: token,
      },
    }
  );

export const commentTag = (token: string, tagId: string, comment: string) =>
  API.put(
    `/tag/${tagId}/comment`,
    {
      comment,
    },
    {
      headers: {
        token: token,
      },
    }
  );

export const getProjectTasks = (token: string, projectId: string) =>
  API.get(`/projecttask/${projectId}`, {
    headers: {
      token: token,
    },
  });

export const createProjectTask = (
  token: string,
  projectId: string,
  data: { title: string; description: string }
) =>
  API.post(`/projecttask/${projectId}`, data, {
    headers: {
      token: token,
    },
  });

export const deleteProjectTask = (
  token: string,
  projectId: string,
  taskId: string
) =>
  API.delete(`/projecttask/${projectId}/${taskId}`, {
    headers: {
      token: token,
    },
  });

export const updateProjectTask = (
  token: string,
  projectId: string,
  data: { title: string; description: string },
  taskId: string
) =>
  API.put(`projecttask/${projectId}/${taskId}`, data, {
    headers: {
      token: token,
    },
  });

export const completeProjectTask = (
  token: string,
  projectId: string,
  taskId: string
) =>
  API.put(
    `projecttask/${projectId}/${taskId}/complete`,
    {},
    {
      headers: {
        token: token,
      },
    }
  );

export const getCompletedTasks = (token: string) =>
  API.get(`/task/completedtasks`, {
    headers: {
      token: token,
    },
  });

export const searchTodayTasks = (token: string, search: string) =>
  API.get(`/task/today/s/${search}`, {
    headers: {
      token: token,
    },
  });

export const searchInboxTasks = (token: string, search: string) =>
  API.get(`/task/inbox/s/${search}`, {
    headers: {
      token: token,
    },
  });

export const searchWeeklyTasks = (token: string, search: string) =>
  API.get(`/task/weekly/s/${search}`, {
    headers: {
      token: token,
    },
  });

export const filerTodayTaskTime = (token: string) =>
  API.get(`/task/today/f/time`, {
    headers: {
      token: token,
    },
  });

export const filerTodayTaskTitle = (token: string) =>
  API.get(`/task/today/f/title`, {
    headers: {
      token: token,
    },
  });

export const filerInboxTaskTime = (token: string) =>
  API.get(`/task/inbox/f/time`, {
    headers: {
      token: token,
    },
  });

export const filerInboxTaskTitle = (token: string) =>
  API.get(`/task/inbox/f/title`, {
    headers: {
      token: token,
    },
  });

export const filerWeeklyTaskTime = (token: string) =>
  API.get(`/task/weekly/f/time`, {
    headers: {
      token: token,
    },
  });

export const filerWeeklyTaskTitle = (token: string) =>
  API.get(`/task/weekly/f/title`, {
    headers: {
      token: token,
    },
  });

export const projectTasksSearch = (
  token: string,
  projectId: string,
  search: string
) =>
  API.get(`/projecttask/${projectId}/s/${search}`, {
    headers: {
      token: token,
    },
  });

export const projectTaskFilterTime = (token: string, projectId: string) =>
  API.get(`/projecttask/${projectId}/f/time`, {
    headers: {
      token: token,
    },
  });

export const projectTaskFilterTitle = (token: string, projectId: string) =>
  API.get(`/projecttask/${projectId}/f/title`, {
    headers: {
      token: token,
    },
  });

export const getDeletedTasks = (token: string) =>
  API.get(`/task/deletedtasks`, {
    headers: {
      token: token,
    },
  });
