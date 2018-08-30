import React, { Component } from 'react'


class OwnerList extends Component {
    render () {
        return (
            <section className="owner">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                                {owner.name}
                                <a href=""
                                    onClick={() => this.props.delete("owners", owner.id)}
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

export default OwnerList