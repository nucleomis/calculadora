
var Calculadora = function() {
  var self = this;
  this._resultado_acumulado = 0;
  this._saveMemory = [];
  this._operaciones = {
    sumar: function(valor) {
      self._resultado_acumulado += valor;
      self._resultado();
    },
    restar: function(valor) {
      self._resultado_acumulado -= (valor);
      self._resultado();
    },
    multiplicar: function(valor) {
      self._resultado_acumulado *= valor;
      self._resultado();
    },
    dividir: function(valor) {
      if (valor === 0) {
        document.getElementById("operacion").value = "";
        throw('Error al intentar divir por cero');
      }
      self._resultado_acumulado = self._resultado_acumulado/valor;
      self._resultado();
    },
    dividir2: function(valor){
      if (valor[1] == 0) {
        document.getElementById("operacion").value = "";
        throw('Error al intentar divir por cero');
      }
      else{
        self._resultado_acumulado += valor[0]/valor[1];
        self._resultado();
      }
    }
  };
};

Calculadora.prototype.calcular = function () {
};

Calculadora.prototype.usar = function (operacion) {
  this.calcular = this._operaciones[operacion];
  return this;
};
  Calculadora.prototype.limpiar = function () {
  this._resultado_acumulado = 0;
  document.getElementById("resultado").value="";
  document.getElementById("operacion").value="";
  this._resultado();
};

Calculadora.prototype._resultado = function () {
  document.getElementById("resultado").value = this._resultado_acumulado;

};

Calculadora.prototype.memorizar = function() {
  if (this._memoria === undefined) {
    this._memoria = this._resultado_acumulado;
  } else {
    this._resultado_acumulado = this._memoria;
    this._memoria = undefined;
  };
};

//-----------------------------------------------------------------
//global
  var miCalculadora = new Calculadora();
  var memoria = [];
//---------------------------------------------------------------
  //mi codigo
  accionSumar=()=>{
    operacion = document.getElementById("operacion").value;
    result = document.getElementById("resultado").value;
    if(operacion.indexOf("+")==0){
      miCalculadora.usar('sumar').calcular(parseInt(operacion.substring(1,operacion.length)));
      document.getElementById("operacion").value = "";
      accionGuardar(result+operacion+"="+eval(result+operacion));
    }
    else if (operacion.lastIndexOf("+")>0){
      lista = operacion.split("+");
      suma = parseInt(lista[0])+parseInt(lista[1]);
      accionGuardar(operacion+"="+suma);
      accionLimpiar();
      miCalculadora.usar('sumar').calcular(suma);
      document.getElementById("operacion").value = "";
    }
    else if (operacion.lastIndexOf("-")>0){accionRestar();}
    else if (operacion.lastIndexOf("*")>0){accionMultiplicar();}
    else if (operacion.lastIndexOf("/")>0){accionDividir();}
    else{
      document.getElementById("operacion").value += "+";
    }
  }
//-----------------------------------------------------------------
  accionRestar=()=>{
    operacion = document.getElementById("operacion").value;
    result = document.getElementById("resultado").value;

    if(operacion.indexOf("-")==0){
      miCalculadora.usar('restar').calcular(parseInt(operacion.substring(1,operacion.length)));
      document.getElementById("operacion").value = "";
      accionGuardar(result+operacion+"="+eval(result+operacion));
    }
    else if (operacion.lastIndexOf("-")>0){
      lista = operacion.split("-");
      resta = parseInt(lista[0])-parseInt(lista[1]);
      accionGuardar(operacion+"="+resta);
      accionLimpiar();
      miCalculadora.usar('sumar').calcular(parseInt(resta));
      document.getElementById("operacion").value = "";
    }
    else if(operacion.indexOf("+")>=0){accionSumar();}
    else if (operacion.lastIndexOf("*")>0){accionMultiplicar();}
    else if (operacion.lastIndexOf("/")>0){accionDividir();}
    else{
      document.getElementById("operacion").value += "-";
    }
  }
  //-----------------------------------------------------------------
  accionMultiplicar = () =>{
    operacion = document.getElementById("operacion").value;
    result = document.getElementById("resultado").value;

    if(operacion.indexOf("*")==0){
      miCalculadora.usar('multiplicar').calcular(parseInt(operacion.substring(1,operacion.length)));
      document.getElementById("operacion").value = "";
      accionGuardar(result+operacion+"="+eval(result+operacion));
    }
    else if(operacion.lastIndexOf("*")>=1){
      lista = operacion.split("*");
      multiplicacion = parseInt(lista[0])*parseInt(lista[1]);
      accionGuardar(operacion+"="+multiplicacion);
      accionLimpiar();
      miCalculadora.usar("multiplicar").calcular(multiplicacion);
      document.getElementById("operacion").value = "";
    }
    else if(operacion.indexOf("+")>=0){accionSumar();}
    else if(operacion.indexOf("-")>=0){accionRestar();}
    else{
      document.getElementById("operacion").value += "*";
    }
  }
//-----------------------------------------------------------------
  accionDividir = () =>{
    operacion = document.getElementById("operacion").value;
    result = document.getElementById("resultado").value;

    if(operacion.indexOf("/")==0){
      miCalculadora.usar('dividir').calcular(parseInt(operacion.substring(1,operacion.length)));
      document.getElementById("operacion").value = "";
      accionGuardar(result+operacion+"="+eval(result+operacion));
    }
    else if(operacion.lastIndexOf("/")>=1){
      lista = operacion.split("/");
      division = parseInt(lista[0])/parseInt(lista[1]);
      accionGuardar(operacion+"="+division);
      accionLimpiar();
      miCalculadora.usar("dividir2").calcular(lista);
      document.getElementById("operacion").value = "";
    }
    else if(operacion.indexOf("+")>=0){accionSumar();}
    else if(operacion.indexOf("-")>=0){accionRestar();}
    else if(operacion.indexOf("*")>=0){accionMultiplicar();}
    else{
      document.getElementById("operacion").value += "/";
    }
  }
//-----------------------------------------------------------------
  accionIgual = () =>{
    var operacion = document.getElementById("operacion").value;
    if(operacion.indexOf("/")>=0){accionDividir();}
    else if(operacion.indexOf("+")>=0){accionSumar();accionMostrar();}
    else if(operacion.indexOf("-")>=0){accionRestar();accionMostrar();}
    else if(operacion.indexOf("*")>=0){accionMultiplicar();accionMostrar();}
    //accionMostrar();
  }
//-----------------------------------------------------------------
  accionGuardar = (valor) =>{
    memoria.push(valor);
  }
//------------------------------------------------------------------
  accionMostrar = () =>{
    operacion = document.getElementById("operacion").value;
    resultado = document.getElementById("resultado").value;

    contenido = document.createElement("h4");
    contenido.style.textAlign = "center";
    contenido.style.color = "black";
    contenido.innerText= memoria[memoria.length-1];
    var bloque = document.getElementById("container-history");
    bloque.appendChild(contenido);
  }

  accionLimpiar=()=>{miCalculadora.limpiar();}