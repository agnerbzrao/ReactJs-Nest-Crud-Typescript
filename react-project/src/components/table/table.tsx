import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
  FilterFns,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import './table.css'

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number
  onChange: (val: string | number) => void
  debounceTime?: number
}
interface ReactTableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T>[]
  showNavigation?: boolean
  showGlobalFilter?: boolean
  filterFn?: FilterFns
}
export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounceTime = 300,
  ...props
}: Props) => {
  const [value, setValue] = useState(initialValue)

  // setValue if any initialValue changes
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  // debounce onChange — triggered on every keypress
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounceTime)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, onChange, debounceTime])

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
/* eslint-disable @typescript-eslint/no-explicit-any */

export const Table = <T extends object>({
  data,
  columns,
  showNavigation = true,
  showGlobalFilter = false,
}: ReactTableProps<T>) => {
  const [globalFilter, setGlobalFilter] = useState('')
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  })

  return (
    <>
      {showGlobalFilter ? (
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="input-filter"
          placeholder="Procure em todas as colunas"
        />
      ) : null}
      <table className="table-style">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showNavigation ? (
        <>
          <div className="pagination-div">
            <button
              className="pagination"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {'<<'}
            </button>
            <button
              className="pagination"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {'<'}
            </button>
            <button
              className="pagination"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {'>'}
            </button>
            <button
              className="pagination"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {'>>'}
            </button>
            <span className="pagination">
              <div>Página</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </strong>
            </span>
            <span>
              | Ir para página:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Mostre os {pageSize} primeiros
                </option>
              ))}
            </select>
          </div>
        </>
      ) : null}
    </>
  )
}
export default Table
