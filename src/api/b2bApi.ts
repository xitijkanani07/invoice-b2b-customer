import { getJwtToken } from './jwtToken';
import { httpGet } from './http';

export type CustomersApiResponse = {
  data: Array<{
    _id: string;
    storeName: string;
    customerId: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  totalCount: number;
  page: number;
  limit: number;
  prev: number | null;
  next: number | null;
};

export type OrdersApiResponse = {
  customer: {
    _id: string;
    storeName: string;
    customerId: number;
    email: string;
    first_name: string;
    last_name: string;
    address: { city: string; province: string; country: string; _id: string };
  };
  orders: Array<{
    orderNum: string;
    shopifyOrderNum: string;
    invoiceDate: string;
    totalAmount: string;
    orderId: number;
    status: string;
    invoiceLink: string;
    isOrderCancelled: boolean;
    paymentStatus: string;
    paymentsProbability?: number | null;
  }>;
  totalCount: number;
  page: number;
  limit: number;
  prev: number | null;
  next: number | null;
};

export async function fetchB2BCustomersData(shopName: string, params: {
  page: number;
  limit: number;
  sortBy: 'first_name' | 'last_name' | 'email';
  orderBy: 'asc' | 'desc';
  searchEmail?: string;
  segment?: string;
}): Promise<CustomersApiResponse> {
  const token = await getJwtToken(shopName);
  return await httpGet<CustomersApiResponse>(
    '/api/b2bTesting/customers',
    {
      page: params.page,
      limit: params.limit,
      sortBy: params.sortBy,
      orderBy: params.orderBy,
      ...(params.searchEmail ? { searchEmail: params.searchEmail } : {}),
      ...(params.segment ? { segment: params.segment } : {}),
    },
    {
      Authorization: `${token}`,
      'x-access-token': token,
    },
  );
}

export async function fetchCustomerOrders(shopName: string, params: {
  customerId: string;
  page: number;
  limit: number;
  searchText?: string;
}): Promise<OrdersApiResponse> {
  const token = await getJwtToken(shopName);
  return await httpGet<OrdersApiResponse>(
    `/api/b2bTesting/customers/${encodeURIComponent(params.customerId)}/orders`,
    {
      customerId: params.customerId,
      page: params.page,
      limit: params.limit,
      ...(params.searchText ? { searchText: params.searchText } : {}),
    },
    {
      Authorization: `${token}`,
      'x-access-token': token,
    },
  );
}

