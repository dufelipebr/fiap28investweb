'use client';
import { useState, useEffect } from "react";
import { Label, TextInput, Select } from "flowbite-react";
import { listar_ativos } from '../lib/api';

function classNames(...classes) 
{
  return classes.filter(Boolean).join(' ')
}



export default function Page() 
{

    const [enableCC, setEnableCC] = useState(false);
    const [payment, setPayment] = useState<PaymentInfo>({payType:"B", num:"", name:"", cvv:"",exp:""});
    const [errorNumber, setErrorNumber] = useState(0);
    const [ativos, setAtivos] = useState<IAtivo>(listar_ativos());
    //const [completed, setCompleted] = useState(true);


    // useEffect(() => {
    //     let _ativos = listar_ativos();
    //     if (_ativos) {
    //         setAtivos(_ativos);
    //     }
    //   }, []
    // )




    const handleComboMethod = (event) =>
    {
       
       
    }

    const handleChange =  (event) => 
    {
        //event.preventDefault();
        if (event.target.name == "num")
        {
            payment.num = event.target.value;
        }

        if (event.target.name == "cvv")
        {
           payment.cvv = event.target.value;

        }

        if (event.target.name == "name")
        {
           payment.name = event.target.value;
        }

        if (event.target.name == "exp")
        {
           payment.exp = event.target.value;
        }

        handleError();
        onChangeValue(payment);
    }

    const handleError =  () => 
    {
        const NUM_CARD = /\d{16}/;
        const CVV = /\d{3}/;
        const EXP = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

        console.log("handleError");
        console.log("payment.payType");
        console.log(payment.payType);

        payment.errorNumber = 0;
        var validar = (payment.payType == "D" || payment.payType == "C");
        if (validar && !NUM_CARD.test(payment.num))
            payment.errorNumber += 1;

        if (validar && payment.name.trim().length < 5)
            payment.errorNumber += 2;

        if (validar && !CVV.test(payment.cvv))
            payment.errorNumber += 4;

        if (validar && !EXP.test(payment.exp))
            payment.errorNumber += 8;

        setErrorNumber(payment.errorNumber);
        console.log(errorNumber);
    }

    
  
  return (
    <div className="isolate w-96 px-6 py-24 sm:py-32 lg:px-8">
        <div >
            <div >
            <Label htmlFor="tipo_ativo" value="Selecione o tipo ativo" />
            </div>
            <Select id="tipo_ativo" name="tipo_ativo" onChange={handleComboMethod} required>
            <option value="1">CDB</option>
            <option value="2">Ações</option>
            <option value="3">CDI</option>
            <option value="4">LDI_LDA</option>
            <option value="5">Tesouro</option>
            <option value="6">Cripto</option>
            </Select>
        </div>
        <div >
            <div >
            <Label htmlFor="ativo" value="Selecione o ativo" />
            </div>
            {ativos}
            {/* <Select id="ativo" name="ativo" required>
                
                {ativos.map((ativo) => (
                    <option value={ativo.id}>{ativo.nome}</option>
                ))}
            </Select> */}
        </div>
        <div >
            <div >
                <Label htmlFor="small" value="Valor de Investimento"                     
                />
            </div>
            <TextInput id="num" name="num" placeholder="preencha o valor " type="text" sizing="sm" maxLength={16} onChange={handleChange} required />
        </div>
        <div className="py-1"></div>
        <button 
            className="w-full rounded-md bg-indigo-600 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit">Aportar
        </button>
        <button 
            className="w-full rounded-md bg-indigo-600 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit">Sacar
        </button>
    </div>
    
  );
}
