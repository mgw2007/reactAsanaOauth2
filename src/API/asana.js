import axios from "axios";

const localApiUrl = 'https://app.asana.com/api/1.0/';

const requestHeaders = () => ({
    responseType: "json",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
    }
});
export default {
    sendTaskExtraData: (data) => {
        return axios.put(`${localApiUrl}tasks/${data.taskId}`, {
            data: {
                external: {
                    id: 'my_id',
                    data: data.myData
                }
            }
        }, requestHeaders());
    },
    getTaskData: (taskId) => {
        return axios.get(`${localApiUrl}tasks/${taskId}`, requestHeaders());
    },
    getTasks: (projectId) => {
        return axios.get(`${localApiUrl}tasks?opt_pretty&opt_fields=this.name,this.memberships.section,this.memberships.section.name&project=${projectId}`, requestHeaders());
    },
    getProjects: (workspaceId) => {
        return axios.get(`${localApiUrl}projects?workspace=${workspaceId}`, requestHeaders());
    },
    getWorkspaces: () => {
        return axios.get(`${localApiUrl}workspaces`, requestHeaders());
    },

}