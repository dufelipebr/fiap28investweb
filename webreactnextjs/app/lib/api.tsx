
import { RadioGroup } from '@headlessui/react';
import constants from './constants'


interface PaymentInfo{
    payType: string, 
    num: string,
    name: string,
    cvv: string,
    exp: string,
    errorNumber: int
}

interface IAtivo{
    nome: string, 
    descricao: string,
    codigo: string,
    taxaADM: number,
    aporteMinimo: number,
}

interface ITransacao{
    portfolioId: number, 
    ativoId: number,
    preco: number,
    quantidade: number, 
    operacao: string, /* A - Aporte / R - Resgate*/
}

interface IPortfolio{
    nome: string, 
    descricao: string,
    codigo: string,
    usuarioId: number
}

// interface ResponseData {
//     message: string, 
//     data: {
//         "id": string,
//         "email": string,
//         "nome": string,
//         "tipoPermissao": string,
//         "token": string
//     }
// }


export const registrar_usuario = async (userRegister) => 
{
     console.log("initialized registrar_usuario");
    const url = constants.base_url + 'login/adicionar_usuario';
    console.log(url);
    
    const data = {
        nome: userRegister.nome,
        email: userRegister.email,
        senha: userRegister.senha,
    };

    console.log('JSON.stringify');
    console.log(JSON.stringify(data))

    var retorno;

    let response = await fetch(url, {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then( resposta => {
        console.log('resposta');
        return resposta.text()
    })
    .then ( json => {
        console.log('json');
        console.log(json);
        retorno = json;
    })

    return retorno;
};


export const listar_ativos = async () => 
{
  
    console.log("listar_ativos");
    const url = constants.base_url +'Ativo/listar_ativos';
    console.log(url);

    var responseData = [];

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( resposta => {
        return resposta.json();
        
    })
    .then ( json => {
       return  json;
    })

    return response;
};

export const listar_portfolios = async () => 
{

    console.log("listar_portfolio");
    const url = constants.base_url + 'Portfolio/listar_portfolio';


    var responseData = [];

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( resposta => {
        return resposta.json();
        
    })
    .then ( json => {
       return  json;
    })

    return response;
};

export const listar_transacao = async (portfolioId) => 
{
    
    console.log("listar_aplicacoes_portfolio");
   
    const url = constants.base_url + 'Transacao/ListarTransacaoPorPortifolioId/'+ portfolioId; 
    
    
    console.log(url);

    var responseData = [];

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( resposta => {
        return resposta.json();
        
    })
    .then ( json => {
       return  json;
    })

    return response;
};


export const criar_transacao = async (transacao: ITransacao) => 
{
    //console.clear();
    console.log("initialized aportar_transacao");
    const url = constants.base_url + 'transacao';
    console.log(url);
    
    
    console.log('JSON.stringify');
    console.log(JSON.stringify(transacao))

    var retorno;

    let response = await fetch(url, {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transacao)
    })
    .then( resposta => {
        console.log('resposta');
        return resposta.text()
    })
    .then ( json => {
        console.log('json');
        console.log(json);
        retorno = json;
    })

    return retorno;
};





export const login = async (username: string, password: string) => 
{
    const url =  constants.base_url + 'login/autenticar';
    console.log(url);
    const data = {
        email: username,
        senha: password
    };

    var retorno;

    let response = await fetch(url, {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then( resposta => {
        console.log(resposta);
        return resposta.text()
    })
    .then ( json => {
        console.log(json);
        retorno = JSON.parse(json);
    })

    return retorno;
};


export const criar_portfolio = async (data: IPortfolio) => 
{
    //console.clear();
    console.log("initialized criar_portfolio");
    const url = constants.base_url + 'Portfolio/adicionar_portfolio';
    console.log(url);
    
    
    console.log('JSON.stringify');
    console.log(JSON.stringify(data))

    var retorno;

    let response = await fetch(url, {
        method: 'POST',
        //mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then( resposta => {
        console.log('resposta');
        return resposta.text()
    })
    .then ( json => {
        console.log('json');
        console.log(json);
        retorno = json;
    })

    return retorno;
};

