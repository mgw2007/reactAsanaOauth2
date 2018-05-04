import API from "./API/asana";

export const SET_WORKSPACES = 'SET_WORKSPACES';
export const LOAD_PROJECTS = 'LOAD_PROJECTS';
export const SET_PROJECTS = 'SET_PROJECTS';
export const LOAD_TASKS = 'LOAD_TASKS';
export const SET_TASKS = 'SET_TASKS';
export const LOAD_SUB_TASKS = 'LOAD_SUB_TASKS';
export const SET_SUB_TASKS = 'SET_SUB_TASKS';
export const SET_ACTIVE_TASK = 'SET_ACTIVE_WORKSPACE';
export const setWorkSPaces = (workspaces) => ({
    type: SET_WORKSPACES,
    payload: workspaces
})

export const setProjects = (projects) => ({
    type: SET_PROJECTS,
    payload: projects
})
export const loadProjects = () => ({
    type: LOAD_PROJECTS,
})

export const setTasks = (tasks) => ({
    type: SET_TASKS,
    payload: tasks
})

export const loadTasks = () => ({
    type: LOAD_TASKS,
})

export const setSubTasks = (subTasks) => ({
    type: SET_SUB_TASKS,
    payload: subTasks
})

export const loadSubTasks = () => ({
    type: LOAD_SUB_TASKS,
})

export const setActiveTask = (task) => ({
    type: SET_ACTIVE_TASK,
    payload: task
})
