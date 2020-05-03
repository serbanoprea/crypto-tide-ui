import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'
import React, { Component } from 'react'
import Loading from '../../components/Loading';
import StatImage from '../BestPerformingStats/StatImage';
import TableGraph from './TableGraph';

export default class Table extends Component {
  getData(){
    return this.props.data;
  }

    render() {
      if(this.props.loading)
        return(
          <>
            <Loading />
          </>
        )

      const data = this.getData()
    
      const columns = [{
        Header: 'Rank',
        accessor: 'rank', // String-based value accessors!
        width: 50
      }, {
        Header: 'Name',
        width: 250,
        height: 50,
        Cell: row => {
          return <div>
              <span width={34}>
                <ul className="collection">
                  <li className="collection-item avatar center">
                      <StatImage entity={row.original} />
                      <span className="title">{row.original.name}</span>
                  </li>
                </ul>
              </span>
            </div>
        }
      }, {
        Header: 'Price',
        width: 150,
        Cell: row => {
          return <div className="center">${row.original.price.toFixed(3)}</div>
        }
      },
      {
        Header: 'Hour Performance',
        width: 150,
        Cell: row => {
          return <div className="center">
            <span className={`${row.original.lastChange > 0 ? "green-text text-darken-4" : "red-text text-darken-4"}`}>
              {row.original.lastChange > 0 && "+"}{row.original.lastChange.toFixed(3)}%
              <span>
              {(row.original.lastChange > 0 ?
                <i className="material-icons green-text text-lighten-4">call_made</i> :
                <i className="material-icons red-text text-lighten-4">call_received</i>
              )}
              </span>
            </span>
          </div>
        }
      },
      // {
      //   Header: 'Performance',
      //   width: 250,
      //   Cell: row => {
      //     return <div className="center">
      //           <ul className="collection">
      //             <li className="collection-item">
      //               <TableGraph data={row.original}/>
      //             </li>
      //           </ul>
      //     </div>
      //   }
      // }
    ]
    
      return <ReactTable
        data={data}
        columns={columns}
      />
    }
}
