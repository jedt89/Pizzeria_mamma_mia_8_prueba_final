import { default as axios } from 'axios';

const URL_BASE = 'http://localhost:5000/api/pizzas';
const URL_CHECKOUTS = 'http://localhost:5000/api/checkouts';

export const getPizzas = async () => {
  try {
    const response = await axios.get(URL_BASE);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error");
  }
};

export const getPizza = async (id) => {
  try {
    const response = await axios.get(`${URL_BASE}/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error");
  }
};

export const checkoutCart = async (cart, tokenValue) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenValue}`,
    }
  };
  try {
    const response = await axios.post(`${URL_CHECKOUTS}`, cart, config);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error");
  }
};