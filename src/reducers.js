import {
    SET_ACTIVE_TASK,
    SET_TASKS,
    LOAD_TASKS,
    SET_PROJECTS,
    LOAD_PROJECTS,
    SET_WORKSPACES,
    SET_SUB_TASKS,
    LOAD_SUB_TASKS
} from "./actions"

const initialState = {
    workspaces: [],
    projects: [],
    tasks: [],
    subTasks: [],
    activeTask: {},
    loadTasks: null,
    loadSubTasks: null,
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
        case LOAD_SUB_TASKS:
            state = {
                ...state,
                loadSubTasks: true,
            };
            break;
        case SET_SUB_TASKS:
            state = {
                ...state,
                subTasks: action.payload,
                loadSubTasks: false,
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