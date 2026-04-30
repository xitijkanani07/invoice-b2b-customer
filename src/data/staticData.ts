export const STORES = [
  'ih-xitij-test-1.myshopify.com',
  'ih-testmarch25-proba',
  'dev-probih3.myshopify.com',
] as const;

export type CustomerRow = {
  _id: string;
  storeName: string;
  customerId: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
};

export const CUSTOMERS_RESPONSE: {
  data: CustomerRow[];
  totalCount: number;
  page: number;
  limit: number;
  prev: number | null;
  next: number | null;
} = {
  data: [
    {
      _id: '69e9c089c4dc95de795d1447',
      storeName: 'dev-probih3.myshopify.com',
      customerId: 9058110210302,
      createdAt: '2026-04-23T06:47:37.447Z',
      email: 'brightfox9067@sharebot.net',
      first_name: 'cust1',
      last_name: '1',
      phone: null,
      updatedAt: '2026-04-23T06:47:37.447Z',
    },
    {
      _id: '69e9c088c4dc95de795d1446',
      storeName: 'dev-probih3.myshopify.com',
      customerId: 9058113192190,
      createdAt: '2026-04-23T06:47:36.311Z',
      email: 'kapree@beeinbox.edu.pl',
      first_name: 'cust2',
      last_name: '2',
      phone: null,
      updatedAt: '2026-04-23T06:47:36.311Z',
    },
  ],
  totalCount: 2,
  page: 1,
  limit: 25,
  prev: null,
  next: null,
};

export type CustomerDetail = {
  _id: string;
  storeName: string;
  customerId: number;
  address: {
    city: string;
    province: string;
    country: string;
    _id: string;
  };
  createdAt: string;
  customerSegment: string | null;
  email: string;
  first_name: string;
  last_name: string;
  ordersHistory: {
    total_days_for_payment: number;
    total_invoices: number;
    order_to_remove: number | null;
    last_order_number: number;
    first_order_number: number;
  };
  phone: string | null;
  updatedAt: string;
};

export type OrderRow = {
  orderNum: string;
  shopifyOrderNum: string;
  invoiceDate: string;
  totalAmount: string;
  customerName: string;
  customerEmailId: string;
  orderId: number;
  status: string;
  invoiceLink: string;
  isOrderCancelled: boolean;
  isPDFCreated: boolean;
  paymentStatus: string;
  fulfillmentStatus: string;
  paymentsProbability: number | null;
  b2bRiskScore: number | null;
};

