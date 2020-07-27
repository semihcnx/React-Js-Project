import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {increaseByTwoConuter} from "../redux/actions/counterActions"
import { connect } from 'react-redux'


class IncreaseByTwoCounter extends Component {
    render() {
        return (
            <div>
                 <button onClick={e=>{
                    this.props.dispatch(increaseByTwoConuter())
                }}>2 Arttır</button>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {actions:bindActionCreators(increaseByTwoConuter,dispatch)}
}


export default connect(mapDispatchToProps)(IncreaseByTwoCounter);