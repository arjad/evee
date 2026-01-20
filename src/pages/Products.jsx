import React, { useState } from 'react';
import DataTable from '../components/DataTable';

const Products = () => {
  const columns = [
    { key: 'picture', header: 'Image', sortable: false }, // <- add this
    { key: 'sku', header: 'SKU Code', sortable: true },
    { key: 'item', header: 'Item Name', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'manager', header: 'In Charge', sortable: true },
    { key: 'stockLevel', header: 'Units Left', sortable: true },
    { key: 'priority', header: 'Fulfillment', sortable: true },
    { key: 'lastUpdated', header: 'Last Sync', sortable: true },
  ];
  
  const initialData = [
    {
      id: 1,
      picture: 'https://picsum.photos/50?random=2',
      sku: 'INV-001',
      item: 'Ethernet Hub v4',
      category: 'Hardware',
      manager: 'Sarah Chen',
      stockLevel: 125,
      priority: 'Low',
      lastUpdated: '2h ago',
    },
    {
      id: 2,
      picture: 'https://picsum.photos/50?random=2',
      sku: 'INV-002',
      item: 'Fiber Patch Cable',
      category: 'Cabling',
      manager: 'Mark Wilson',
      stockLevel: 12,
      priority: 'High',
      lastUpdated: '10m ago',
    },
  ];
  

  return (
    <div className="space-y-6">
      <header>...Your header JSX...</header>
      <DataTable columns={columns} data={initialData} />
      <footer>...Your footer JSX...</footer>
    </div>
  );
};

export default Products;
