class Gastos{
  constructor(gasto, valor){
    this.gasto = gasto;
    this.valor = valor;
  }     
}

// DOM
let inputPresupuesto = document.getElementById('inputPresupuesto');
let inputAñadirNombre = document.getElementById('inputAñadirNombre');
let inputAñadirGasto = document.getElementById('inputAñadirGasto');
let btnCalcular = document.getElementById('btn-calcular');
let btnAñadir = document.getElementById('btn-añadir');
let contenidoPresupuesto = document.getElementById('contenidoPresupuesto')
let contenidoGasto = document.getElementById('contenidoGasto')
let mensajeVacio = 'Debe llenar el campo '
let mensajePositivo = 'Debe ingresar un número positivo o mayor a 0 para '
let compras = [];
let gastos = 0;
let saldo = 0;

btnCalcular.addEventListener("click", () => {

  if(validacion_campo_lleno(inputPresupuesto.value)){
      alert(`${mensajeVacio} ${inputPresupuesto.name}`)
      inputPresupuesto.value=''
      inputPresupuesto.focus()
      return
  }
  else if(validacion_campo_positivo(inputPresupuesto.value)){
      alert(`${mensajePositivo} ${inputPresupuesto.name}`)
    inputPresupuesto.value=''
    inputPresupuesto.focus()
    return
  } 
  else {
      contenidoPresupuesto.innerHTML = `
  <tr>
      <td id='presupuesto'><span>$</span> ${inputPresupuesto.value}</td>
      <td><span>$</span> 0</td>
      <td><span>$</span> 0</td>
    </tr>
    `;
  }

  });


  btnAñadir.addEventListener("click", () => {

      if(validacion_campo_lleno(inputAñadirNombre.value)){
          alert(`${mensajeVacio} ${inputAñadirNombre.name}`)
          inputAñadirNombre.focus()
          return
      }

      else if(validacion_campo_lleno(inputAñadirGasto.value)){
          alert(`${mensajeVacio} ${inputAñadirGasto.name}`)
          inputAñadirGasto.focus()
          return
      }
      else if (validacion_campo_positivo(inputAñadirGasto.value)){
          alert(`${mensajePositivo} ${inputAñadirGasto.name}`)
          inputAñadirGasto.value=''
          inputAñadirGasto.focus()
          return
      }
  else {
      const nuevoGasto = new Gastos(inputAñadirNombre.value, inputAñadirGasto.value)
      compras.push(nuevoGasto)
      gastos = gastos + parseInt(inputAñadirGasto.value)
      console.log(compras)
      viewProductos()
      viewPresupuesto()
    } 

    inputAñadirGasto.value=''
    inputAñadirNombre.value=''
    inputAñadirNombre.focus()
    if(inputPresupuesto.value == ''){
      alert('Primero ingrese su presupuesto')
      inputPresupuesto.focus()
    }    
      });


  // VALIDACION
  const validacion_campo_lleno = (campo) => { return campo == '' ? true: false }
  const validacion_campo_positivo = (campo) => { return  campo <= 0 ? true: false }



const viewProductos = () => {
contenidoGasto.innerHTML = "";
for (let i = 0; i < compras.length; i++) {
  contenidoGasto.innerHTML += `
      <tr id='fila${i}'>
          <td >${compras[i].gasto}</td>
          <td><span>$</span> ${compras[i].valor}</td>
          <td><button id='trash' style="background-color: transparent; border: none" onclick='quitar(${i})'> <i class="fa-solid fa-trash-can"></i> </button></td>
        </tr>
        `;
}
};

const viewPresupuesto = () => {
  saldo = parseInt(inputPresupuesto.value) - gastos
  contenidoPresupuesto.innerHTML = `
        <tr>
            <td id='presupuesto'><span>$</span> ${inputPresupuesto.value}</td>
            <td><span>$</span> ${gastos}</td>
            <td><span>$</span> ${saldo} </td>
          </tr>
          `; 
}

const quitar = (id) => {
      // console.log(id)
  let elementoEliminar = document.getElementById(`fila${id}`);
  let tomardato = parseInt(compras[id].valor)
      gastos = gastos - tomardato
      // console.log(tomardato)
      elementoEliminar.remove();
      compras.splice(id,1);
      console.log(compras)
      viewProductos()
      viewPresupuesto()  
}

  const resta = (a,b )=>{
      return a-b
    }