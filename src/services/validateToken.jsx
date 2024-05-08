import React from 'react'

import { Navigate } from 'react-router-dom';

import axios from "axios";
import GetId from "./getId";

export default async function validateToken(){
    let isValid = false;

    // Parâmetros da Requisição
    const token = localStorage.getItem("token");
    const userId = GetId(token);
    const url = `https://listacontatos-bicw.onrender.com/validarToken`;
    const header = { headers:{'x-access-token': `${token}2`}, }

    const response = await axios.post(url, {},header);
    const error = response.data.error;
    
    if(error === false){ isValid = false }
    else if(response.data.result[0].status){  isValid = true }
    else{ isValid = false}

    console.log(isValid)
    return isValid
}