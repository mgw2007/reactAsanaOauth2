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
        console.log(values)
        AsanaAPI.updateTaskCustomField(values).then((res) => {
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

    getFormDefaultValues() {
        let data = {}
        if (this.props.activeTask.custom_fields) {
            data['taskId'] = this.props.activeTask.id;
            data['custom_field'] = {};
            this.props.activeTask.custom_fields.map(custom_field => {
                switch (custom_field.type) {
                    case "enum":
                        data['custom_field'][custom_field.id] = custom_field.enum_value ? custom_field.enum_value.id : '    ';
                        break;
                    case "number":
                        data['custom_field'][custom_field.id] = custom_field.number_value
                        break;
                    case "text":
                        data['custom_field'][custom_field.id] = custom_field.text_value;
                        break;
                }
            })

        }
        console.log('data')
        console.log(data)
        return data;
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


            <Form onSubmit={this.submit.bind(this)}
                  tasks={this.props.tasks}
                  loadTasks={this.props.loadTasks}
                  showTaskDetails={this.showTaskDetails.bind(this)}
                  activeTask={this.props.activeTask}
                  initialValues={this.getFormDefaultValues()}
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
