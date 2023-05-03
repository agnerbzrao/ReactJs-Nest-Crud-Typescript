import axios from 'axios'
import { useMemo, useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table'

import './transactions.css'
import NavBar from '../nav/nav-bar'
import Table from '../table/table'
import { filterFns } from '../table/filter'

function Transactions() {
  //   // data state to store the TV Maze API data. Its initial value is an empty array
  //   const [data, setData] = useState([]);

  //   // Using useEffect to call the API once mounted and set the data
  //   useEffect(() => {
  //     (async () => {
  //       const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
  //       setData(result.data);
  //     })();
  //   }, []); 
  type Item = {
    id: number
    type_sale: string
    date_sale: string
    product: string
    value_sale: string
    seller: string
  }
  const convertIsoDateToBrazilianDate = (dateIso): string => {
    const getDate = dateIso.slice(0, 10).split('-')
    const getHours = dateIso.slice(11, 19).split(':')
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

  const convertCentavosReal = (centavos): Number => {
    const numberDivided = Number(centavos) / 100
    return numberDivided.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }
  const cols = useMemo<ColumnDef<Item>[]>(
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
  const dummyData = (): Item[] => {
    return [
      {
        id: 1,
        type_sale: '1',
        date_sale: '2022-01-15T19:20:30-03:00',
        product: 'CURSODEBEM-ESTAR',
        value_sale: '0000012750',
        seller: 'JOSE CARLOS',
      },
      {
        id: 2,
        type_sale: '1',
        date_sale: '2021-12-03T11:46:02-03:00',
        product: 'DOMINANDOINVESTIMENTOS',
        value_sale: '0000050000',
        seller: 'MARIA CANDIDA',
      },
      {
        id: 3,
        type_sale: '2',
        date_sale: '2022-01-16T14:13:54-03:00',
        product: 'CURSODEBEM-ESTAR',
        value_sale: '0000012750',
        seller: 'THIAGO OLIVEIRA',
      },
      {
        id: 4,
        type_sale: '4',
        date_sale: '2022-01-16T14:13:54-03:00',
        product: 'CURSODEBEM-ESTAR',
        value_sale: '0000004500',
        seller: 'THIAGO OLIVEIRA',
      },
      {
        id: 5,
        type_sale: '3',
        date_sale: '2022-01-16T14:13:54-03:00',
        product: 'CURSODEBEM-ESTAR',
        value_sale: '0000004500',
        seller: 'JOSE CARLOS',
      },
      {
        id: 6,
        type_sale: '1',
        date_sale: '2022-01-22T08:59:13-03:00',
        product: 'DOMINANDOINVESTIMENTOS',
        value_sale: '0000050000',
        seller: 'MARIA CANDIDA',
      },
      {
        id: 7,
        type_sale: '1',
        date_sale: '2022-02-01T23:35:43-03:00',
        product: 'DESENVOLVEDORFULLSTACK',
        value_sale: '0000155000',
        seller: 'ELIANA NOGUEIRA',
      },
      {
        id: 8,
        type_sale: '2',
        date_sale: '2022-02-03T17:23:37-03:00',
        product: 'DESENVOLVEDORFULLSTACK',
        value_sale: '0000155000',
        seller: 'CARLOS BATISTA',
      },
      {
        id: 9,
        type_sale: '2',
        date_sale: '2022-02-03T20:51:59-03:00',
        product: 'DESENVOLVEDORFULLSTACK',
        value_sale: '0000155000',
        seller: 'CAROLINA MACHADO',
      },
      {
        id: 10,
        type_sale: '2',
        date_sale: '2022-02-04T07:42:12-03:00',
        product: 'DESENVOLVEDORFULLSTACK',
        value_sale: '0000155000',
        seller: 'CELSO DE MELO',
      },
    ]
  }

  // most of table work acceptably well with this function

  return (
    <>
      <NavBar />
      <div className="transactions">
      <h1>Lista de todas as transações</h1>
        <Table
          data={dummyData()}
          columns={cols}
          showGlobalFilter
          filterFn={filterFns.contains}
        />
      </div>
    </>
  )
}
export default Transactions
