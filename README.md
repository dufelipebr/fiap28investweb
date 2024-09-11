# Modulo Investimento - Entrega Tec Chalenge 5 - FIAP POSTECH
Modulo Cliente desenvolvido em React + Next.JS do PortalInvestimento - Entrega Tec Chalenge 5 

![pexels-pixabay-534216](https://github.com/user-attachments/assets/4cbe0e8e-7614-4a6c-aacd-6b863a31147b)

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=Concluido&color=GREEN&style=for-the-badge)
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=Client&message=Next.Js&color=GREEN&style=for-the-badge)
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=Server&message=CSharp8&color=GREEN&style=for-the-badge)
![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=Database&message=SqlServer&color=GREEN&style=for-the-badge)




 
![GitHub Org's stars](https://img.shields.io/github/stars/dufelipebr?style=social)



# Descrição do Projeto

Esse projeto é o trabalho de conclusão do modulo 5 da FIAP PosTech grupo 27. </br>
O objetivo é demonstrar a capacidade de implementar um portal de investimentos utilizando os recursos passados em aula, colocando em pratica o desenvolvimento de Clean Architecture, EF Framework, API & Microservices. 

O projeto consiste: 

<li>portal investimento web : Portal feito em Next.JS possilita o usuario a cadastrar na ferramenta de investimento e depois do login, fazer os aportes e saques na carteira. </li>
<li>PortalInvestimento.API : Modulo da API implementanda em C# com controlers utilizada pela aplicação. A ferramenta Web se comunica com a API para fazer todas as requisições de dados utilizados pela aplicação. </li>
<li>PortalInvestimento.Application: Modulo implementada em C# para layer Application do Clean Architecture, possui DTOs, Interfaces, Mapping e Services. </li>
<li>PortalInvestimento.Domain: Modulo implementado em C# para layer Domain do Clean Architecture, possui Entities, Interfaces e Validation. </li>
<li>PortalInvestimento.Domain.Test: Xunit Tests feitos em C# para testar o Domain do Clean Architecture. </li>
<li>PortalInvestimento.Infra.Data : Modulo implementado em C# com EF Framework para Layer Data do CleanArchitecture, possui os Migrations, Context e Repositories. </li>

# 🖋️ Desenho da Arquitetura 

Verificar

# :hammer: Funcionalidades do projeto

- `Login`

Permite o login na ferramenta de investimento.

![image](https://github.com/user-attachments/assets/5ffd5de4-4b41-4882-84bb-1b4d2890250b)

1) Colocar o usuario e senha para fazer o login na ferramenta. 

- `Criação de Usuario`

Permite a criação de usuario para fazer onboarding do investimento.

![image](https://github.com/user-attachments/assets/934a0388-7190-4767-a48e-2f8a97d9a1a5)

1) Colocar o nome, email e senha para poder acessar a aplicação, após isso tentar efetuar o login. 
  
- `Investimento`

Permite aporte de Ativo\Saque na carteira (portfolio).

- ![image](https://github.com/user-attachments/assets/0fee9bb4-a51d-4441-9646-e716c5ed9d1a)

1) Informar o portfolio
2) Informar o Tipo de Ativo (CDB, Ações, CDI, LDI\LDA, Tesouro e Cripto)
3) Informar o Ativo preprenchido.
4) Verificar o preço informado
5) Inserir a quantidade desejada do Ativo.
6) Clicar em Aporte

   Resultado esperado: Sistema incluo nova transação no portfolio escolhido.

   Saque: Para sacar é a mesmo fluxo porem clicando no botão Sacar, importante que a aplicação faça o
   controle de saldo não permitindo o saque maior que o valor aplicado no ativo\portfolio. 
      
- 'Portfolio'

  Permite fazer o inclusão de novos portfolios.
  
- ![image](https://github.com/user-attachments/assets/63d935ee-496a-4de5-9b92-8ad0c4d8c020)

1) Digitar o Portfolio
2) Clicar no botão Criar Portfolio

   Resultado Esperado: Sistema irá criar o novo portfolio do usuario. 

# Acesso ao Projeto:

Modulo Cliente -  https://github.com/dufelipebr/fiap28investweb/ </br>
Modulo Server  - https://github.com/AcostaTI/PortalInvestimento/

# Inicialização do Projeto
Para que a solução funcione adequadamente é necessário fazer o bootstrap dos projetos </br>
## Cliente 
- Instalar Node  20.11 (ou superior)
- Após no diretorio do app web instalar o Next e digitar SIM para tudo :
    npm install next@latest react@latest react-dom@latest
- Instalar dependencias no diretorio web
     npm install @flowbite-react/react
     npm install @heroicons/react
     npm install dateformat
     npm install @headlessui/react

## Servidor: 
- Alterar a ConnectionStrings no arquivo appsettings.json
- Abrir o Package Manager Console e rodar o comando update-database para adicionar o banco

# Tecnologias utilizadas:

<li>Cliente:</li> React, Next.JS </br>
<li>Server:</li>  C# .NET 8. </br> Entity Framework </br> Sql Server </br>
  
# Pessoas Contribuidoras:
Grupo 27 </br>
Alexandre Costa.</br>
Carlos Eduardo Felipe de Oliveira </br>

  
# Pessoas Desenvolvedoras do Projeto: 
Grupo 27 </br>
Alexandre Costa.</br>
Carlos Eduardo Felipe de Oliveira </br>


# Licença:
Gratuita. 


