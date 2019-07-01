//Especificações técnicas:
//Entrada:
// Os valor de pedido será exclusivamente numérico, enquanto a unidade valor aceitará a notação de valor financeiro ou numérica.
// as opções definidas como opt(numero no documento), serão binárias avaliando o delta binario numérico (em português: false vale 0 e true vale 1).
//Saidas:
//será retornado um array com a possível adição de um prefixo de identificação em pedido.
//a saída da unidade valor será formatada para a corrência financeira atual(R$88,88).
//as saídas de opt(numero no documento) terão a simples definição de valor numérico(0 e 1).
// As saídas gerais determinarão o a somatória total dos valores, sua média simples e as relações percentuais dos itens individuais de opt(numero no documento).

var pedidoAtual = [];
var totalPedidos = [];
var pedidosSemVenda = 0;
var resultados = [];

var checarPedido = function(pedido){
    pedido = document.getElementById('numeroPedido').value;
    pedido = +pedido; //inferencia numérica
    if (pedido===0||isNaN(pedido)) {
        alert('Numero de pedido incorreto!');
        throw new TypeError('Not a number!');
      } else {
        return pedido;
      }
};
var checarValor = function(valor){
    valor = document.getElementById('valorPedido').value;
    valor = valor.replace(".", "").replace(",", "");
    valor = +valor; //inferencia numérica
    if (valor===0 || isNaN(valor)) {
        alert('Valor incorreto!');
        throw new TypeError('Not a number!');
      } else {
        return valor;
      }    
};
var checarOpcao = function(opt){
    var respostaDaOpcao = opt.value;
            if (opt.checked == false) {
                respostaDaOpcao = 0;
            }
            else {
                respostaDaOpcao = 1;
            }
    return respostaDaOpcao;
};
var adicionarPedido = function () {
    pedidoAtual.push(checarPedido());
    pedidoAtual.push(checarValor());
    pedidoAtual.push(checarOpcao(document.getElementById('opt1')));
    pedidoAtual.push(checarOpcao(document.getElementById('opt2')));
    pedidoAtual.push(checarOpcao(document.getElementById('opt3')));
    
    totalPedidos.push(pedidoAtual);
    mostrarPedidos();
    calcularTotais();
    mostrarTotais();
    alert("Venda adicionada com sucesso !");
    apagador();
    
};
var mostrarPedidos = function(){
    var saida = document.getElementById('saidaItens');
    var linha = '<tr>';
    for(i=0;i<pedidoAtual.length;i++){
        if(i==1){
            linha += '<td>R$ ' + formatarValor(pedidoAtual[i]) + '</td>';
        } else {
        linha += '<td>' + prefix() + pedidoAtual[i] + '</td>';
        }
    }
    linha += '</tr>';
    pedidoAtual=[];
    saida.innerHTML += linha;
};
var removerPedido = function(){
    var ultimo = document.getElementById('saidaItens');
    ultimo.removeChild(ultimo.lastChild);
    totalPedidos.pop();
    calcularTotais();
    mostrarTotais();
};
var AdicionarSemVenda = function(){  
    alert('Interação sem venda confirmada!');  
    pedidosSemVenda++;
    calcularTotais();
    mostrarTotais();
};
var calcularTotais = function(){
    var total = 0;
    var opt1 = 0;
    var opt2 = 0;
    var opt3 = 0;
    var totalGeral = (totalPedidos.length + pedidosSemVenda);

    for(i=0;i<totalPedidos.length;i++){
        total += totalPedidos[i][1];
        opt1 +=  totalPedidos[i][2];
        opt2 +=  totalPedidos[i][3];
        opt3 +=  totalPedidos[i][4];
    }
    //alert(opt1);
    function media(totalMedio){
        var media = totalMedio/totalGeral;
        if(!isFinite(media)||isNaN(media)){
            media = 0;
        }
        return media;
    }
    function conversao(){
        var conversaoMedia = totalPedidos.length/totalGeral;
        if(!isFinite(conversaoMedia)||isNaN(conversaoMedia)){
            conversaoMedia = 0;
        } 
        return conversaoMedia;
        
    }
    function optRatio(opt){     
        opt = opt/totalPedidos.length;
        if(!isFinite(opt)||isNaN(opt)){
            opt = 0;
        }
        return opt;
        
    }
    resultados.push(media(total));
    resultados.push(total);
    resultados.push(conversao());
    resultados.push(optRatio(opt1));
    resultados.push(optRatio(opt2));
    resultados.push(optRatio(opt3));

};
var mostrarTotais = function(){
    var saida = document.getElementById('saidaTotais');
    var linha = '<tr>';
    for(i=0;i<resultados.length;i++){
        if(i==0 || i==1){
            linha += '<td>R$ ' + formatarValor(resultados[i]) + '</td>';
        } else {
        linha += '<td>' + formatarPorcentagem(resultados[i]) + ' %</td>';
        }
    }
    linha += '</tr>';
    resultados=[];
    saida.innerHTML = linha;
};
var apagador = function() {
    document.getElementById("numeroPedido").value = null;
    document.getElementById("valorPedido").value = null;
    document.getElementById("opt1").checked = false;
    document.getElementById("opt2").checked = false;
    document.getElementById("opt3").checked = false;
};

/*Funções auxiliares de formato de exibição*/
var formatarValor = function(valorintegral){
    valorintegral = ((valorintegral)/100).toFixed(2).replace('R$ ','').replace(',','');
    return valorintegral;
};
var formatarPorcentagem = function(valorReal){
    var real = (valorReal*100).toFixed(2);
    return real;
};
var prefix = function(){
    return 'No ';
};
/* Exporta lista para formato planilha */
function exporter() {
    var tabelahtm = document.getElementById("tabelas");
    var cria = tabelahtm.outerHTML;
    window.open('data:data:application/vnd.ms-excel,' + encodeURIComponent(cria));
    window.close();
}