import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const fetchProductById = createAsyncThunk("products/fetchById", async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
});

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        productDetails: {},
        status: "idle",
        error: null,
        searchQuery: "",
        category: "",
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            .addCase(fetchProductById.pending, (state, action) => {
                const productId = action.meta.arg;
                if (!state.productDetails[productId]) {
                    state.productDetails[productId] = { loading: true, error: null, data: null };
                }
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.productDetails[action.payload.id] = { loading: false, error: null, data: action.payload };
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                const productId = action.meta.arg;
                state.productDetails[productId] = { loading: false, error: action.error.message, data: null };
            });
    },
});

export const { setSearchQuery, setCategory } = productsSlice.actions;
export default productsSlice.reducer;
