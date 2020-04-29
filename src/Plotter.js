import React from 'react'
import axios from 'axios'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Plotter extends React.Component {


    constructor(props) {
        super(props)
        this.state = {  data: [] }
        this.getData = this.getData.bind(this)
    }


    getData() {
        axios.post(' https://plotter-task.herokuapp.com/data', {
            "measures": [this.props.Measure],
            "dimension": this.props.Dimension
          })
          .then( (response)=> {
            console.log(response);

            var data= []
            var dataLength=response.data[0]['values'].length-1
            var names=response.data[0]['values']
            var values=response.data[1]['values']

            for(let i=0;i<=dataLength;i++){

                data.push({name:names[i],value:values[i]})

            }
            this.setState({data})

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


                <LineChart
                    width={500}
                    height={300}
                    data={this.state.data}
                    margin={{
                        top: 5, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"  />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>

            
        )


    }

}

export default Plotter