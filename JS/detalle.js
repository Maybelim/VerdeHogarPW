//Se crea el detalle, y las funciones necesarias
var detalles = [];

// constructor
function Detalle ( nproducto, cantidadOrden, precioU) {
   
    this.nproducto = nproducto,
    this.cantidadOrden = cantidadOrden,
    this.precioU = precioU
    
}


//Función para llenar el array Detalles
function addDetalleArray(){
    
   
    var nproducto = document.getElementById("idProductoOrden").value;
    var cantidadOrden = document.getElementById("idCantidadOrden").value;
    var precioU = document.getElementById("idPrecioOrden").value;
    
    
    var detalle = new Detalle(nproducto, cantidadOrden, precioU);
    detalles.push(detalle);
}

//Función para poblar la tabla de detalles que se visualiza en la página de ordenes de compra
function LlenarTablaDetalle(){

    var total = 0;
    var scriptTabla = "";
    var script = "";

    for (let index = 0; index < detalles.length; index++) {
        scriptTabla += "<tr>";
        scriptTabla += "<td>" + detalles[index].nproducto+ "</td>" ;
        scriptTabla += '<td class = "tdright">' + detalles[index].cantidadOrden+ "</td>" ;
        scriptTabla += '<td class = "tdright">' + detalles[index].precioU + "</td>" ;
        scriptTabla += '<td class = "tdright">' + detalles[index].cantidadOrden * detalles[index].precioU + "</td>";
        scriptTabla += '<th>';
        scriptTabla += '<button type= "button" class = "mas" onclick = "eliminarDetalle('+index+')">'+ 'X' + '</button>';
        scriptTabla += '</th>';
        scriptTabla += "</tr>";
        total += (detalles[index].cantidadOrden * detalles[index].precioU);
       
    }
     
    //Boton fuera de la tabla para agregar la orden de compra.

    script = '<input type="button" value="Enviar Orden" class="btn btn-success"  onclick="addOrden(); location.reload(); addEstado();" >' + '</input>';
    

    document.getElementById("idTablaDetalle").innerHTML = scriptTabla;
    document.getElementById("totalOrden").innerHTML = "Total: "+total;
    document.getElementById("idDivOrden").innerHTML = script;
}

//Función para avisa al comprador que no queden vacios los campos. 

function validarCamposDetalle(){

    if (document.getElementById("idProductoOrden").value == ""){
        alert("El campo PRODUCTO no debe quedar vacío");
        return false;
    }

    if (document.getElementById("idCantidadOrden").value == ""){
        alert("El campo CANTIDAD no debe quedar vacío");
        return false;
    }
    if (document.getElementById("idPrecioOrden").value == ""){
        alert("El campo PRECIO no debe quedar vacío");
        return false;
    }

}

// lipia controles para que pueda seguir ingresando otros datos.
function cleanControlsDetalle(){
    document.getElementById("idCantidadOrden").value = "";
    document.getElementById("idPrecioOrden").value = "";
}


// Función que agrega y guarda el detalle, se envia a llamar cuando se da click sobre botón GUARDAR.

function addDetalle() {

    //Validar campos
    if (validarCamposDetalle() == false){
        return false;
    }

    cargarDatosDetalle();
    
    //Agregar el producto al array
    addDetalleArray();
      
    //guardar en Local Storage el producto
    setDetalle();

    //Poblamos la tabla
    LlenarTablaDetalle();

    // Limpiamos los campos
    cleanControlsDetalle();

}

//Guardar detalle en localStorage, el cual  servirá temporalmente.

function setDetalle(){
    localStorage.setItem('LSDetalles', JSON.stringify(detalles));
}

//Función para cargar los datos desde le localSotorage al array
function cargarDatosDetalle() {
    if(localStorage.getItem('LSDetalles')){
 detalles = JSON.parse(localStorage.getItem('LSDetalles'));}
 return;
}

//eliminar detalle, si desea eliminar algun producto del detalle, se manda a llamar cuando se hace click sobre botón rojo.
function eliminarDetalle(i){
    if(confirm("esta seguro de eliminar este detalle")){
        detalles.splice(i,1);
        localStorage.setItem('LSDetalles', JSON.stringify(detalles));
        LlenarTablaDetalle();
    }
}

