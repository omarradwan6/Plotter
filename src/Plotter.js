import React from 'react'
import axios from 'axios'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Plotter extends React.Component {


    constructor(props) {
        super(props)
        this.state = { columns: [], data: [] }

        this.getData = this.getData.bind(this)
        this.getColumns = this.getColumns.bind(this)
    }


    getData() {
        axios.post(' https://plotter-task.herokuapp.com/data', {
            "measures": ["Cost"],
            "dimension": "Product"
          })
          .then( (response)=> {
            console.log(response);

            var data= []

            for(let i=0;i<=response.data[0]['values'].length-1;i++){

                data.push({name:response.data[0]['values'][i],value:response.data[1]['values'][i]})

            }
            this.setState({data})




            


          })
          .catch(function (error) {
            console.log(error);
          });

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


    componentDidMount() {

        this.getColumns()
        this.getData()
    }




    render() {

        

        return (


                <LineChart
                    width={500}
                    height={300}
                    data={this.state.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
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