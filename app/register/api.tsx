
import { RadioGroup } from '@headlessui/react';
import constants from '../lib/constants'

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
    const url = constants.API_URL_BRONCO + '/registrar_usuario';
    console.log(url);
    //const url = 'https://dev-azure-brazilsouth-broncoapi.azurewebsites.net/login';
    const data = {
        nome: userRegister.nome,
        email: userRegister.email,
        senha: userRegister.senha,
    };

    console.log('JSON.stringify');
    console.log(JSON.stringify(data))

    try {
         console.log(data)
         
        // console.log('ENV:' + process.env.API_URL_BRONCO);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        console.log(response);
        console.log(response.statusText);
        console.log(response.body);
        //console.log(response.json())
        if (response.ok) 
        {
            // Handle successful login
            //const responseData = await response.json();

            return {
                message: "Ok", 
                data: {}
            };
        } else 
        {
            // Handle login error
            return {
                message: 'not Ok', 
                data: response
            };
        }
    } catch (error) {
        console.error('An error occurred', error);
    }
};

