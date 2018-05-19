import React from 'react';
import {Field} from 'redux-form'

export default (field) => {
    console.log(field);
    return (
        <div key={field.id}>
            <div>
                <b>{field.name}</b>
                {
                    (() => {
                        switch (field.type) {
                            case 'enum':
                                return <Field name={'custom_field.'+field.id} component="select">
                                    {field.enum_options.map(option => {
                                        return <option value={option.id} key={'enum_'+option.id}>{option.name} </option>
                                    })}
                                </Field>
                            case 'number':
                                return <Field name={'custom_field.'+field.id} component="input" type="number"/>
                            default :
                                return <Field name={'custom_field.'+field.id} component="input" type="text"/>
                        }
                    })()
                }
            </div>

        </div>
    )


}
