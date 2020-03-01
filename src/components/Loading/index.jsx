import React, { Component } from 'react';
import ReactLoading from "react-loading";

export default class Loading extends Component {
    render() {
        return (
            <div className='container'>
                <div className="row">
                    <ReactLoading type={"cubes"} color="#ffa500" height={'50%'} width={'50%'} className='col s6 offset-s3'/>
                </div>                
            </div>
        )
    }
}
