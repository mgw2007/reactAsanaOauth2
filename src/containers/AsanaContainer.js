import React from "react";
import {connect} from "react-redux";
import Form from "./Form";
import AsanaAPI from "../API/asana";
import {
    setProjects, setTasks, setWorkSPaces, loadTasks, loadProjects, setActiveTask, setSubTasks,
    loadSubTasks
} from "../actions";

class AsanaContainer extends React.Component {

    submit(values) {
        // print the form values to the console
        AsanaAPI.sendTaskExtraData(values).then((res) => {
            this.showTaskDetails(values.taskId)
        })
    }

    componentWillMount() {
        AsanaAPI.getWorkspaces().then((res) => {
            this.props.dispatch(setWorkSPaces(res.data.data))
        })

    }

    getWorkSpaceProjects(workspaceId) {
        if (workspaceId) {
            this.props.dispatch(loadProjects());
            AsanaAPI.getProjects(workspaceId).then((res) => {
                this.props.dispatch(setProjects(res.data.data))
            })
        }
    }

    getProjectTasks(projectId) {
        if (projectId) {
            this.props.dispatch(loadTasks());
            AsanaAPI.getTasks(projectId).then((res) => {
                this.props.dispatch(setTasks(res.data.data))
            })
        }
    }

    showTaskDetails(taskId) {
        if (taskId) {
            console.log('taskId', taskId)
            AsanaAPI.getTaskData(taskId).then((res) => {
                this.props.dispatch(setActiveTask(res.data.data))
            })
        }
    }
    getTaskSubTasks(taskId) {
        if (taskId) {
            this.props.dispatch(loadSubTasks());
            AsanaAPI.getSubTasks(taskId).then((res) => {
                this.props.dispatch(setSubTasks(res.data.data))
            })
        }
    }

    render() {
        return <div>
            <h4>Select Workspace</h4>
            {
                this.props.workspaces.length > 0 ?
                    <select onChange={event => this.getWorkSpaceProjects(event.target.value)}>
                        <option value="">Select Workspace</option>
                        {this.props.workspaces.map((workspace) => (
                            <option key={'workspace_' + workspace.id} value={workspace.id}>
                                {workspace.name}
                            </option>
                        ))}
                    </select> :
                    <b>Load WorkSpaces .... </b>
            }
            <hr/>
            <h4>Select Projects</h4>
            {
                this.props.projects.length > 0 ?
                    <select onChange={event => this.getProjectTasks(event.target.value)}>
                        <option value="">Select Project</option>
                        {this.props.projects.map((project) => (
                            <option key={'project_' + project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select> :
                    <b>{this.props.loadProjects == true ? 'Load Projects ....' : 'no data!'}</b>
            }
            <hr/>
            <h4>Select Task</h4>
            {
                this.props.tasks.length > 0 ?
                    <select onChange={event => this.getTaskSubTasks(event.target.value)}>
                        <option value="">Select Task</option>
                        {this.props.tasks.map((task) => (
                            <option key={'tasks_' + task.id} value={task.id}>
                                {task.name}
                            </option>
                        ))}
                    </select> :
                    <b>{this.props.loadTasks == true ? 'Load Tasks ....' : 'no data!'}</b>
            }
            <hr/>

            <Form onSubmit={this.submit.bind(this)}
                  subTasks={this.props.subTasks}
                  loadSubTasks={this.props.loadSubTasks}
                  showTaskDetails={this.showTaskDetails.bind(this)}
                  activeTask={this.props.activeTask}
            />
            <hr/>
            <button type='button' onClick={this.props.logout}>Logout</button>
        </div>

    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
        workspaces: state.app.workspaces,
        projects: state.app.projects,
        tasks: state.app.tasks,
        subTasks: state.app.subTasks,
        loadProjects: state.app.loadProjects,
        loadTasks: state.app.loadTasks,
        loadSubTasks: state.app.loadSubTasks,
        activeTask: state.app.activeTask
    };
};
export default connect(mapStateToProps)(AsanaContainer);
