'use client';
import { useState, useEffect } from "react";
import { Label, TextInput, Select } from "flowbite-react";
import { listar_ativos, listar_portfolios, listar_transacao, criar_transacao, criar_portfolio } from '../lib/api';
import { isNumberObject } from "util/types";
import dateFormat from 'dateformat';
import { LoginInfo } from "../lib/login";


function classNames(...classes) 
{
  return classes.filter(Boolean).join(' ')
}



export default function Page() 
{
    const [loadedAtivos, setLoadedAtivos] = useState<IAtivos[]>([{}]);
    const [ativos, setAtivos] = useState<IAtivos[]>([{}]);
    const [currentAtivo, setCurrentAtivo] = useState<IAtivos>({});
    const [portfolios, setPortfolios] = useState<IPortfolio[]>([{}]);
    const [transacoes, setTransacoes] = useState<ITransacao[]>([{}]);
    const [currentTransacao, setCurrentTransacao]  = useState<ITransacao>({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedAtivo, setSelectedAtivo] = useState(0);
    const [selectedPortfolio, setSelectedPortfolio] = useState(0);
    const [valorTransacao, setValorTransacao] = useState(0);
    const [validationMessage, setValidationMessage] = useState("");
    const [errorDisplay, setErrorDisplay] = useState(false);
    const [movimentacaoHeader, setMovimentaoHeader] = useState({totalAporte: 0, totalResgate:0, saldo: 0, display:false});
    const [userLogin, setUserLogin] = useState({});
    const [newPortfolio, setNewPortfolio] = useState("");
    
    //const [completed, setCompleted] = useState(true);


    useEffect(() => {
        if (!isLoaded)
        {
            var login = LoginInfo();
            if (login!=null) 
                setUserLogin(login);

            buildAtivoCombo();
            buildPortfolioCombo(login?.id);
          
        }

        setIsLoaded(true);
      }, []
    )


    const buildAtivoCombo = async () => 
    {
        let _ativos = await listar_ativos();
        
       setLoadedAtivos(_ativos);
        
    //    currentTransacao.tipo = 1;

       var filterArray = loadedAtivos.filter((element) => {
           return element.tipo == currentTransacao.tipo;
       })

        setAtivos(filterArray);
    }

    const buildPortfolioCombo = async (forceUser) => 
    {
        var userId = userLogin.id;
        if (forceUser != null)
            userId = forceUser;

        let _portfolio = await listar_portfolios();

        var listaPortfolio = [{}];
        listaPortfolio.pop();
        console.log(_portfolio);
        _portfolio.forEach(element => {
            if (element.usuarioId == userId)
                listaPortfolio.push(element);

        });
        
        console.log(listaPortfolio);
        setPortfolios(listaPortfolio);
    }

    const buildTransacaoTable = async (_portfolio_id, _ativo_id) => 
    {
        setIsLoaded(false);
        setErrorDisplay(false);
        setValidationMessage("");
        
        var portfolio_id = _portfolio_id;
        var ativo_id = _ativo_id;

        console.log('buildTransacaoTable');
        if (portfolio_id > 0 && ativo_id > 0)
        {
            let _transacao = await listar_transacao(portfolio_id);

            var listaTransacao = [{}];
            var sumTotalAplicacao=0;
            var sumTotalResgate=0;
            var sumTotalDiff=0;
            listaTransacao.pop();
            _transacao.forEach(element => {
                if (element.ativoId == ativo_id)
                {
                    listaTransacao.push(element);
                    if (element.operacao == "A")
                        sumTotalAplicacao+= element.total;

                    if (element.operacao == "R")
                        sumTotalResgate+= element.total;
                }

            });
            sumTotalDiff = sumTotalAplicacao - sumTotalResgate;
            var display = (listaTransacao.length > 0) ? true : false; 
            setMovimentaoHeader({totalAporte: sumTotalAplicacao, totalResgate: sumTotalResgate, saldo: sumTotalDiff, display: display})
            setTransacoes(listaTransacao);
            console.log(listaTransacao);
            
        }
        else
        {
            setTransacoes([{}]);
        }
        setIsLoaded(true);
        setErrorDisplay(false);
        
        
    }

    const handleComboMethod = (event) =>
    {
        console.log('handleComboMethod');
        currentTransacao.tipo = event.target.value;
        
        console.log(currentTransacao.tipo);
         var filterArray = loadedAtivos.filter((element) => {
             return element.tipo == currentTransacao.tipo;
        })
        console.log(filterArray);
        console.log(loadedAtivos);

        setAtivos(filterArray); 
        setSelectedAtivo(0);
        //setSelectedAtivo(event.target.value);
       
    }

    const handleChange =  (event) => 
    {
        var text = event.target.value;
        const numericValue = text.replace(/[^0-9]/g, "");

        if (event.target.name == "quantidade")
            currentTransacao.quantidade = numericValue;
        
        if (event.target.name == "preco")
            currentTransacao.preco = numericValue;

        // console.log("currentTransacao:" + currentTransacao);
        // console.log("event.target.name:" + event.target.name);
    }

    const handleChangeAtivo =  (event) => 
    {
        console.log('handleChangeAtivo');
        if (event.target.value != 0)
            setSelectedAtivo(event.target.value);

        var result = ativos.findLast((element)=> element.id == event.target.value);
        setCurrentAtivo(result);
        console.log(result);
        console.log(result.preco);
        currentTransacao.preco = result.taxaADM;
        buildTransacaoTable(selectedPortfolio, event.target.value);        
    }

    const handleChangePortfolio =  (event) => 
    {
        if (event.target.value != 0)
            setSelectedPortfolio(event.target.value);

        buildTransacaoTable(event.target.value, selectedAtivo);
    }



    const handleSubmit =  async (event) => 
    {   
        event.preventDefault();
  //      console.log(event.target.value);

        var  transacao : ITransacao = {portfolioId: selectedPortfolio, 
            ativoId: selectedAtivo, 
            preco: currentTransacao.preco, 
            quantidade: currentTransacao.quantidade,  
            operacao: event.target.value
        };

//        console.log("transacao:" + transacao);
        setErrorDisplay(false);
        setValidationMessage("");
        

        var listaTransacao = [{}];
        var sumTotalAplicacao=0;
        var sumTotalResgate=0;
        var sumTotalDiff=0;
        listaTransacao.pop();
        transacoes.forEach(element => {
            if (element.ativoId == selectedAtivo)
            {
                listaTransacao.push(element);
                if (element.operacao == "A")
                    sumTotalAplicacao+= element.total;

                if (element.operacao == "R")
                    sumTotalResgate+= element.total;
            }

        });
        sumTotalDiff = sumTotalAplicacao - sumTotalResgate;

      
        if (transacao.operacao == "R" && sumTotalDiff <= 0)
        {
            setValidationMessage("Não existe saldo disponivel para esse portfolio - faça um aporte!");
            setErrorDisplay(true);
            return;
        }


        var result = await criar_transacao(transacao);

        if (result != "OK")
        {
            setValidationMessage(result.toString());
            setErrorDisplay(true);
        }

        buildTransacaoTable(selectedPortfolio, selectedAtivo);
        
    }
   
    const handleTextPortFolio =  (event) => 
    {
        setNewPortfolio(event.target.value);
        //console.log(element);
        
    }

    const createPortfolio = async (event) =>
    {
        setIsLoaded(false);
        if (newPortfolio != "")
        {
            await criar_portfolio({
                nome: newPortfolio, 
                descricao: newPortfolio,
                codigo: newPortfolio,
                usuarioId: userLogin.id
            })
            buildPortfolioCombo();
        }
        setIsLoaded(true);
    }

    const handleError =  () => 
    {

    }

    const GetInvestimento =  (transacao) => 
    {
        if(transacao.investimento != null)
            return transacao.investimento.nome;

    }

    const GetFormatBRL =  (valor_decimal) => 
    {
        if(valor_decimal != null)
            return '$' + valor_decimal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

    }

    const GetFormatDate = (date) =>
    {
        if (date != null)
            return  dateFormat(date, "dd/mm/yyyy");
    }
    

    function classNames(...classes) 
    {
      return classes.filter(Boolean).join(' ')
    }

  
  return (
    <>
     <div 
      className={classNames(
        isLoaded ? 'hidden' : '',
        'block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    )}
    >
        Carregando Informações...
    </div>
    <div className="isolate w-96 px-6 py-24 sm:py-32 lg:px-8">
      
        <div>
            <label className="">Adicionar portfolio
            <TextInput name="text_portfolio" id="text_portfolio"   placeholder="digite aqui para criar portfolio"  maxLength={10}  onChange={handleTextPortFolio}  className="w-full"  /> 
                <button 
                    className="w-full mt-1 h-6 rounded-md bg-indigo-600 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit"
                    value={"A"}
                    onClick={createPortfolio}
                > Criar Portfolio
                </button>
            </label>
        </div>
        <div className="mt-10">Selecionar o Portifolio</div>
        <div className="mt-1">
            <Select  id="portfolio" name="portfolio" onChange={handleChangePortfolio} required>
                <option> - please select option -</option>
                {portfolios.map((port) => (
                    <option value={port.id}>{port.nome}</option>
                ))}
            </Select> 
        </div>
        <div >
            <div >
            <Label htmlFor="tipo_ativo" value="Selecione o tipo ativo" />
            </div>
            <Select id="tipo_ativo" name="tipo_ativo" onChange={handleComboMethod} required>
            <option value="0"> -- selecione um tipo de ativo --</option>
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
           
            <Select id="ativo" name="ativo" onChange={handleChangeAtivo}  value={selectedAtivo} required>
                <option value="0"> - please select option -</option>
                {ativos.map((ativo) => (
                    <option value={ativo.id}>{ativo.nome}</option>
                ))}
            </Select> 
        </div>
        <div >
            <div >
                <Label htmlFor="small" value="Preço"                     
                />
            </div>
            <TextInput id="preco" name="preco" placeholder="preencha o valor " type="text" sizing="sm"  required 
                placeholder="Enter numbers only"
                maxLength={16} 
                onChange={handleChange}
                value={GetFormatBRL(currentTransacao.preco)}
                disabled 
            />
        </div>
        <div >
            <div >
                <Label htmlFor="small" value="Quantidade"                     
                />
            </div>
            <TextInput id="quantidade" name="quantidade" placeholder="preencha o valor " type="text" sizing="sm"  required 
                placeholder="Enter numbers only"
                maxLength={16} 
                onChange={handleChange}
                
            />
        </div>
        {/* <div >
            <div >
                <Label htmlFor="small" value="Total"                     
                />
            </div>
            <TextInput id="total" name="total" placeholder="preencha o valor " type="text" sizing="sm"  required 
                placeholder="Enter numbers only"
                maxLength={16} 
                onChange={handleChange}
                value={currentTransacao.total}
            />
        </div> */}
        <div className="py-1"></div>
        <div className="block bg-red-600 text-white"> 
            {validationMessage}
        </div>
       
        <button 
            className="w-full mt-3 h-14 rounded-md bg-indigo-600 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            value={"A"}
            onClick={handleSubmit}
            >Aportar
        </button>
        <button 
            className="w-full mt-1 h-14 rounded-md bg-indigo-600 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
            value={"R"}
            onClick={handleSubmit}
            >Sacar
        </button>

        <div 
            className={classNames(
                movimentacaoHeader.display ? '' : 'hidden',
                '',
            )}
        > 
            <div className="mt-3 bg-indigo-600 text-center text-sm font-semibold">
                Lista de aplicações realizadas:
            </div>
            <div className="bg-indigo-300 text-center text-sm font-semibold">
                <p className="text-green-500">Total aportado: {GetFormatBRL(movimentacaoHeader.totalAporte)}</p>
                <p className="text-red-600">Total resgates: {GetFormatBRL(movimentacaoHeader.totalResgate)}</p>
                <p>Saldo: {GetFormatBRL(movimentacaoHeader.saldo)}</p>
            </div>
            <div className="border-0">
                {transacoes.map((transacao) => (
                    <div 
                        className={classNames(
                            transacao.operacao == "A" ? 'text-green-300' : 'text-red-700',
                            'bg-white',
                        )}
                    >
                        <p className="text-xs leading-5">{GetFormatDate(transacao.dataTransacao)}</p>
                        <p>{transacao.operacao} - Qtde: {transacao.quantidade} -  Preço: {GetFormatBRL(transacao.preco)} - Total: {GetFormatBRL(transacao.total)}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
    </>
  );
}
