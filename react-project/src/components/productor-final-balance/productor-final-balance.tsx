import axios from 'axios'
import { useMemo, useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import './productor-final-balance.css'
import NavBar from '../nav/nav-bar'
import Table from '../table/table'
import { TransactionsEntity } from '../../entity/transactions-entity'
import { Config } from '../../config'
import convertCentavosReal from '../helpers/helper'

function ProductorFinalBalance() {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const result = await axios(Config.API_URL + 'producer-final-balance')
      setData(result.data.transactions)
    })()
  }, [])

  const cols = useMemo<ColumnDef<TransactionsEntity>[]>(
    () => [
      {
        header: 'Tipo de venda',
        cell: 'Venda produtor',
      },
      {
        header: 'Saldo Final do Produtor',
        cell: (row) => convertCentavosReal(row.renderValue()),
        accessorKey: 'sale_productor_sum',
      },
    ],
    []
  )

  return (
    <>
      <NavBar />
      <div className="transactions">
        <h1>Saldo Final do Produtor</h1>

        {data.length > 0 ? (
          <Table
            data={data}
            columns={cols}
            showNavigation={false}
            showGlobalFilter={false}
            filterFn={false}
          />
        ) : (
          <h1>Não há dados do saldo final do produtor no momento</h1>
        )}
      </div>
    </>
  )
}
export default ProductorFinalBalance
