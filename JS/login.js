function loginUsuario(){
    let usuario = document.getElementById("IdNombre").value;
    let contra = document.getElementById("idContraseña").value;
    if( usuario == ""){
        alert("Falta el usuario");
        return;
    }
    if(contra == ""){
        alert("Falta la contraseña");
        return;
    }

    if(usuario == "admin" && contra == "admin"){
        window.location = "IngresoDeProductos.html";
        return;
    }
    else{
        if(usuario == "comprador" && contra == "comprador"){
            window.location = "OrdenCompra.html";
            return;
        }
        if(usuario == "cliente" && contra == "cliente"){
            window.location = "../index.html";
            return;
        }
        else{
            alert("Usuario y/o contraseña");
            return;
        }
    }
}