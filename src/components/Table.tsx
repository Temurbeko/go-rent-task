"use client";

import React, { useState } from "react";

type Column<T> = {
  header: string;
  accessor: keyof T;
  renderCell: (row: T) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
};

type TableProps<T> = {
  columns: Column<T>[];
  rows: T[];
};

function Table<T>({ columns, rows }: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc" | null;
  }>({
    key: null,
    direction: null,
  });

  const handleSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (sortConfig.key !== null) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead className="bg-gray-100 text-sm font-semibold text-gray-600">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="p-3 text-left cursor-pointer"
                onClick={() => column.sortable && handleSort(column.accessor)}
              >
                {column.header}
                {sortConfig.key === column.accessor
                  ? sortConfig.direction === "asc"
                    ? " ↑"
                    : " ↓"
                  : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {sortedRows.map((row, index) => (
            <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="p-3">
                  {column.renderCell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
