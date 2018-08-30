import React, { Component } from 'react'


// class JoinList extends Component {
//     render() {
//         return (
//             <section className="owners">
//             <h1>Owners & Pets</h1>
//             {this.props.owners[1].name} - {this.props.animals[1].name}
//             </section>
//         )
//     }
// }
class JoinList extends Component {
    render() {
        console.log(this.props)
        return (
            <section className="joins">
            <h1>Owners & Pets</h1>
            {
                this.props.join.map(connection =>
                    <div id={`owner--${connection.id}`} key={connection.id}>
                    {this.props.owners[`${connection.owner-1}`].name} - {this.props.animals[`${connection.pet-1}`].name}
                    </div>
                )
            }
            </section>
        )
    }
}

export default JoinList