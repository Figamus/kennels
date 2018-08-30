import React, { Component } from 'react'


export default class LocationList extends Component {
    render () {
        return (
            <section className="location">
            {
                this.props.locations.map(location =>
                    <div key={location.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                {location.name}
                            </h5>
                                <p>{location.address}</p>
                                <h5><a href=""
                                    onClick={() => this.props.delete("locations", location.id)}
                                    className="card-link">Delete</a></h5>
                        </div>
                    </div>
                )
            }
            </section>
        )
    }
}