export const CUSTOMER_ORDERS_RESPONSE: {
  customer: CustomerDetail;
  orders: OrderRow[];
  totalCount: number;
  page: number;
  limit: number;
  prev: number | null;
  next: number | null;
  metadata: Array<{ page: number; hasNext: boolean }>;
} = {
  customer: {
    _id: '69e9c089c4dc95de795d1447',
    storeName: 'dev-probih3.myshopify.com',
    customerId: 9058110210302,
    address: {
      city: 'Rancho Santa Margarita',
      province: 'California',
      country: 'United States',
      _id: '69e9c089493cc2a833263685',
    },
    createdAt: '2026-04-23T06:47:37.447Z',
    customerSegment: null,
    email: 'brightfox9067@sharebot.net',
    first_name: 'cust1',
    last_name: '1',
    ordersHistory: {
      total_days_for_payment: 0,
      total_invoices: 25,
      order_to_remove: null,
      last_order_number: 1032,
      first_order_number: 1003,
    },
    phone: null,
    updatedAt: '2026-04-23T06:47:37.447Z',
  },
  orders: [
    {
      orderNum: '#1032',
      shopifyOrderNum: '#1032',
      invoiceDate: '2026-04-06T07:08:05-04:00',
      totalAmount: '$32.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6671911813374,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6671911813374.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1031',
      shopifyOrderNum: '#1031',
      invoiceDate: '2026-04-03T01:02:50-04:00',
      totalAmount: '$749.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6668136874238,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6668136874238.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1030',
      shopifyOrderNum: '#1030',
      invoiceDate: '2026-04-03T00:55:57-04:00',
      totalAmount: '$749.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6668132385022,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6668132385022.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1029',
      shopifyOrderNum: '#1029',
      invoiceDate: '2026-04-03T00:24:34-04:00',
      totalAmount: '$32.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6668114755838,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6668114755838.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1028',
      shopifyOrderNum: '#1028',
      invoiceDate: '2026-04-03T00:21:32-04:00',
      totalAmount: '$32.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6668112953598,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6668112953598.pdf',
      isOrderCancelled: true,
      isPDFCreated: true,
      paymentStatus: 'pending',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: null,
      b2bRiskScore: null,
    },
    {
      orderNum: '#1027',
      shopifyOrderNum: '#1027',
      invoiceDate: '2026-04-03T00:19:27-04:00',
      totalAmount: '$32.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6668111741182,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6668111741182.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'paid',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: null,
      b2bRiskScore: null,
    },
    {
      orderNum: '#1026',
      shopifyOrderNum: '#1026',
      invoiceDate: '2026-04-03T00:16:28-04:00',
      totalAmount: '$32.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6668109611262,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6668109611262.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'paid',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: null,
      b2bRiskScore: null,
    },
    {
      orderNum: '#1025',
      shopifyOrderNum: '#1025',
      invoiceDate: '2026-04-02T11:51:27-04:00',
      totalAmount: '$749.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667379900670,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667379900670.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1024',
      shopifyOrderNum: '#1024',
      invoiceDate: '2026-04-02T11:47:20-04:00',
      totalAmount: '$749.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667374559486,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667374559486.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1023',
      shopifyOrderNum: '#1023',
      invoiceDate: '2026-04-02T11:46:26-04:00',
      totalAmount: '$32.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667373904126,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667373904126.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1022',
      shopifyOrderNum: '#1022',
      invoiceDate: '2026-04-02T11:44:58-04:00',
      totalAmount: '$5,125.00',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667372265726,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667372265726.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1021',
      shopifyOrderNum: '#1021',
      invoiceDate: '2026-04-02T11:43:04-04:00',
      totalAmount: '$749.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667370332414,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667370332414.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'paid',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: null,
      b2bRiskScore: null,
    },
    {
      orderNum: '#1018',
      shopifyOrderNum: '#1018',
      invoiceDate: '2026-04-02T06:06:10-04:00',
      totalAmount: '$5,125.00',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667090723070,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667090723070.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1017',
      shopifyOrderNum: '#1017',
      invoiceDate: '2026-04-02T05:37:17-04:00',
      totalAmount: '$5,125.00',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667073618174,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667073618174.pdf',
      isOrderCancelled: true,
      isPDFCreated: true,
      paymentStatus: 'pending',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: null,
      b2bRiskScore: null,
    },
    {
      orderNum: '#1016',
      shopifyOrderNum: '#1016',
      invoiceDate: '2026-04-02T05:36:20-04:00',
      totalAmount: '$5,125.00',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667072897278,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667072897278.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1015',
      shopifyOrderNum: '#1015',
      invoiceDate: '2026-04-02T05:31:20-04:00',
      totalAmount: '$5,125.00',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667069882622,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667069882622.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1014',
      shopifyOrderNum: '#1014',
      invoiceDate: '2026-04-02T05:30:02-04:00',
      totalAmount: '$949.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667068702974,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667068702974.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'paid',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: null,
      b2bRiskScore: null,
    },
    {
      orderNum: '#1013',
      shopifyOrderNum: '#1013',
      invoiceDate: '2026-04-02T05:29:16-04:00',
      totalAmount: '$949.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667068244222,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667068244222.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'paid',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: null,
      b2bRiskScore: null,
    },
    {
      orderNum: '#1012',
      shopifyOrderNum: '#1012',
      invoiceDate: '2026-04-02T05:28:40-04:00',
      totalAmount: '$949.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667067916542,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667067916542.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1011',
      shopifyOrderNum: '#1011',
      invoiceDate: '2026-04-02T05:14:02-04:00',
      totalAmount: '$749.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667060117758,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667060117758.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1010',
      shopifyOrderNum: '#1010',
      invoiceDate: '2026-04-02T05:08:37-04:00',
      totalAmount: '$749.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667057332478,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667057332478.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1009',
      shopifyOrderNum: '#1009',
      invoiceDate: '2026-04-02T05:05:17-04:00',
      totalAmount: '$949.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6667055792382,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6667055792382.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1008',
      shopifyOrderNum: '#1008',
      invoiceDate: '2026-04-01T00:13:16-04:00',
      totalAmount: '$32.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6665609216254,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6665609216254.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
    {
      orderNum: '#1007',
      shopifyOrderNum: '#1007',
      invoiceDate: '2026-04-01T00:08:01-04:00',
      totalAmount: '$32.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6665605775614,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6665605775614.pdf',
      isOrderCancelled: true,
      isPDFCreated: true,
      paymentStatus: 'pending',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: null,
      b2bRiskScore: null,
    },
    {
      orderNum: '#1006',
      shopifyOrderNum: '#1006',
      invoiceDate: '2026-04-01T00:05:50-04:00',
      totalAmount: '$32.95',
      customerName: 'Cu1 CU1',
      customerEmailId: 'brightfox9067@sharebot.net',
      orderId: 6665604595966,
      status: 'Sent',
      invoiceLink:
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/resources/dev-probih3.myshopify.com/PDF/6665604595966.pdf',
      isOrderCancelled: false,
      isPDFCreated: true,
      paymentStatus: 'Overdue',
      fulfillmentStatus: 'unfulfilled',
      paymentsProbability: 100,
      b2bRiskScore: 0,
    },
  ],
  totalCount: 28,
  page: 1,
  limit: 25,
  prev: null,
  next: 2,
  metadata: [{ page: 1, hasNext: true }],
};

