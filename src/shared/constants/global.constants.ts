// Export global constants
export const API_PREFIX = '/api/v1';

// Config
require('dotenv').config();

export const JWT_SECRET = process.env.JWT_SIGNATURE;

export enum Roles {
  SELLER = 'seller',
  BUYER = 'buyer',
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const DEFAULT_PAGE_LIMIT = 10;
export const MAX_PAGE_LIMIT = 1000;

export const DEFAULT_SORT_BY = 'id';
