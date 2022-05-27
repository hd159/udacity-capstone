import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/categories`;

export const createCategory = async (category) => {
    await axios.post(`${BASE_URL}`, category);
};

export const deleteCategory = async (categoryId) => {
    await axios.delete(`${BASE_URL}/${categoryId}`);
};

export const updateCategory = async (category, categoryId) => {
    await axios.patch(`${BASE_URL}/${categoryId}`, category);
};


export const getCategories = async () => {
    const categories = await axios.get(`${BASE_URL}`);
    return categories.data.categories
};