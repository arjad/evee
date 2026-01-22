import { Link } from "react-router-dom";
export const BatchStats = [
  { label: 'Total Batches', val: 66, color: 'emerald' },
  { label: 'QC Pending', val: 'amber' },
  { label: 'In Transit', val: 'blue' },
  { label: 'Rejected', val: 'rose' },
];
export const DemandStats = [
  { label: 'Total Batches', val: 66, color: 'emerald' },
  { label: 'QC Pending', val: 'amber' },
  { label: 'In Transit', val: 'blue' },
  { label: 'Rejected', val: 'rose' },
];
export const MOCK_SALES = [
  {
    id: 'SL-001',
    customer: 'Alpha Traders',
    invoiceNo: 'INV-1201',
    serviceCenter: 'Karachi',
    amount: 125000,
    status: 'PAID',
    createdAt: '2026-01-21',
  },
  {
    id: 'SL-002',
    customer: 'Beta Stores',
    invoiceNo: 'INV-1202',
    serviceCenter: 'Lahore',
    amount: 98000,
    status: 'PENDING',
    createdAt: '2026-01-20',
  },
  {
    id: 'SL-003',
    customer: 'Gamma Enterprises',
    invoiceNo: 'INV-1203',
    serviceCenter: 'Islamabad',
    amount: 154500,
    status: 'OVERDUE',
    createdAt: '2026-01-19',
  },
  {
    id: 'SL-004',
    customer: 'Delta Mart',
    invoiceNo: 'INV-1204',
    serviceCenter: 'Karachi',
    amount: 67000,
    status: 'PAID',
    createdAt: '2026-01-18',
  },
];

export const BATCHES = [
  { id: 'B-1001', batchNumber: 'LOT-2024a', arrivalDate: '2024-05-20', productName: 'High-Tensile Steel Rods', sku: 'ST-992', quantity: 1200, unit: 'Units', status: "ARRIVED", warehouseLocation: 'ZONE-A1' },
  { id: 'B-1002', batchNumber: 'LOT-2024-002', arrivalDate: '2024-05-21', productName: 'Premium Resin Pellets', sku: 'RS-442', quantity: 500, unit: 'Kg', status: "IN_TRANSIT", warehouseLocation: 'BAY-04' },
  { id: 'B-1003', batchNumber: 'LOT-2024-003', arrivalDate: '2024-05-19', productName: 'Industrial Sealant X', sku: 'SL-001', quantity: 85, unit: 'Barrels', status: "PENDING", warehouseLocation: 'LAB-SEC' },
  { id: 'B-1004', batchNumber: 'LOT-2024-004', arrivalDate: '2024-05-22', productName: 'Aluminum Sheets', sku: 'AL-550', quantity: 3000, unit: 'Sheets', status: "ARRIVED", warehouseLocation: 'ZONE-C2' },
  { id: 'B-1005', batchNumber: 'LOT-2024-005', arrivalDate: '2024-05-20', productName: 'Eco-Fiber Padding', sku: 'FB-221', quantity: 250, unit: 'Bales', status: "Received", warehouseLocation: 'QUARANTINE' },
  { id: 'B-1006', batchNumber: 'LOT-2024-006', arrivalDate: '2024-05-23', productName: 'Circuit Board Assemblies', sku: 'CB-900', quantity: 5000, unit: 'Pcs', status: "Received", warehouseLocation: 'ZONE-E5' },
];

