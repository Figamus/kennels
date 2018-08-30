import React, { Component } from "react"
import "./Animal.css"
import dog from "./DogIcon.png"


export default class AnimalDetail extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const animal = this.props.animals.find(animal => animal.id === parseInt(this.props.match.params.animalId, 0)) || {}

        return (
            <section className="animal">
                <div key={animal.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            <img src={dog} className="icon--dog" alt="dog" />
                            {animal.name}
                        </h4>
                        <h6 className="card-title">
                            {animal.breed}
                        </h6>
                        <a href=""
                            onClick={() => this.props.delete("animals", animal.id)
                                .then(() => this.props.history.push("/animals"))}
                                className="card-link">Delete</a>
                    </div>
                    <div className="animalButton">
                        <button type="button"className="btn btn-success" onClick={() => {
                            this.props.history.push(`/animals/edit/${animal.id}`)}
                        }>Edit Animal</button>
                    </div>
                </div>
            </section>
        )
    }
}