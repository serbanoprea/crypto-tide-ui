import React, { Component } from 'react'

export default class StatImage extends Component {
    constructor(props){
        super(props);
        this.state = {
            errored: false
        };
    }

    render() {
        var normalImage = `https://cryptologos.cc/logos/${this.props.entity.name.toLowerCase().replace(' ', '-')}-${this.props.entity.symbol}-logo.svg?v=001`;
        var errorImage = "https://cryptologos.cc/logos/startcoin-start-logo.svg?v=001";
        var src = !this.state.errored ? normalImage : errorImage
        if(this.props.entity)
            return (
                <>
                    <img
                        src={src}
                        alt={this.props.entity.name}
                        onError = {((e) => {
                            e.preventDefault();
                            this.setState({errored: true});
                        })}
                        className="circle" />
                </>
            )
    }
}
