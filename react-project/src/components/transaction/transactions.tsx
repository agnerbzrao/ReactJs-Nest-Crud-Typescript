import axios from 'axios'
import { useMemo, useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import './transactions.css'
import NavBar from '../nav/nav-bar'
import Table from '../table/table'
import { filterFns } from '../table/filter'
import { TransactionsEntity } from '../../entity/transactions-entity'
import { Config } from '../../config'
import convertCentavosReal from '../helpers/helper'
function Transactions() {
    // data state to store the TV Maze API data. Its initial value is an empty array
    const [data, setData] = useState([]);

    // Using useEffect to call the API once mounted and set the data
    useEffect(() => {
      (async () => {
        const result = await axios(Config.API_URL);
        setData(result.data.transactions);
      })();


    }, []);

  const convertIsoDateToBrazilianDate = (dateIso: unknown): string => {
    const iso:string = String(dateIso);
    const getDate = iso.slice(0, 10).split('-')
    const getHours = iso.slice(11, 19).split(':')
    return (
      getDate[2] +
      '/' +
      getDate[1] +
      '/' +
      getDate[0] +
      ' ' +
      getHours[0] +
      ':' +
      getHours[1] +
      ':' +
      getHours[2]
    )
  }

  const cols = useMemo<ColumnDef<TransactionsEntity>[]>(
    () => [
      {
        header: 'Tipo de venda',
        cell: (row) => row.renderValue(),
        accessorKey: 'type_sale',
      },
      {
        header: 'Data de venda',
        cell: (row) => convertIsoDateToBrazilianDate(row.renderValue()),
        accessorKey: 'date_sale',
      },
      {
        header: 'Produto',
        cell: (row) => row.renderValue(),
        accessorKey: 'product',
      },
      {
        header: 'Valor da venda',
        cell: (row) => convertCentavosReal(row.renderValue()),
        accessorKey: 'value_sale',
      },
      {
        header: 'Vendedor',
        cell: (row) => row.renderValue(),
        accessorKey: 'seller',
      },
    ],
    []
  )

  return (
    <>
      <NavBar />
      <div className="transactions">
        <h1>Lista de todas as transações</h1>

        {data.length > 0 ? (
          <Table
            data={data}
            columns={cols}
            showGlobalFilter
            filterFn={filterFns.contains}
          />
        ) : (
          <h1>Não há dados de transações no momento</h1>
        )}
      </div>
    </>
  )
}
export default Transactions
