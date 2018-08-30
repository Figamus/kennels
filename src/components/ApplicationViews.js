import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import dbCalls from "../modules/dbCalls"
import AnimalDetail from './animal/AnimalDetail'
import AnimalForm from './animal/AnimalForm'
import AnimalEdit from './animal/AnimalEdit'
import Login from './Login'


export default class ApplicationViews extends Component {
    isAuthenticated = () => localStorage.getItem("credentials") !== null

    state = {
        locations: [],
        animals: [],
        employees: [],
        owners: []
    }

    componentDidMount() {
        dbCalls.getAll("animals")
        .then(allAnimals => {
            this.setState({
                animals: allAnimals
            })
        })
        .then(() => dbCalls.getAll("employees"))
        .then(allEmployees => {
            this.setState({
                employees: allEmployees
            })
        })
        .then(() => dbCalls.getAll("locations"))
        .then(allLocations => {
            this.setState({
                locations: allLocations
            })
        })
        .then(() => dbCalls.getAll("owners"))
        .then(allOwners => {
            this.setState({
                owners: allOwners
            })
        })
    }

    dbManager = {
        delete: (resource, id) => {dbCalls.delete(resource, id)
            .then(() => dbCalls.getAll(resource))
            .then(returnObject => this.setState({[resource]: returnObject}))
        },
        addObject: (resource, newObject) => {return dbCalls.post(resource, newObject)
            .then(() => dbCalls.getAll(resource))
            .then(returnObject => this.setState({[resource]: returnObject}))
        },
        editObject: (resource, newObject, id) => {return dbCalls.put(resource, newObject, id)
            .then(() => dbCalls.getAll(resource))
            .then(returnObject => this.setState({[resource]: returnObject}))
        }
    }

    render() {
        return (
            <React.Fragment>

                <Route path="/login" component={Login} />
                <Route exact path="/" render={(props) => {
                    if (this.isAuthenticated()) {
                    return <LocationList {...props}
                    locations={this.state.locations} />
                } else {
                    return <Redirect to="/login" />
                }
            }} />
                <Route exact path="/locations" render={(props) => {
                    if (this.isAuthenticated()) {
                    return <LocationList {...props}
                    locations={this.state.locations} />
                } else {
                    return <Redirect to="/login" />
                }
            }} />
                <Route exact path="/animals" render={(props) => {
                    if (this.isAuthenticated()) {
                    return <AnimalList {...props}
                    delete={this.dbManager.delete}
                    animals={this.state.animals} />
                } else {
                    return <Redirect to="/login" />
                }
            }} />
                <Route path="/animals/new" render={(props) => {
                    if (this.isAuthenticated()) {
                    return <AnimalForm {...props}
                    addObject={this.dbManager.addObject}
                    employees={this.state.employees} />
                } else {
                    return <Redirect to="/login" />
                }
            }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    if (this.isAuthenticated()) {
                    return <AnimalDetail {...props}
                    delete={this.dbManager.delete}
                    animals={this.state.animals} />
                } else {
                    return <Redirect to="/login" />
                }
            }} />
                <Route path="/animals/edit/:animalId(\d+)" render={(props) => {
                    if (this.isAuthenticated()) {
                    return <AnimalEdit {...props}
                    editObject={this.dbManager.editObject}
                    employees={this.state.employees} />
                } else {
                    return <Redirect to="/login" />
                }
            }} />
                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList {...props}
                        delete={this.dbManager.delete}
                        employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
            }} />
                <Route exact path="/owners" render={(props) => {
                    if (this.isAuthenticated()) {
                    return <OwnerList {...props}
                    delete={this.dbManager.delete} 
                    owners={this.state.owners} />
                } else {
                    return <Redirect to="/login" />
                }
            }} />
                    
            </React.Fragment>
        )
    }
}