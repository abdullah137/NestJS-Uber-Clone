import * as argon from 'argon2';
import * as crypto from 'crypto';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const genHash = async (password: string): Promise<string> => {
  return await argon.hash(password);
};

export const generateSalt = (): string => {
  return crypto.randomBytes(64).toString('hex');
};

export function generateRandomDigits(length: number): string {
  let result = '';
  const characters = '1234567890';
  const charactersLength = characters.length;

  // Ensure the length is always 6
  length = Math.max(4, length);

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // Trim or pad the reslengthult to ensure it has exactly 6 digits
  result = result.slice(0, 4).padStart(4, '0');
  return String(result);
}

export const generatePayment = async (payload: {
  name: string;
  amount: number;
  email: string;
  phone: string;
  type: string;
  id: string;
  ref: string;
}) => {
  try {
    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      {
        tx_ref: payload.ref,
        amount: payload.amount,
        currency: 'USD',
        redirect_url: `${process.env.FRONTEND_DOMAIN}/dashboard`,
        customer: {
          email: payload.email,
          name: payload.name,
          type: payload.type,
          id: payload.id,
          phonenumber: payload.phone,
        },
        customizations: {
          title: 'Flutterwave Standard Payment',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error(err.code);
    console.error(err.response.data);
  }
};


export const generateDollarPayment = async (payload: {
  name: string;
  amount: number;
  email: string;
  phone: string;
  type: string;
  id: string;
  ref: string;
}) => {
  try {
    const response = await axios.post(
      'https://api.flutterwave.com/v3/charges?type=ussd',
      {
        tx_ref: payload.ref,
        amount: payload.amount,
        currency: 'NGN',
        email: payload.email,
        name: payload.name,
        account_bank: "058",
        redirect_url: `${process.env.FRONTEND_DOMAIN}/dashboard`,
        customer: {
          email: payload.email,
          name: payload.name,
          type: payload.type,
          id: payload.id,
          phonenumber: payload.phone,
        },
        customizations: {
          title: 'Flutterwave Standard Payment',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error(err.code);
    console.error(err.response.data);
  }
};

export const generatePaymentReference = (): string => {
  return uuidv4(); // Generates a unique UUID
};
