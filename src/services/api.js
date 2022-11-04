// import React, { Component } from "react";
import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';

export const addImage = async values => {
    const response = await axios.post('/images', values)
    return response.data;
}