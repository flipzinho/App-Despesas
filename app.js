class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo 
        this.descricao = descricao
        this.valor = valor 
    }
    validarDados(){
        for(let i in this){
           if(this[i] == undefined || this[i] =='' || this[i] == null){
               return false
           }
        }
        return true
    }
}
class Bd {
    constructor(){
        let id = localStorage.getItem('id')
        if (id === null ){
            localStorage.setItem('id', 0)
        }
    }
   getProximoId(){
       let proximoId = localStorage.getItem('id')
    return(Number(proximoId)+1)
   }
    gravar(d){
      let id =  this.getProximoId()
      localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id )
    }
    recuperarRegistros(){
     let despesas = Array()

     
        let id =  localStorage.getItem('id')
      //recuperar todas as despesas
      for(let i = 1 ; i <=id; i++){
          let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa === null){
                //pular a proxima interacao do laço
                continue
            }
            despesa.id = i
          despesas.push(despesa)
          
      }
           return despesas  
    }
    pesquisar(despesa){
let despesasFiltradas = Array()
despesasFiltradas = this.recuperarRegistros()

if(despesa.ano!=''){
  console.log('filtro de ano')
  despesasFiltradas = despesasFiltradas.filter(d=> d.ano == despesa.ano)
}
if(despesa.mes != ''){
  console.log('mes')
  despesasFiltradas = despesasFiltradas.filter(d=> d.mes == despesa.mes)
}
if(despesa.dia!=''){
  console.log('filtro de dia')
  despesasFiltradas = despesasFiltradas.filter(d=> d.dia == despesa.dia)
}
if(despesa.tipo!=''){
  despesasFiltradas = despesasFiltradas.filter(d=> d.tipo == despesa.tipo)
}
if(despesa.descricao!=''){
  despesasFiltradas = despesasFiltradas.filter(d=> d.descricao == despesa.descricao)
}
if(despesa.valor!=''){
  despesasFiltradas = despesasFiltradas.filter(d=> d.descricao == despesa.valor)
}
return despesasFiltradas
    }
    remover(id){
      localStorage.removeItem(id)
    }
}
let bd = new Bd()


function cadastrar(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia =  document.getElementById('dia')
    let tipo =  document.getElementById('tipo')
    let descricao = document.getElementById ('descricao')
    let valor =  document.getElementById('valor')
    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value,
        tipo.value, 
        descricao.value, 
        valor.value
        )
      if(despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById('cor').className = 'modal-header text-success'
        document.getElementById('botao').className = 'btn btn-success'
        
          document.getElementById('modal_titulo').innerHTML = 'Dados validados'
          document.getElementById('corpo').innerHTML = 'Seus dados já foram salvos'
            $('#modalDespesa').modal('show')
            //zerar input apos validação
            ano.value =''
            mes.value =''
            dia.value =''
            tipo.value =''
            descricao.value =''
            valor.value =''
       
      }
      else{
          document.getElementById('cor').className = 'modal-header text-danger'
          document.getElementById('botao').className = 'btn btn-danger'
        
        document.getElementById('modal_titulo').innerHTML = 'Dados inválidados, insira novamente.'
        document.getElementById('corpo').innerHTML = 'Algum dos espaços está vazio, preencha todos.'
          $('#modalDespesa').modal('show')
      }
        
}
function carregalistaDespesas(){
    let despesas = Array()

  despesas =  bd.recuperarRegistros()
  console.log(despesas)
  var listaDespesas = document.getElementById('listaDespesas')
  //percorrer o array
  despesas.forEach(function(d){
    //criando tr
   let linha = listaDespesas.insertRow()
   
   //inserir valores(td)
   linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}`
   
   switch(d.tipo){
     case '1': d.tipo = 'Alimentação'
     break
     case '2': d.tipo  ='Educação'
     break
     case '3': d.tipo = 'Lazer'
     break
     case '4': d.tipo = 'Saúde'
     break
     case '5': d.tipo = 'Transporte'
     break
   }
   linha.insertCell(1).innerHTML = d.tipo
   linha.insertCell(2).innerHTML = d.descricao
   linha.insertCell(3).innerHTML = d.valor
   let btn = document.createElement("button")
   btn.className = 'btn btn-lg btn-danger'
   btn.innerHTML = '<i class="far fa-times-circle"></i>'
   btn.id = `id_despesa${d.id}`
   btn.onclick = function(){
    
     let id = this.id.replace('id_despesa', '')
     
     bd.remover(id)
     
     window.location.reload()
   }
   linha.insertCell(4).append(btn)
  })
}
function pesquisarDespesa(){
  let ano = document.getElementById('ano').value
  let mes = document.getElementById('mes').value
  let dia = document.getElementById('dia').value
  let tipo = document.getElementById('tipo').value
  let descricao  = document.getElementById('descricao').value
  let valor = document.getElementById('valor').value

  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
  let listaDespesas = document.getElementById('listaDespesas')
  listaDespesas.innerHTML =''
  
  let despesas = bd.pesquisar(despesa)
  despesas.forEach(function(d){
    //criando tr
   let linha = listaDespesas.insertRow()
   
   //inserir valores(td)
   linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}`
   
   switch(d.tipo){
     case '1': d.tipo = 'Alimentação'
     break
     case '2': d.tipo  ='Educação'
     break
     case '3': d.tipo = 'Lazer'
     break
     case '4': d.tipo = 'Saúde'
     break
     case '5': d.tipo = 'Transporte'
     break
   }
   linha.insertCell(1).innerHTML = d.tipo
   linha.insertCell(2).innerHTML = d.descricao
   linha.insertCell(3).innerHTML = d.valor
   
  })
}
