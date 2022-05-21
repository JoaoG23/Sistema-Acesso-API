
<div  align=center >
    <h1>Sistema João Acesso<h1>

   <img width="400px" src="./Documents/Assets/logo.png">

</div>


## Indice 👨‍💻

<p align="center">
 <li> <a href="#introdução">1 - 🚪Introdução</a> •</li>
 <li> <a href="#desenvolvimento">2 - ⚙️ Desenvolvimento</a> • </li>
 <li> <a href="#instalar">3 - 👇🤘 Como instalar</a> • </li>
 <li> <a href="#usar">4 - 🤘Como Usar</a> • </li>
 <li> <a href="#consideraçoesfinais">5 -Considerações finais </a> • </li>
 <li> <a href="#outros">6 -📁😅🤪 Coisa não tão relevantes</a> • </li>
 <li> <a href="#autor">7 -🧑‍💻 Autor</a> • </li>
 <li> <a href="#licenca"> 8- Licença</a> • </li>
</p>


## Edições ✏️📑


Alterações   | Data
:---------: | :------:
Emissão Inicial | 26/03/2022

### 👥 Principais Tecnologia usadas até o momento
#### 🧑‍💻 No front-end

<div>
        <img width="70px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" />
        <img width="70px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" />
        <img width="65px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
</div>

### No Back-end

<section>  

   <div style="display:inline-block; text-align:center; margin:10px">
        <p><b>PostgresSQL</b></p>
        <img width="70px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" />

   </div> 
   <div style="display:inline-block; text-align:center; margin:10px">
        <p><b>Nodejs</b></p>
        <img width="70px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" />
  </div> 
  <div style="display:inline-block; text-align:center; margin:10px">
        <p><b>Express</b></p>     
   <img width="70px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />     
  </div> 
</section>
          



<h2 id='introdução'><b>1-introdução</b></h2>


<img  align=center src="./Documents/Assets/Apresentacao.gif">


Acumulando o mínimo de conhecimento de sistema de controle de acesso. Estou desenvolvendo meu proprio sistema de contole de acesso. Para testar minha capacidade de desenvolvimento com NodeJS. 
Então, depois de compartilhar um pouco, por qual sentido desta criacão, vou apresenta o que temos até agora.

Este sistema de Segurança e Controle de Acesso, cujo o intuito e controlar o fluxo de pessoas em um estabelecimento.




<h2 id='desenvolvimento'><b>2- Desenvolvimento</b></h2>

<img width="300px" src="https://c.tenor.com/YeyWf_YP7PcAAAAM/construct-construction.gif">
<br>

Novamente, como sempre como nos projetos anteriores utilizei arquitura **MVC**


<h2 id='instalar'><b>3- Como instalar</b></h2>

1.Tenha um **NODEjs** e **PostgresSQL 9.5** instalado.

2. Clone o projeto 

3. Restaure um backup do banco de dados postegresql. Localizado no caminho abaixo:

        Sistema-joao-acesso\Aplics\Model\18052022-dbjoaoacesso-c.sql

<img  align=center src="./Documents/Assets/pgtutorial.png">

4. Entre no Diretorio no **CMD ou em Outro terminal** de comando.

5. Em seguida entre dentro da pasta **Aplics**.

        \Sistema-joao-acesso\Aplics    

6. **ATENCAO** Após isso digite o npm install dotenv se caso o dotenv nao for instalado dentro da pasta Aplics.

7. Após isso crie um **.env** na pasta **Aplics** e configure apontando para sua base de dados. Conforme abaixo ou como sua preferencia :

Exemplo nao preenchido no arquivo .env.example:

                PORT_SERVIDOR=

                USERDB=
                PORTDB=
                HOSTDB=
                DATABASE=
                PASSWORD=

                TOKEN_SECRET=


Exemplo preenchido  .env:


                PORT_SERVIDOR=3000

                USERDB="postgres"
                PORTDB=5432
                HOSTDB="127.0.0.1"
                DATABASE="db_joao_acesso_v1"
                PASSWORD="admin"

                TOKEN_SECRET="joao"



8.Após volte para pasta **Aplics** e  digite seguinte comando abaixo:

        node init.js


9. Esse comando irá iniciar o servidor....

