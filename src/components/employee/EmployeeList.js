import React, { Component } from 'react'
import "./Employee.css"

export default class EmployeeList extends Component {
    render () {
        return (
            <section className="employee">
            {
                this.props.employees.map(employee =>
                    <div key={employee.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                {employee.name}
                                <a href=""
                                    onClick={() => this.props.delete("employees", employee.id)}
                                    className="card-link">Delete</a>
                            </h5>
                        </div>
                    </div>
                )
            }
            </section>
        )
    }
}