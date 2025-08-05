import React from 'react';
import { motion } from 'framer-motion';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

export interface Column<T> {
  key: keyof T;
  header: string;
  width?: number;
  minWidth?: number;
  flex?: number;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  sortable?: boolean;
  responsive?: boolean; // Hide on smaller screens
}

export interface VirtualTableProps<T> {
  data: T[];
  columns: Column<T>[];
  height?: number;
  itemHeight?: number;
  onRowClick?: (item: T) => void;
  selectedId?: string;
  className?: string;
  sortConfig?: {
    key: keyof T;
    direction: 'asc' | 'desc';
  };
  onSort?: (key: keyof T) => void;
}

const VirtualTable = <T extends { id: string }>({
  data,
  columns,
  height = 600,
  itemHeight = 60,
  onRowClick,
  selectedId,
  className = '',
  sortConfig,
  onSort,
}: VirtualTableProps<T>) => {
  const getSortIcon = (columnKey: keyof T) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <FaSort className="theme-text-muted" />;
    }
    return sortConfig.direction === 'asc' 
      ? <FaSortUp className="text-primary-gold" />
      : <FaSortDown className="text-primary-gold" />;
  };

  return (
    <div
      className={`bg-background-card rounded-2xl overflow-hidden theme-transition border border-border-secondary shadow-xl ${className}`}
    >
      {/* Header */}
      <div className='flex bg-gradient-to-r from-background-secondary to-background-card border-b border-border-secondary theme-transition overflow-x-auto sticky top-0 z-10'>
        {columns.map((column) => (
          <div
            key={String(column.key)}
            className={`px-4 py-4 text-sm font-semibold text-primary-gold truncate flex items-center justify-between theme-transition flex-shrink-0 ${
              column.sortable ? 'cursor-pointer hover:bg-background-card hover:text-yellow-300 transition-all duration-200' : ''
            } ${
              column.responsive ? 'hidden md:flex' : 'flex'
            }`}
            style={{ 
              width: column.width,
              minWidth: column.minWidth,
              flex: column.flex
            }}
            onClick={() => column.sortable && onSort?.(column.key)}
          >
            <span className="truncate">{column.header}</span>
            {column.sortable && (
              <div className="ml-2 flex-shrink-0">
                {getSortIcon(column.key)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Table Body */}
      <div className="overflow-y-auto" style={{ height }}>
        {data.map((item, index) => {
          const isSelected = selectedId === item.id;
          
          return (
            <motion.div
              key={item.id}
              className={`flex border-b border-border-secondary hover:bg-background-secondary transition-all duration-200 cursor-pointer theme-transition overflow-x-auto ${
                isSelected ? 'bg-primary-gold bg-opacity-20 border-l-4 border-l-primary-gold' : ''
              }`}
              onClick={() => onRowClick?.(item)}
              whileHover={{ 
                backgroundColor: 'rgba(255, 215, 0, 0.05)',
                x: 4
              }}
              layout
            >
              {columns.map((column) => (
                <div
                  key={String(column.key)}
                  className={`px-4 py-4 text-sm theme-text-secondary truncate flex-shrink-0 ${
                    column.responsive ? 'hidden md:block' : 'block'
                  }`}
                  style={{ 
                    width: column.width,
                    minWidth: column.minWidth,
                    flex: column.flex
                  }}
                >
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key] || '')}
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="theme-text-muted text-lg">No data available</p>
            <p className="theme-text-muted text-sm mt-2">Try adjusting your filters or search terms</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualTable;
