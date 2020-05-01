import React, { Component } from 'react'
import Plotter from './Plotter'
import Columns from './Columns'


class MainPage extends Component {

    constructor(props) {
        super(props)

        this.state = { selectedMeasure: [], selectedDimension: '', plot: false }
        this.onSelectedColumn = this.onSelectedColumn.bind(this)
        this.plotGraph = this.plotGraph.bind(this)
        this.clearGraph = this.clearGraph.bind(this)
        this.clearInput = this.clearInput.bind(this)
    }

    clearInput(e, input) {
        e.preventDefault()
        if (input === 'Dimension') {

            this.setState({ selectedDimension: '' })

        }
        else {
            this.setState({ selectedMeasure: [] })

        }

    }
    onSelectedColumn(column) {

        if (column.function === 'measure') {

            var measures = this.state.selectedMeasure
            if (measures.indexOf(column.name) === -1) {
                measures.push(column.name)
                this.setState({ selectedMeasure: measures })
            }

        }
        else {

            this.setState({ selectedDimension: column.name })


        }

    }

    clearGraph() {

        this.setState({ plot: false, selectedDimension: '', selectedMeasure: [] })
    }

    plotGraph() {



        this.setState({ plot: false }, () => {
            if (this.state.selectedDimension != '' && this.state.selectedMeasure.length != 0) {

                this.setState({ plot: true })
            }
            else {

                alert('Both inputs must be filled')

            }


        })



    }

    render() {
        return (
            <div className='container-fluid p-0'>

                <div className='row'>
                    <div className='col col-sm-3 col-lg-2'>
                        <div>
                            <div >

                                <Columns onSelectedColumn={this.onSelectedColumn} />

                            </div>

                        </div>

                    </div>

                    <div className='col col-sm-9 col-lg-10'>
                        <div className='row'>
                            <div className='mx-4 mx-sm-auto d-flex'>
                                <div className='flex-column'>
                                    <div>
                                        <h6 className='mr-2 mt-2'>Dimension</h6>
                                        <form class="form-inline">
                                            <input readOnly value={this.state.selectedDimension} class="form-control mr-sm-2" type="text" />
                                            <button class="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.clearInput(e, 'Dimension')}>Clear</button>
                                        </form>

                                        <h6 className='mr-2 mt-2'>Measure</h6>
                                        <form class="form-inline">

                                            <input readOnly value={this.state.selectedMeasure} class="form-control mr-sm-2" type="text" />
                                            <button class="btn btn-outline-success my-2 my-sm-0" onClick={(e) => this.clearInput(e, 'Measure')}>Clear</button>
                                        </form>

                                    </div>
                                    <div>
                                        <button onClick={this.plotGraph} className='btn btn-primary m-3'>Plot Graph</button>
                                        <button onClick={this.clearGraph} className='btn btn-primary m-3'>Clear Graph</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='mx-auto'>
                                {this.state.plot &&

                                    <div className='m-4'><Plotter Dimension={this.state.selectedDimension} Measure={this.state.selectedMeasure} /></div>

                                }
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage