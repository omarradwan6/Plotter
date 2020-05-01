import React, { Component } from 'react'
import axios from 'axios'

class Columns extends Component {

    constructor(props) {
        super(props)

        this.state = { columns: [] }
        this.getColumns = this.getColumns.bind(this)
    }

    componentDidMount() {
        this.getColumns()

    }

    getColumns() {
        axios.get('https://plotter-task.herokuapp.com/columns')
            .then((response) => {
                // handle success
                this.setState({ columns: response.data })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }





    render() {
        return (
            <div>
                <nav class="navbar navbar-light bg-light text-center">
                <h2 class="navbar-brand " >Columns</h2>
                </nav>
                <ul class="list-group">
                    {this.state.columns.map((a, index) => {

                        return (
                            <a class="list-group-item list-group-item-action border-0" key={index} onClick={(e) => this.props.onSelectedColumn(a)}>{a.name}</a>
                        )

                    })}

                </ul>
            </div>
        )
    }
}

export default Columns
