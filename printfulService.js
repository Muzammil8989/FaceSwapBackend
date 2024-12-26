// backend/printfulService.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const PRINTFUL_ACCESS_TOKEN = 'XGzhUZbJCiEe1FbDOz74TWXsPcDFyMNmvr4m6Ne6';
const PRINTFUL_BASE_URL = 'https://api.printful.com';

const printfulAxios = axios.create({
    baseURL: PRINTFUL_BASE_URL,
    headers: {
        'Authorization': `Bearer ${PRINTFUL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
    }
});

// Function to create a Printful product using mockup generator
export const createPrintfulProduct = async (imageUrl, productType) => {
    try {
        const response = await printfulAxios.post('/mockup-generator/create-task', {
            variant_ids: [productType], // e.g., 4011 for t-shirt
            format: 'png',
            image_url: imageUrl
        });
        return response.data;
    } catch (error) {
        console.error('Error creating Printful product:', error.response?.data || error.message);
        throw error;
    }
};

// Function to add a product to the store
export const addProductToStore = async (storeId, productData) => {
    try {
        const response = await printfulAxios.post(`/store/products`, productData);
        console.log('Product added to Printful store:', response);
        
        return response.data;
    } catch (error) {
        console.error('Error adding product to Printful store:', error.response?.data || error.message);
        // throw error;
    }
};

// Function to create a Printful order
export const createPrintfulOrder = async (orderData) => {
    try {
        console.log('Creating Printful order:', orderData.items[0]?.files);
        const response = await printfulAxios.post('/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating Printful order:', error.response?.data || error.message);
        throw error;
    }
};


// Function to fetch Printful products
export const getPrintfulProducts = async () => {
    try {
        const response = await printfulAxios.get('/store/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching Printful products:', error.response?.data || error.message);
        throw error;
    }
};
export const uploadFileToPrintful = async (fileUrl, fileName) => {
    try {
      const payload = { url: fileUrl };
      if (fileName) payload.filename = fileName;
      
      const response = await printfulAxios.post('/files', payload);
      return response.data; // Contains { code, result, extra }
    } catch (error) {
      console.error('Error uploading file to Printful:', error.response?.data || error.message);
      throw error;
    }
  };

  export const getFileInfoFromPrintful = async (fileId) => {
    try {
      // GET /files/{file_id}
      const response = await printfulAxios.get(`/files/${fileId}`);
      // response.data => { code, result, extra }
      console.log('File info from Printful:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error retrieving file info from Printful:', error.response?.data || error.message);
      throw error;
    }
  };
  

// Function to fetch store information
export const getStoreInfo = async () => {
    try {
        const response = await printfulAxios.get('/stores');
        return response.data;
    } catch (error) {
        console.error('Error fetching store information:', error.response?.data || error.message);
        throw error;
    }
};
