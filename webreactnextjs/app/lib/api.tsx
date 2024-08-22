
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
    rent_3: number,
    rent_12: number,
    rent_23: number
}

export const registrar_usuario = async (userRegister) => 
{
    console.clear();
    console.log("initialized registrar_usuario");
    const url = 'https://localhost:44326/login/adicionar_usuario';
    console.log(url);
    //const url = 'https://dev-azure-brazilsouth-broncoapi.azurewebsites.net/login';
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
    console.clear();
    console.log("listar_ativos");
    const url = 'https://localhost:44326/Ativo/listar_ativos';
    console.log(url);

    var retorno;

    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
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

