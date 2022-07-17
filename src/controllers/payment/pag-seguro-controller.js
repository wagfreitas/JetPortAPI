// Configuração Controller
/**
 * @author 
 */
'use sctict'
var axios = require("axios");
var parser = require("xml2json");
var convert = require("xml-js");
const request = require('request');
const token = "D7BFCB2A51534BB6B38E305B14C73A23";
const pagbase = "https://ws.sandbox.pagseguro.uol.com.br";
const email = "vinassis@gmail.com";
const urlPagSeguroDirectPayment = "https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js";
const urlTransacao = 'https://ws.sandbox.pagseguro.uol.com.br/v2/transactions/';
 
exports.post = async (req, res) => {
    axios.default
    .post(`${pagbase}/v2/sessions?email=${email}&token=${token}`, {})
    .then((pagresponse) => {
      if (pagresponse.status === 200) {
        res.status(200).send(parser.toJson(pagresponse.data));
      } else {
        res.status(pagresponse.status).send(pagresponse.data);
      }
    })
    .catch((err) => {
      res.status(400).send({ erro: err });
    });
}; 


exports.pagamento = ( (req, res) => {
  const { email, data } = req.body;
  if (!email || !data) {
    res.status(400).send({ mensagem: "Ausência de parâmetros" });
  }
 
  if (!"payment" in data) {
    res.status(400).send({ mensagem: "Ausência de parâmetros" });
  }

  const { payment } = data;

  if (
    !"method" in payment ||
    !"sender" in payment ||
    !"items" in payment ||
    !"creditCard" in payment
  ) {
    res.status(400).send({ mensagem: "Ausência de parâmetros" });
  }
  var options = { compact: true, ignoreComment: true, spaces: 4 };

  axios.default
    .post(
      `${pagbase}/v2/transactions?email=${email}&token=${token}`,
      convert.json2xml(data, options),
      {
        headers: {
          "Content-Type": "application/xml; charset=ISO-8859-1",
        },
      }     
    )
    .then(pagresponse => {
    console.log(`resposta, ${pagresponse.data}`)
      if (pagresponse.status === 200) {
        res.status(200).send({ mensagem: "Pagamento realizado" });
      } else {
        res.status(pagresponse.status).send(pagresponse.data);
      }
    })
    .catch((err) => {
     // console.error(err);
      console.log('esse foi o erro que foi encontrado', err)
      res.status(400).send({ erro: err });
    })


});