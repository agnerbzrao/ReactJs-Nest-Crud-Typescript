import axios from 'axios'
import { useMemo, useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import './affiliate-final-balance.css'
import NavBar from '../nav/nav-bar'
import Table from '../table/table'
import { TransactionsEntity } from '../../entity/transactions-entity'
import { Config } from '../../config'
import { filterFns } from '../table/filter'

function AffiliateFinalBalance() {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const result = await axios(Config.API_URL+'affiliate-final-balance')
      setData(result.data.transactions)
    })()
  }, [])


  const convertCentavosReal = (centavos): Number => {
    const numberDivided = Number(centavos) / 100
    return numberDivided.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }
  const cols = useMemo<ColumnDef<TransactionsEntity>[]>(
    () => [
      {
        header: 'Nome do Afiliado',
        cell: (row) => row.renderValue(),
        accessorKey: 'seller',
      },
      {
        header: 'Saldo Final do Afiliado',
        cell: (row) => convertCentavosReal(row.renderValue()),        
        accessorKey: 'sale_affiliate_sum',
      },
    ],
    []
  )

  return (
    <>
      <NavBar />
      <div className="transactions">
        <h1>Saldo Final de Afiliados</h1>

        {data.length > 0 ? (
          <Table
            data={data}
            columns={cols}
            showNavigation={false}
            showGlobalFilter={true}
            filterFn={filterFns.contains}
          />
        ) : (
          <h1>Não há dados do saldo final de afiliados no momento</h1>
        )}
      </div>
    </>
  )
}
export default AffiliateFinalBalance
