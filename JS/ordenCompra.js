var ordenes = [];


function Orden (numero, fecha, proveedor, detalle, estado ) {
    this.numero = numero;
    this.fecha= fecha;
    this.proveedor = proveedor;
    this.detalle = detalle;
    this.estado = estado;

}

//Función para llenar el array de ordenes.
function addOrdenesArray(){
    
    var numero = document.getElementById("idNoOrden").value;
    var fecha = document.getElementById("idFechaOrden").value;
    var proveedor= document.getElementById("idProveedoresOrden").value;
    //var detalle = JSON.parse(localStorage.getItem('LSDetalles'));
    var estado = "solicitado";

    var orden= new Orden(numero, fecha, proveedor, detalles, estado);
    ordenes.push(orden);
}

//Va a traer los datos de la orden al localStorage
function cargarDatosOrden(){
    if(localStorage.getItem('LSOrdenes')){
        ordenes = JSON.parse(localStorage.getItem('LSOrdenes'));
    }
    return;
}

//Función para guardar los datos en el LocalSotorage
function setOrden(){
    localStorage.setItem('LSOrdenes', JSON.stringify(ordenes));
}

//Función para alertar al usuario si ha quedado algun campo vacio.
function ValidarDatosOrden(){
    if (document.getElementById("idNoOrden").value == ""){
        alert("El campo NUMERO DE ORDEN no debe quedar vacío");
        return false;
    }
    if (document.getElementById("idFechaOrden").value == ""){
        alert("El campo FECHA no debe quedar vacío");
        return false;
    }
    
    if(ExisteOrden(document.getElementById("idNoOrden").value)){
        alert("Ya existe una orden con este codigo");
        return false;
    }
}



function ExisteOrden(codigo){
    for(let i = 0; i<ordenes.length; i++){
        if(ordenes[i].numero == codigo){
            return true;
        }
    }
    return false;
}

function limpiarCamposOrden(){

    document.getElementById("idNoOrden").value = "";
    document.getElementById("idFechaOrden").value = "";
}

//Cuando se envia la orden es necesario limpiar el detalle. El detalle se guarda temporalmente en el localStorage
//hasta que es asignado a la orden que corresponde, con esta función se limpia cuando ya no lo necesito

function limpiarDetalle(){
    detalles = [];
    setDetalle();
}

//Función para agregar una orden de compra
function addOrden( ){
    
    cargarDatosOrden();
    if (ValidarDatosOrden() == false){
        return false;
    }

    //se llena el array de ordenes
    addOrdenesArray();
     //guarde las ordenes
    setOrden();
    //limpia los campos para poder volver a usarlos.
    limpiarCamposOrden();
    //limpia la tabla donde estan los detalles
    limpiarDetalle();

}

//llenar tabla de estados, en ella el administrador podrá actualizar los estados o eliminar la orden.
function llenarTablaEstados(){
    cargarDatosOrden();
    var scriptTabla = "";
 
    for (let index = 0; index < ordenes.length; index++) {
        scriptTabla += "<tr>";
        scriptTabla += "<td>" + ordenes[index].numero + "</td>" ;
        scriptTabla += '<td>' + ordenes[index].fecha+ "</td>" ;
        scriptTabla += '<td>' + ordenes[index].proveedor + "</td>" ;
        scriptTabla += '<td>' + ordenes[index].estado + "</td>" ;
        scriptTabla += '<td>';
        if(ordenes[index].estado != "recibido"){
            scriptTabla += '<div>';
            scriptTabla += '<select name="" id="idEstadoOrden'+index+'">';
            scriptTabla +=  '<option value="solicitado">' + 'solicitado' + '</option>';
            scriptTabla +=  '<option value="transito">'+'transito'+'</option>';
            scriptTabla += '<option value="recibido">'+'recibido'+'</option>';
            scriptTabla += '</select>';
            scriptTabla += '</div>';
            scriptTabla += '<br>';
        }
        scriptTabla += '<div class="cdiv">';
        if(ordenes[index].estado != "recibido"){
            scriptTabla += '<button type= "button" class = "mas" onclick="actualizarEstado('+index+'); AgregarExistencia('+index+')">'+'Actualizar'+'</button>';
        }
        scriptTabla += '<button type= "button" class = "menos" onclick="eliminarOrden('+index+'); location.reload()">'+'Eliminar'+'</button>';
        scriptTabla += '</div>';
        scriptTabla += '</td>'
        scriptTabla += "</tr>";
       
    }
    

    document.getElementById("idTablaEstados").innerHTML = scriptTabla;
}


function eliminarOrden(i){
    if(confirm("esta seguro de eliminar este elemento")){
        ordenes.splice(i,1);
        localStorage.setItem('LSOrdenes', JSON.stringify(ordenes));
        llenarTablaEstados();
    }
}

//Es llamada con el botón actualizar, para poder cambiar de estado: solicitado, transito o recibida.
function actualizarEstado(i){
    if(confirm("¿Está seguro de cambiar de estado?")){
        ordenes[i].estado =  document.getElementById("idEstadoOrden"+i).value;
        localStorage.setItem('LSOrdenes', JSON.stringify(ordenes));
        llenarTablaEstados();
    }
}

// Manejo de las existencias

//Función para buscar producto por nombre
function BuscarProductoOrden(nproducto){
    debugger
    cargarDatos();
    for(let i=0; i< productos.length; i++){
       if(productos[i].nombre = nproducto){
          
           return i;
       }
    }
}

//Suma la cantidad del pedido de las ordenes en estado recibido a las existencias
function AgregarExistencia(i){
  debugger;
    if(ordenes[i].estado == 'recibido'){   
        for (let e = 0; e < ordenes[i].detalle.length; e++){
         let u =   BuscarProductoOrden(ordenes[i].detalle[e].nproducto);  
          productos[u].existencia = parseInt(productos[u].existencia)  + parseInt(ordenes[i].detalle[e].cantidadOrden);
        }            
    }
    setProducto();
}



