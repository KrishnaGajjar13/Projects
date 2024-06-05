const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

const existingApiUrl = 'https://5d76bf96515d1a0014085cf9.mockapi.io/product';

// Get all products
app.get('/products', async (req, res) => {
    try {
        const response = await axios.get(existingApiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const response = await axios.get(`${existingApiUrl}/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching product');
    }
});

// Add a new product (custom logic before forwarding)
app.post('/products', async (req, res) => {
    try {
        const newProduct = { ...req.body, customField: 'customValue' };
        const response = await axios.post(existingApiUrl, newProduct);
        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).send('Error adding product');
    }
});

// Update a product (custom logic before forwarding)
app.put('/products/:id', async (req, res) => {
    try {
        const updatedProduct = { ...req.body, lastUpdated: new Date() };
        const response = await axios.put(`${existingApiUrl}/${req.params.id}`, updatedProduct);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error updating product');
    }
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
    try {
        await axios.delete(`${existingApiUrl}/${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Error deleting product');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
