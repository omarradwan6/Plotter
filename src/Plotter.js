import React from 'react'
import axios from 'axios'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Plotter extends React.Component {


    constructor(props) {
        super(props)
        this.state = { data: [] }
        this.getData = this.getData.bind(this)
    }


    getData() {
        axios.post(' https://plotter-task.herokuapp.com/data', {
            "measures": this.props.Measure,
            "dimension": this.props.Dimension
        })
            .then((response) => {
                // console.log(response);

                var data = []
                var values = []

                for (let i = 0; i <= response.data.length - 1; i++) {

                    values.push(response.data[i]['values'])

                }

                for (let j = 0; j <= values[0].length - 1; j++) {
                    data[j] = {}
                    for (let i = 0; i <= values.length - 1; i++) {

                        data[j][`values${i}`] = values[i][j]

                    }
                }

                this.setState({ data })
            


            })
            .catch(function (error) {
                console.log(error);
            });

    }



    componentDidMount() {

        this.getData()
    }




    render() {


        return (
            <>
                {this.state.data.length != 0 &&
                    <LineChart
                        width={500}
                        height={300}
                        data={this.state.data}
                        margin={{
                            top: 5, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="value0" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        {Object.keys(this.state.data[0]).map((a) => {
                            
                            if (a != 'values0') {
                                return (

                                    <Line type="monotone" key={a} dataKey={a} stroke="#8884d8" activeDot={{ r: 8 }} />
                                )
                            }

                        })}







                    })}

            </LineChart>
                }
            </>
        )


    }

}

export default Plotter