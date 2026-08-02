import React, { useState } from "react";
import Carousel from "./componentes-encabezado/carrusel";
import { motion, AnimatePresence } from "framer-motion";
import Itinerario from "./Itinerario";
import Confirmacion from "./componentes-encabezado/Confirmacion";
import EventoDireccion from "./componentes-encabezado/Ubicacion";
import DressCodePremium from "./componentes-encabezado/codigovestimenta";
import FrasePersonalizada from "./componentes-encabezado/FrasePer";
import LugaresYFamilia from "./componentes-encabezado/Agradecimiento";
import LluviaDeSobres from "./componentes-encabezado/LluviadeSobres";


export default function PaginaPrincipal() {
   // Estados para manejar boton de album
  const [open, setOpen] = useState(false);
  // Estados para manejar el formulario
  
  const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};
// Estados para manejar boton de tarjeta bancaria

  const[mostrarModal, setMostrarModal] = useState(false)
  const [copiado, setCopiado] = useState(false);
  const copiarCuenta = () => {
  navigator.clipboard.writeText("1234 5678 9012 3456");
  setCopiado(true);

  setTimeout(() => {
    setCopiado(false);
  }, 2000);
};
  




  return (
    <div >

<FrasePersonalizada/>

<EventoDireccion/>

 <LugaresYFamilia/>

<Itinerario />
 
    
<LluviaDeSobres/>
  
  
<Confirmacion/>
  

      </div>      
  );
}
