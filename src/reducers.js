import {
    SET_ACTIVE_TASK,
    SET_TASKS,
    LOAD_TASKS,
    SET_PROJECTS,
    LOAD_PROJECTS,
    SET_WORKSPACES
} from "./actions"

const initialState = {
    workspaces: [],
    projects: [],
    tasks: [],
    activeTask: {},
    loadTasks: null,
    loadProjects: null,

};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_WORKSPACES:
            state = {
                ...state,
                workspaces: action.payload,
            };
            break;
        case LOAD_PROJECTS:
            state = {
                ...state,
                loadProjects: true,
            };
            break;
        case SET_PROJECTS:
            state = {
                ...state,
                projects: action.payload,
                loadProjects: false,
            };
            break;
        case LOAD_TASKS:
            state = {
                ...state,
                loadTasks: true,
            };
            break;
        case SET_TASKS:
            state = {
                ...state,
                tasks: action.payload,
                loadTasks: false,
            };
            break;
        case SET_ACTIVE_TASK:
            state = {
                ...state,
                activeTask: action.payload,
            };
            break;
    }
    return state
}