"use client";

import React, { useState } from 'react';

interface Address 
{
    identificador: string;
    street: string;
    number: string;
    city: string;
    state: string;
    zip: string;
    complement: string
}

const BillingAddress: React.FC = () => 
{
    const [address, setAddress] = useState<Address>
    ({
        identificador : '',
        street: '',
        number: '',
        complement: '',
        city: '',
        state: '',
        zip: '',
    });

    const billing_addr: Address[] = [
        { identificador: '01', street: 'Rua George Smith', number: '100', complement: 'apto185a', city: 'são paulo', state: 'SP', zip: '05074-010'},
        { identificador: '02', street: 'Rua Tonelero',  number: '200', complement: '12b', city: 'são paulo', state: 'SP', zip: '05000-000'}
    ];

    const states = [
        { UF: 'SP', name: 'São Paulo'},
        { UF: 'RJ', name: 'Rio de Janeiro'},
        { UF: 'MG', name: 'Minas Gerais'},
        { UF: 'ES', name: 'Espirito Santo'},
    ];


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => 
    {
        e.preventDefault();
        // Handle form submission here
        console.log(address);
    };

    const handleComboState = (e) => 
    {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            "state": value,
        }));
    };

    const handleComboChange = (e) => 
    {
        //e.preventDefault();
        // Handle form submission here
        console.log(e.target.name);
        console.log(e.target.value);
        let ad : Address = {identificador: '0', street: '', number: '', city: '', state: '', zip: ''};
        billing_addr.forEach(function(item){
            if (item.identificador == e.target.value)
            {
                console.log('teste');
                ad.city = item.city;
                ad.identificador = item.identificador;
                ad.number = item.number;
                ad.state = item.state;
                ad.street = item.street;
                ad.zip = item.zip;
            }
        });
        setAddress(ad);
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1>Billing Address</h1>
            <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2 ">
                    <select onChange={handleComboChange} name="addresses" >
                        <option value="0">{"Create New"}</option> 
                        {billing_addr.map((add) => (
                            <option value={add.identificador}>{add.street} - {add.number} / {add.city} - {add.state}</option>
                        ))}
                    </select>
                </div>
                <div className="col-span-3 ">
                    <label> Street: </label>
                    <div>
                        <input 
                            className='max-w-max'
                            type="text"
                            name="street"
                            value={address.street}
                            onChange={handleInputChange}
                        />
                    </div>
               
                </div>
                <div className="col-span-3 ">
                    <label> Number: </label>
                    <div>
                        <input
                            type="text"
                            name="number"
                            value={address.number}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-span-3">
                    <label> Complement: </label>
                    <div>
                        <input
                            type="text"
                            name="complement"
                            value={address.complement}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-span-2">
                    <label>
                        City:
                    </label>
                    <div>
                        <input
                            type="text"
                            name="city"
                            value={address.city}
                            onChange={handleInputChange}
                        />
                    
                    </div>
                </div>
                <div className="col-span-2">
                    <label>
                        State:
                    </label>
                    <div>
                         <select onChange={handleComboState} name="state" value={address.state}>
                            {states.map((state) => (
                                <option value={state.UF}>{state.Name}</option>
                            ))}
                        </select>

                    </div>
                </div>
                <div className=" col-span-3">
                    <label>
                        ZIP:
                    </label>
                    <div>
                        <input
                            type="text"
                            name="zip"
                            value={address.zip}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                <button type="submit" className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">OK</button>
                </div>
        </div>
        </form>
        </>
    );
};

export default BillingAddress;