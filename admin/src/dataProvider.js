import { fetchUtils } from 'react-admin';
import queryString from 'query-string';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  if (token) {
    options.headers.set('Authorization', `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };

    const url = `${API_URL}/${resource}?${queryString.stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (resource === 'products' && json.products) {
        return {
          data: json.products,
          total: json.pagination?.total || json.products.length,
        };
      }
      
      if (Array.isArray(json)) {
        return {
          data: json,
          total: json.length,
        };
      }

      return {
        data: json.data || [],
        total: json.total || 0,
      };
    });
  },

  getOne: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      id: params.ids,
    };
    const url = `${API_URL}/${resource}?${queryString.stringify(query)}`;
    return httpClient(url).then(({ json }) => {
      if (resource === 'products' && json.products) {
        return { data: json.products };
      }
      return { data: json };
    });
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      [params.target]: params.id,
      _sort: field,
      _order: order,
      _start: (page - 1) * perPage,
      _end: page * perPage,
    };
    const url = `${API_URL}/${resource}?${queryString.stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (resource === 'products' && json.products) {
        return {
          data: json.products,
          total: json.pagination?.total || json.products.length,
        };
      }
      return {
        data: json,
        total: json.length,
      };
    });
  },

  update: (resource, params) => {
    const { category, orderItems, children, parent, products, _count, createdAt, updatedAt, viewCount, ...cleanData } = params.data;
    return httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(cleanData),
    }).then(({ json }) => ({ data: json }));
  },

  updateMany: (resource, params) => {
    return Promise.all(
      params.ids.map(id =>
        httpClient(`${API_URL}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        })
      )
    ).then(responses => ({ data: responses.map(({ json }) => json.id) }));
  },

  create: (resource, params) =>
    httpClient(`${API_URL}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  deleteMany: (resource, params) => {
    return Promise.all(
      params.ids.map(id =>
        httpClient(`${API_URL}/${resource}/${id}`, {
          method: 'DELETE',
        })
      )
    ).then(responses => ({ data: params.ids }));
  },
};

export default dataProvider;