export const MOCK_DEMANDS = [
  {
    id: 'DM-001',
    title: 'Raw Material Procurement',
    createdBy: 'Admin',
    serviceCenter: 'Karachi',
    status: 'PENDING',
    createdAt: '2026-01-21',
  },
  {
    id: 'DM-002',
    title: 'Packaging Box Order',
    createdBy: 'Operations',
    serviceCenter: 'Lahore',
    status: 'DISPATCHED',
    createdAt: '2026-01-20',
  },
  {
    id: 'DM-003',
    title: 'Label Printing Request',
    createdBy: 'Marketing',
    serviceCenter: 'Islamabad',
    status: 'RECEIVED',
    createdAt: '2026-01-19',
  },
  {
    id: 'DM-004',
    title: 'Inventory Restock',
    createdBy: 'Warehouse',
    serviceCenter: 'Karachi',
    status: 'PENDING',
    createdAt: '2026-01-18',
  },
];

 export const Product_Data = [
    {
      id: 1,
      picture: 'https://picsum.photos/50?random=2',
      sku: 'INV-001',
      item: 'Ethernet Hub v4',
      category: 'Hardware',
      manager: 'Sarah Chen',
      size: "samll",
      modal: 'Low',
      unit_price: '200',
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
export const mockClaims = [
  {
    id: "CLM-1001",
    description: "Faulty Battery Connector",
    status: "IN_REVIEW",
    date: "2026-01-21",
    serviceCenter: "Karachi Central",
    productImage: "https://picsum.photos/400/300?1",

    claimDate: "2026-01-22",
    isApproved: true,
    approvedBy: "Service Manager Karachi",

    products: [
      { name: "EVEE Battery Pack", quantity: 1, price: 45000 },
      { name: "Motor Controller", quantity: 2, price: 12000 },
    ],
  },
  {
    id: "CLM-1002",
    description: "Cancelled order due to delay",
    status: "OPEN",
    date: "2026-01-20",
    serviceCenter: "Lahore East",
    productImage: "https://picsum.photos/400/300?2",

    claimDate: "2026-01-20",
    isApproved: false,
    approvedBy: null,

    products: [
      { name: "EVEE Charger", quantity: 1, price: 18000 },
    ],
  },
];


//// columns ////
export const Demand_columns = [
  { key: 'id', header: 'Demand ID', sortable: true },
  { key: 'title', header: 'Title', sortable: true },
  { key: 'createdBy', header: 'Created By', sortable: true },
  { key: 'serviceCenter', header: 'Service Center', sortable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: val => (
      <span
        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
          val === 'PENDING'
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : val === 'DISPATCHED'
            ? 'bg-blue-50 text-blue-700 border-blue-200'
            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
        }`}
      >
        {val}
      </span>
    ),
  },
  { key: 'createdAt', header: 'Date', sortable: true },

  {
    key: 'actions',
    header: 'Actions',
    render: () => (
<Link
to={`/demands/view`} // or your dynamic view path
className="px-3 py-1 text-xs font-bold border border-emerald-600 text-emerald-700 rounded-lg hover:bg-emerald-50"
>
View Details
</Link>
    ),
  },
];


export const Batch_columns = [
  { key: 'batchNumber', header: 'Batch ID', sortable: true },
  { key: 'productName', header: 'Product Name', sortable: true, render: (val, item) => (
    <div>
      <div className="font-bold text-slate-900">{val}</div>
      <div className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">{item.sku}</div>
    </div>
  )},
  { key: 'arrivalDate', header: 'Arrival Date', sortable: true },
  { key: 'quantity', header: 'Quantity', sortable: true, render: (val, item) => (
    <div className="font-black text-slate-800">
      {val.toLocaleString()} <span className="text-[10px] font-bold text-slate-400 uppercase">{item.unit}</span>
    </div>
  )},
  { key: 'Price', header: 'Unit Price', sortable: true, render: val => (
    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">{val}</span>
  )},
  { key: 'status', header: 'Status', sortable: true, render: val => {
      const styles = {
        ARRIVED: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        IN_TRANSIT: 'bg-blue-50 text-blue-700 border-blue-100',
        QC_PENDING: 'bg-amber-50 text-amber-700 border-amber-100',
        REJECTED: 'bg-rose-50 text-rose-700 border-rose-100',
        STORED: 'bg-slate-50 text-slate-700 border-slate-100',
      };
      return (
        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase border ${styles[val]}`}>
          {val.replace('_', ' ')}
        </span>
      );
    }
  },
];

export const Product_columns = [
  { key: 'picture', header: 'Image', sortable: false }, // <- add this
  { key: 'sku', header: 'SKU Code', sortable: true },
  { key: 'item', header: 'Item Name', sortable: true },
  { key: 'category', header: 'Category', sortable: true },
  { key: 'size', header: 'Size', sortable: true },
  { key: 'modal', header: 'Modal', sortable: true },
  { key: 'unit_price', header: 'Unit Price', sortable: true },

];


