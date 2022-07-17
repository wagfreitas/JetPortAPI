// Configuração Rotas de Pagamento
/**
 * @author Wagner Alves
 */

'use sctict'

const express = require('express');
const router = express.Router();
const verifyJWT = require("../bin/verifyJWT");
const pag_seguro = require('../controllers/payment/pag-seguro-controller'); // Para envio de campanha

router.post('/session',  pag_seguro.post);
router.post('/pagamento',  pag_seguro.pagamento);



module.exports = router;