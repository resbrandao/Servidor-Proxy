/*
const express = require('express')

var cors = require('cors')
const app = express()
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');
var whitelist = ['http://localhost:8080', 'http://localhost:3001/', 'http://localhost:3000/', 'http://localhost:3002/',, 'http://api.olhovivo.sptrans.com.br/v2.1/']; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept'],
  secure:false
};

/*app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept,Authorization,Origin');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});*/

//app.use(cors())

//app.use(cors(corsOptions))

/*const proxy = require('express');

module.exports = function(app) {
  app.use(
    proxy('/Linha', {
      target: 'http://localhost:3000/Linha/Buscar',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/Linha': ''
      },
      onProxyReq: function (proxyReq, req, res) {
          proxyReq.setHeader("host", 'localhost:3000')
      }
    })
  )
}

app.post('/Login/Autenticar', async (req, res ) => {    
    try {
   
        let token = req.query.token;
        const response = await fetch('http://api.olhovivo.sptrans.com.br/v2.1/Login/Autenticar?token=' + token, {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
        });

        const serverResponse = await response.json();
        //Pegando cookies
        let cookies = response.headers.get('set-cookie');
        //Removendo spaces
        cookies = cookies.replace(/ /g, '');
        let arrayCookies = cookies.split(';');
        let finalToken = "";
        //Limpando para retirar informacao do token
        arrayCookies.forEach(cookie => {
            if (cookie.includes('apiCredentials')){
                let arrayCookie = cookie.split("=");
                finalToken = arrayCookie[1];
            }
        });

        //Retornando informação
        res.send({
            response: serverResponse,
            apiToken: finalToken
        });
		
		 
    } catch (e) {
        console.log(e);
        res.send("Error Connecting");
    }

});

app.get('/Linha/Buscar', async (req, res) => {
//	app.get('/livros', async (req, res) => {
    try{
  
            const response = await fetch('http://api.olhovivo.sptrans.com.br/v2.1/Linha/Buscar?termosBusca=' + req.query.termosBusca, { 
			//const response = await fetch('http://localhost:8089'+req.query.livros , {
            method: 'get',
			headers: {'Content-Type': 'application/json; charset=utf-8', cookie: 'apiCredentials=' + req.query.tokenConexao + ';'}
			//headers: {"Access-Control-Allow-Origin" : "http://localhost:8089", 'Content-Type': 'application/json; charset=utf-8' + ';'}
		//headers: { 'Content-Type': 'application/json; charset=utf-8' + ';'}
        });

        const json = await response.json();
        console.log(json);
        res.send(json)
		
		
    } catch (e) {
        console.log(e);
        res.send("Error Connecting");
    }
    
})

app.get('/Parada/BuscarParadasPorLinha', async (req, res) => {
    try{
        const response = await fetch('http://api.olhovivo.sptrans.com.br/v2.1/Parada/BuscarParadasPorLinha?codigoLinha=' + req.query.codigoLinha, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', cookie: 'apiCredentials=' + req.query.tokenConexao + ';' },
        });

        const json = await response.json();
        console.log(json);
        res.send(json)
    } catch (e) {
        console.log(e);
        res.send("Error Connecting");
    }
    
})

app.get('/Previsao/Parada', async (req, res) => {

    try {
        const response = await fetch('http://api.olhovivo.sptrans.com.br/v2.1/Previsao/Parada?codigoParada=' + req.query.codigoParada, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', cookie: 'apiCredentials=' + req.query.tokenConexao + ';' },
        });

        const json = await response.json();
        console.log(json);
        res.send(json)
    } catch (e) {
        console.log(e);
        res.send("Error Connecting");
    }

})

app.get('/Posicao/Linha', async (req, res) => {
    console.log(req.query.codigoLinha);
    console.log(req.query.tokenConexao);    
    try {
        const response = await fetch('http://api.olhovivo.sptrans.com.br/v2.1/Posicao/Linha?codigoLinha=' + req.query.codigoLinha, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', cookie: 'apiCredentials=' + req.query.tokenConexao + ';' },
        });

        const json = await response.json();
        console.log(json);
        res.send(json)
    } catch (e) {
        console.log(e);
        res.send("Error Connecting");
    }

})


app.listen(port, () => {
    console.log(`Proxy app listening at http://localhost:${port}`)
})*/



const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
var cors = require("cors");

const app = express();
const corsOptions = {
   origin: ["http://localhost:3002"],
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

const proxyMiddleware = createProxyMiddleware("/", {
  target: "http://localhost:8080",
  changeOrigin: true,
});

app.use(proxyMiddleware);

app.listen(3002, () => {
  console.log("proxy is listening on port 3001");
});