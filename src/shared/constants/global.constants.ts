// Export global constants
export const API_PREFIX = '/api/v1';

// Config
require('dotenv').config();

export const JWT_SECRET = process.env.JWT_SIGNATURE;

export enum Roles {
  SELLER = 'seller',
  BUYER = 'buyer',
}

export enum DepositAmount {
  FIVE = 5,
  TEN = 10,
  TWENTY = 20,
  FIFTY = 50,
  HUNDRED = 100,
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const DEFAULT_PAGE_LIMIT = 10;
export const MAX_PAGE_LIMIT = 1000;

export const DEFAULT_SORT_BY = 'id';
