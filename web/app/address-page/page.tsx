'use client';

import BillingAddress from "./address-page";
import { useState } from "react";

export  default function Page() 
{

    //const [valor, setValor] = useState("");

    const handleChange =  (event) => 
    {
        console.log('handleChange');
        console.log(event);
    }

    return(
       <div className="py-20 p-10">
        <BillingAddress></BillingAddress>      
        </div>
    )
}