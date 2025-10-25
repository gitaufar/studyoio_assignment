import React, { useState, useEffect } from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  data: any[];
  columns: Column[];
  onEdit?: (row: any) => void;
  onDelete?: (id: string) => void;
  onBulkDelete?: (ids: string[]) => void;
  emptyMessage?: string;
  selectable?: boolean;
}

export const Table: React.FC<TableProps> = ({ 
  data, 
  columns, 
  onEdit, 
  onDelete, 
  onBulkDelete,
  emptyMessage,
  selectable = false 
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Reset selection when data changes
  useEffect(() => {
    setSelectedIds([]);
  }, [data]);

  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map(row => row.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    
    // Call parent's onBulkDelete directly - modal will be shown in parent component
    onBulkDelete?.(selectedIds);
    setSelectedIds([]);
  };

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-12 text-center border dark:border-dark-border">
        <svg className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No data</h3>
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage || 'Click add button to create new data'}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-md overflow-hidden border dark:border-dark-border">
      {/* Bulk Delete Toolbar */}
      {selectable && selectedIds.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-b dark:border-dark-border px-6 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
            {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete {selectedIds.length} Item{selectedIds.length > 1 ? 's' : ''}
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-dark-border">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === data.length && data.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th key={column.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {column.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-dark-border">
            {data.map((row, index) => (
              <tr 
                key={row.id || index} 
                className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  selectedIds.includes(row.id) ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                }`}
              >
                {selectable && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => toggleSelect(row.id)}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-2">
                      {onEdit && (
                        <button 
                          onClick={() => onEdit(row)} 
                          className="text-secondary hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          onClick={() => onDelete(row.id)} 
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
