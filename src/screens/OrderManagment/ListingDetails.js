const orderList = [
  {
    orderNumber: '3287402473',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    itemName: '19 kg LPG Cyl.',
    itemQty: '20',
    consumerNo: '328474823',
    orderValue: '7,000',
    deliveryAt: 'Aliganj',
    orderBy: 'AshokSati',
  },
  {
    orderNumber: '3287402473',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    itemName: '19 kg LPG Cyl.',
    itemQty: '20',
    consumerNo: '328474823',
    orderValue: '7,000',
    deliveryAt: 'Aliganj',
    orderBy: 'AshokSati',
  },
  {
    orderNumber: '3287402473',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    itemName: '19 kg LPG Cyl.',
    itemQty: '20',
    consumerNo: '328474823',
    orderValue: '7,000',
    deliveryAt: 'Aliganj',
    orderBy: 'AshokSati',
  },
];

const leakageList = [
  {
    lekage_id: 'LEA-1020-003',
    item_name: '19 kg LPG Cyl.',
    customer_name: 'Saurabh Sharma',
    qty: '8 Cyl.',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    isAccepted: false,
  },
  {
    lekage_id: 'LEA-1020-003',
    item_name: '19 kg LPG Cyl.',
    customer_name: 'Saurabh Sharma',
    qty: '8 Cyl.',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    isAccepted: false,
  },
  {
    lekage_id: 'LEA-1020-003',
    item_name: '19 kg LPG Cyl.',
    customer_name: 'Saurabh Sharma',
    qty: '8 Cyl.',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    isAccepted: false,
  },
];

const paymentList = [
  {
    payment_no: 'PAY-020-003',
    amount: '5,000',
    customer_namr: 'Moti Mahal',
    payment_perod: '01 May-31 May',
    isAccepted: false,
    payment_satus: 'paid',
  },
  {
    payment_no: 'PAY-020-003',
    amount: '5,000',
    customer_namr: 'Moti Mahal',
    payment_perod: '01 May-31 May',
    isAccepted: true,
    payment_satus: 'paid',
  },
  {
    payment_no: 'PAY-020-003',
    amount: '5,000',
    customer_namr: 'Moti Mahal',
    payment_perod: '01 May-31 May',
    isAccepted: false,
    payment_satus: 'Monthly',
  },
];

const defectList = [
  {
    defective_id: 'DEF-1020-003',
    item_name: '19 kg LPG Cyl.',
    customer_name: 'Saurabh Sharma',
    qty: '8 Cyl.',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    exchange_from: 'Aliganj',
    isAccepted: true,
  },
  {
    defective_id: 'DEF-1020-003',
    item_name: '19 kg LPG Cyl.',
    customer_name: 'Saurabh Sharma',
    qty: '8 Cyl.',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    exchange_from: 'Aliganj',
    isAccepted: true,
  },
  {
    defective_id: 'DEF-1020-003',
    item_name: '19 kg LPG Cyl.',
    customer_name: 'Saurabh Sharma',
    qty: '8 Cyl.',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    exchange_from: 'Aliganj',
    isAccepted: false,
  },
];


const TripList = [
  {
    trip_name: 'West Street Road',
    trip_date: '28 May',
    trip_id: 'TRI-1020-003',
    trip_time: '9:00 AM',
    driver: 'Sham Bihari',
    start_godown: 'Aliganj',
    end_godown: 'Aliganj',
    assinged_vehicle: 'DL 4S AQ 7596',
    isAccepted: true,
    status: 'Internal'
    
  },
  {
    trip_name: 'West Street Road',
    trip_date: '28 May',
    trip_id: 'TRI-1020-003',
    trip_time: '9:00 AM',
    driver: 'Sham Bihari',
    start_godown: 'Aliganj',
    end_godown: 'Aliganj',
    assinged_vehicle: 'DL 4S AQ 7596',
    isAccepted: false,
    status: 'Internal'
    
  },
  {
    trip_name: 'West Street Road',
    trip_date: '28 May',
    trip_id: 'TRI-1020-003',
    trip_time: '9:00 AM',
    driver: 'Sham Bihari',
    start_godown: 'Aliganj',
    end_godown: 'Aliganj',
    assinged_vehicle: 'DL 4S AQ 7596',
    isAccepted: true,
    status: 'External'
    
  }
];


const imbalanceList = [
  {
    imbalance_no: 'IMB-1020-003',
    item_name: '19 kg LPG Cyl.',
    customer_name: 'Saurabh Sharma',
    qty: '8 Cyl.',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    pickup: 'Aliganj',
    isAccepted: true,
  },
  {
    imbalance_no: 'IMB-1020-004',
    item_name: '19 kg LPG Cyl.',
    customer_name: 'Saurabh Sharma',
    qty: '8 Cyl.',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    pickup: 'Aliganj',
    isAccepted: false,
  },
  {
    imbalance_no: 'IMB-1020-005',
    item_name: '19 kg LPG Cyl.',
    customer_name: 'Saurabh Sharma',
    qty: '8 Cyl.',
    orderTime: '7:00 AM - 9:00 AM',
    orderDate: '26 Apr',
    pickup: 'Aliganj',
    isAccepted: true,
  },
];


module.exports = {
  orderList,
  imbalanceList,
  leakageList,
  paymentList,
  defectList,
  TripList
};