10 . Dentro da pasta Aplics há um Sistema-joao-acesso/Aplics/**API_Sistema_joao_acesso-Tipo-HAR**, poderá usar para Usar na API de 
Teste, ***Insomnia ou postman*** de sua preferencia. Ou então aguarde a documentacão pelo Swagger minha documentacão.....


<h2 id='usar'><b>4- Como usar</b></h2>

Clique logo abaixo para ver o tutorial sobre o sistema.

<details>
  <summary><b>Veja mais sobre ...</b></summary>


### 1-Iniciando o servidor
  
  Entre pasta **Aplics** e  digite seguinte comando abaixo no terminal :

        node init.js


Aparecerá  API Sistema Joao Acesso Rodando na porta:  3000
em seguida digite na URL : http://localhost:3000/index.html.
### 2- Entrar no login
<img  align=center src="./Documents/Assets/Login.GIF">

Na primeira tela e a de login. 

Digite **admin** senha e login, para o primeiro acesso.


### Conceito inicial

Como este sistema de Segurança e Controle de Acesso, cujo o intuito 
e controlar o fluxo de pessoas em um estabelecimento. O seu funcionamento
consiste em cadastrar uma pessoa no sistema. Em seguida vá na tela de monitoramento e realizar o liberação de acesso.


### 3-Fundamento gerais da Aplicação

Na tela haverá um barra lateral onde estarão todos os menus.

Ao clicar nos menus, você será direcionado para as abas em questão.

Toda aba, terá basicamente o a barra superior e esta haver 3 itens
barra de pequisa, botão verde para adicionar, botão vermelho para voltar
a pagina anterior. 


No meio os cartões, e cada cartão haverá um pequeno botão de x,
servidor para exclusão de cartão e dos dados. Veja o GIF abaixo e entenderá:

<img  align=center src="./Documents/Assets/estruturaGeral.GIF">

Há algumas variações pequenas de layout em outras abas, porém nada fora do comum.


### 4-Como Criar um usuário e fazer Checkin

Vá em usuario
<img  align=center src="./Documents/Assets/add.GIF">

1. Clique no icone de verde superior direito.
2. Digite os dados principais
3. **Atenção** a codigo da credencial datas de validade inicial, **Data de vencimento**, <a href='#creditos'>Creditos</a> e **Afastamento**.

Em seguida vá na tela de checkin.

1. Clique no botão sair na barra lateral no canto inferior.

2. Clique botão ***Area Checkin***.

3. Coloque o código de credencial que você cadastrou  ao adicionar o usuário.

4. Selecione a direção de entrada ou saida e clique em checkin.

<img  align=center src="./Documents/Assets/Checkin.GIF">

<h3>Respostas de Checkin </h3>

* ACESSO LIBERADO você tera permissão para passar.

* ACESSO NEGADO Caso credencial invalida ou vencida = pode ser data de validade
esteja vencida ou que a data inicial do seu acesso esteja a frente no cadastro do usuario.

* ACESSO BARRADO ou Caso Credencial esteja Inexistente  = Que dizer você nao cadastrou nenhum usuario no sistema ou acabaram o seus creditos.

Basicamente o sistema consiste em realizar isso.


 2- Página inicial 

<img  align=center src="./Documents/Assets/Home.GIF">

 Tem um mini Dashboard pequenininho que mostrar algumas
Nestas aba tem 2 Gráficos 


Primeiro  - mostra no mes quantos acesso foram barrados liberados ou negados do ultimos 30 dias 
Segundo - Que mostrar a quantidade de acesso dos ultimo 4 Meses



 3. Gestores de sistema : Essa aba é basicamente lista de usuário para acessar o sistema com login e senha.
 
 Observação : Eu tive que mudar o nome para gestores de sistema envés de usuários pois
 os usuário aqui, são as pessoas aquele que usaram o sistema de controle de acesso para fazer checkin.
 

 4. Usuários : 
São as pessoas que serão cadastradas aqui para realizar o controle delas em um estabelecimento, ou casa
 ou eventos.
 O modo de cadastramento vocês poderam ver clicando no link aqui. 

 5. Fluxo de acessos :
 Uma tela que mostrar os onze ultimos acessos. 
 Observação: 'Essa tela ainda terá melhorias implementando Socketio Ok!'

 Ao canto superior tem um botão amarelo escrito ***Monitor em tempo Real*** 
 ele mostra a ultima pessoa em tempo real que passou na tela naquele horario.


 6. Relatórios 
Tira relatorio dos acessos pode colocar codigo da pessoa, ou mesmo colocar a data final
e inicial dos acesso. Eles podem ser no formato CSV e PDF.


 7. Configurações
Onde ficaram todas as configurações referente ao sistema 
Atualmente tem os afastamentos. Para selecionar quando usuário for cadastrado
se ele esta de ferias ou em viagem e etc ...


<h2 id='creditos'>Creditos</h2>
Ao cadastrar um usuário tem um campo chamado creditos.
Ele serve para fazer limitar o acesso do usuário conforme ele faça checkin na tela. Sendo quando esse crédito o usuário será barrado no checkin.

Tendo ele que editar o seu perfil e acrescentar mais creditos.


</details>


<h2 id='consideraçoesfinais'><b>5 -😅 Considerações finais</b></h2>

Pessoal estou aberto a sugestões de dica e opiniões, vale resaltar que ainda sou Desenvolvedor
Junior... Nesse sistema ainda falta implementar SocketOI para tela de monitoramento, entre outras coisas de resposividade e etc...😅

Muito obrigado a quem passar por aqui...


<h2 id='outros'><b>6 -📁😅🤪 Coisa não tão relevantes</b></h2>

Na estrutura de diretorios há 2 pastas principais:

### Aplics 📁
Onde estão todo o codigo fonte da Aplicação 
### Documents 🗃️📋 
Onde estão esta colocado toda documentação, as 
dependencias que eu estou usando entre outras coisa, serve para que eu lembre mesmo de todas 😅 
### what-Dependecias
Meu gerador de arquivos quando preciso gerar algo repetivo, comando para lembra ou outras coisa crio esse coisinham para automatizar. 😅
### fileCreatorServer.bat ⚙️
Meu gerador de estrutura de codigo. Ele gera minhas pasta principais do Back-end. Otimizando o tempo na criacão de diretórios e arquivos. 🤗Ahh vale resaltar ele é baseado no **MVC**.



### Autor

---

 <img style="border-radius:50%;" src="https://avatars.githubusercontent.com/u/80895578?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Joao Guilherme</b></sub></a> <a href="https://github.com/JoaoG23/">🚀</a>


Feito com 🤭 por Joao Guilherme 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Joao-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jaoo/)](https://www.linkedin.com/in/joaog123/) 
[![Badge](https://img.shields.io/badge/-joaoguilherme94@live.com-c80?style=flat-square&logo=Microsoft&logoColor=white&link=mailto:joaoguilherme94@live.com)](mailto:joaoguilherme94@live.com)


<h2 id='licensa'><b>7 - Licensa</b></h2>

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

        