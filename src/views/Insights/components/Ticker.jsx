import React, { Component } from 'react'

class TickerItem extends Component {
    render() {
        var element = this.props.element;
        return (
            <div className="ticker__item">{element.name} - ${element.price.toFixed(2)}
            {(element.change > 0 ?
                <i className="material-icons green-text text-lighten-4">call_made</i> :
                <i className="material-icons red-text text-lighten-4">call_received</i>)
            }
            </div>
        )
    }
}


export default class Ticker extends Component {
    render() {
        return (
            <div className="cointainer">
                <div className="ticker-wrap">
                    <div className="ticker">
                        { 
                            this.props.data.map(el => {
                                return <TickerItem key={el.symbol} element={el} />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}
