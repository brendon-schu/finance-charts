import { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";

const Table = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      String(row.name).toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  const columns = useMemo(
    () => [
        { header: "Product",    accessorKey: "product", },
        { header: "SKU",        accessorKey: "sku", 
            cell: ({ row }) => {
                return (
                    <div className="bg-gray-600 rounded-md pl-2">
                    {row.original.sku}
                    </div>
                );
            },
        },
        { header: "Sales",      accessorKey: "sales", },
        { header: "Stock Qty",  accessorKey: "stock_qty",},
        { header: "Gross",      accessorKey: "gross", 
            cell: ({ row }) => {
                return ( <div className="text-right"> {row.original.gross} </div>);
            },
            header: () => <div style={{ textAlign: 'right' }}>Gross</div>,
        },
        { header: "Net",        accessorKey: "net", 
            cell: ({ row }) => {
                return ( <div className="text-right"> {row.original.net} </div>);
            },
            header: () => <div style={{ textAlign: 'right' }}>Net</div>,
        },
        { header: "Trend",      accessorKey: "trend", 
            cell: ({ row }) => {
                return ( <div className="text-right"> {row.original.net} </div>);
            },
            header: () => <div style={{ textAlign: 'right' }}>Net</div>,
        },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div>
      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border border-gray-500 rounded"
      />

      {/* Table */}
      <table className="w-full border border-gray-500">
        <thead className="bg-gray-900 text-white text-left border-b border-gray-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="p-2 cursor-pointer"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="odd:bg-gray-700 even:bg-gray-800 border-b border-gray-600">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

