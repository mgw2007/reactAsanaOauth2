import React from 'react'
import {Field, reduxForm} from 'redux-form'

let Form = props => {
    const {handleSubmit} = props
    return (
        <form onSubmit={handleSubmit}>
            <table>
                <tbody>
                <tr>
                    <td>Tasks :</td>
                    <td>
                        {
                            props.tasks.length > 0 ?
                                <Field name="taskId" component="select"
                                       onChange={event => props.showTaskDetails(event.target.value)}>
                                    <option value="">Select Task</option>
                                    {props.tasks.map((task) => (
                                        <option key={'task_' + task.id} value={task.id}>
                                            {task.name}
                                        </option>
                                    ))}
                                </Field> :
                                <b>{props.loadTasks == true ? 'Load Tasks ....' : 'no data!'} </b>
                        }
                    </td>
                    <td>
                        {
                            props.activeTask && <table>
                                <tbody>
                                <tr>
                                    <td>Id</td>
                                    <td>{props.activeTask.id}</td>
                                </tr>
                                <tr>
                                    <td>assignee</td>
                                    <td>{JSON.stringify(props.activeTask.assignee)}</td>
                                </tr>
                                <tr>
                                    <td>external</td>
                                    <td>{JSON.stringify(props.activeTask.external)}</td>
                                </tr>
                                <tr>
                                    <td>modified_at</td>
                                    <td>{JSON.stringify(props.activeTask.modified_at)}</td>
                                </tr>
                                </tbody>
                            </table>
                        }

                    </td>
                </tr>

                <tr>
                    <td>Data :</td>
                    <td><Field name="myData" component="input" type="text"/></td>
                    <td></td>
                </tr>
                <tr>
                    <td colSpan="3">
                        <button type="submit">Send</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}

export default reduxForm({
    // a unique name for the form
    form: 'asanaForm'
})(Form)
