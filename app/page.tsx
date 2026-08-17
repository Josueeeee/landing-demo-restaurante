"use client";

import { FormEvent, useEffect, useState } from "react";

const menu = {
  Fuego: [
    ["Coliflor entera", "mole de semillas · yogur ahumado · limón", "L 280", "https://images.unsplash.com/photo-1576209151493-cca706964f6f?auto=format&fit=crop&w=1200&q=88"],
    ["Costilla de res", "achiote negro · encurtidos · tortilla de maíz", "L 490", "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=88"],
    ["Pesca del día", "recado verde · plátano · hoja santa", "L 420", "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=1200&q=88"],
  ],
  Tierra: [
    ["Tamal de elote", "quesillo · chile fermentado · culantro", "L 210", "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=88"],
    ["Hongos al rescoldo", "frijol blanco · café · hierbas frescas", "L 260", "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=88"],
    ["Arroz quebrado", "calabaza · mantequilla tostada · pepita", "L 240", "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=88"],
  ],
  Dulce: [
    ["Cacao & sal", "chocolate 70% · maíz inflado · crema ácida", "L 185", "https://images.unsplash.com/photo-1693346300688-064e286c8482?auto=format&fit=crop&w=1200&q=88"],
    ["Piña a la brasa", "ron · coco · chile cobanero", "L 175", "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=88"],
    ["Tres leches", "panela · café de Marcala · canela", "L 170", "https://images.unsplash.com/photo-1675670515307-753fea18fc3d?auto=format&fit=crop&w=1200&q=88"],
  ],
};

export default function Home(){
  const [category,setCategory]=useState<keyof typeof menu>("Fuego");
  const [activeDish,setActiveDish]=useState(0);
  const [sent,setSent]=useState(false);
  const [progress,setProgress]=useState(0);
  const [menuShift,setMenuShift]=useState(0);
  useEffect(()=>{const update=()=>{setProgress(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100);const section=document.getElementById("menu");if(section){const rect=section.getBoundingClientRect();setMenuShift(Math.max(-80,Math.min(80,-rect.top*.08)))}};update();window.addEventListener("scroll",update,{passive:true});return()=>window.removeEventListener("scroll",update)},[]);
  const submit=(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();setSent(true)};
  return <main>
    <nav className="nav"><div className="scroll-progress" style={{width:`${progress}%`}}/><a className="logo" href="#inicio">BRASA<span>NÓMADA</span></a><div><a href="#menu">MENÚ</a><a href="#historia">HISTORIA</a><a href="#ubicacion">UBICACIÓN</a></div><a className="reserve" href="#contacto">RESERVAR MESA ↗</a></nav>
    <a className="floating-reserve" href="#contacto"><span>HOY</span> HAY MESA <b>↗</b></a>
    <section className="hero" id="inicio"><div className="hero-image"><img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=88" alt="Mesa de cocina latinoamericana servida al centro"/><div className="flame-badge">FUEGO<br/>VIVO<br/><span>●</span></div></div><div className="hero-type"><p>COCINA LATINA / TEGUCIGALPA</p><h1>COMER<br/><i>JUNTOS</i><br/>SABE MEJOR.</h1><div className="hero-foot"><p>Producto local, fuego encendido y platos hechos para pasar de mano en mano.</p><span>MAR—DOM<br/>12:00—23:00</span><a href="#menu">VER MENÚ ↓</a></div></div></section>
    <div className="ticker"><span>BRASA · HUMO · MAÍZ · TEMPORADA · </span><span>BRASA · HUMO · MAÍZ · TEMPORADA · </span></div>

    <section className="story" id="historia"><div className="story-head"><span>01 / SOBRE LA MESA</span><h2>NO COCINAMOS<br/>PARA LA FOTO.<br/><i>COCINAMOS PARA VOLVER.</i></h2></div><div className="story-grid"><div className="story-copy"><p>Brasa Nómada recorre América Latina a través de sus fuegos: leña, rescoldo, comal y memoria. El menú cambia con lo que llega del campo y con lo que nos provoca compartir.</p><div><strong>80%</strong><span>producto hondureño</span></div><div><strong>0</strong><span>atajos en cocina</span></div><a className="story-cta" href="#contacto">VEN A PROBARLO <b>↗</b></a></div><figure><img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=88" alt="Plato de cocina de temporada servido en Brasa Nómada"/><figcaption>COCINA ABIERTA · SERVICIO 2026</figcaption></figure></div></section>

    <section className="menu-section" id="menu"><header><span>02 / CARTA</span><p>PARA COMER AL CENTRO</p></header><div className="menu-title"><h2>HOY<br/>EN LA <i>BRASA.</i></h2><div className="menu-tabs" role="tablist">{(Object.keys(menu) as (keyof typeof menu)[]).map(name=><button key={name} className={category===name?"active":""} onClick={()=>{setCategory(name);setActiveDish(0)}} role="tab" aria-selected={category===name}>{name}</button>)}</div></div><div className="menu-experience"><div className="menu-parallax"><img key={menu[category][activeDish][3]} src={menu[category][activeDish][3]} alt={`Plato ${menu[category][activeDish][0]} de Brasa Nómada`} style={{transform:`translate3d(0,${menuShift}px,0) scale(1.18)`}}/><div><span>EN FOCO / 0{activeDish+1}</span><b>{menu[category][activeDish][0]}</b></div></div><div className="menu-list">{menu[category].map((dish,index)=><article key={dish[0]} className={activeDish===index?"selected":""} onMouseEnter={()=>setActiveDish(index)} onFocus={()=>setActiveDish(index)} tabIndex={0}><span>0{index+1}</span><div><h3>{dish[0]}</h3><p>{dish[1]}</p></div><strong>{dish[2]}</strong></article>)}</div></div><p className="menu-note">Pregunta por el menú de sobremesa, vinos naturales y fermentos de la casa.</p></section>

    <section className="fire-break"><div><span>EL FUEGO ES NUESTRO<br/>PRIMER INGREDIENTE.</span><i>↘</i></div><img style={{transform:`translate3d(0,${menuShift*.18}px,0) scale(1.12)`}} src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=88" alt="Vegetales y comida preparada al fuego"/></section>

    <section className="people"><header><span>03 / LAS PERSONAS</span><p>ANTES QUE COCINEROS, SOMOS ANFITRIONES.</p></header><div className="people-layout"><h2>TE RECIBIMOS<br/>COMO <i>EN CASA.</i></h2><div className="chef-card"><div><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=88" alt="Chef de Brasa Nómada en la cocina"/><span>JEFA DE COCINA / 01</span></div><h3>Ana Valdés</h3><p>“La mejor mesa siempre es la que pide un plato más para compartir.”</p></div><div className="quote"><b>4.8</b><span>★★★★★</span><p>“Uno sale oliendo a leña y pensando en cuándo volver.”</p><small>— SOFÍA M. / VISITA VERIFICADA</small></div></div></section>

    <section className="location" id="ubicacion"><div className="location-copy"><span>04 / ENCUÉNTRANOS</span><h2>ALGO BUENO<br/>SE ESTÁ <i>COCINANDO.</i></h2><p>Estamos en el corazón de Palmira. Ven caminando, en carro o siguiendo el olor a leña.</p><a href="https://www.openstreetmap.org/?mlat=14.1057&mlon=-87.2040#map=17/14.1057/-87.2040" target="_blank" rel="noreferrer">ABRIR INDICACIONES <b>↗</b></a></div><div className="map-wrap"><iframe title="Mapa de Brasa Nómada en Palmira, Tegucigalpa" src="https://www.openstreetmap.org/export/embed.html?bbox=-87.213%2C14.098%2C-87.195%2C14.113&layer=mapnik&marker=14.1057%2C-87.2040" loading="lazy"/><div className="map-pin"><span>BRASA<br/>NÓMADA</span><b>●</b></div><div className="map-address">COL. PALMIRA<br/>TEGUCIGALPA · HN</div></div></section>

    <section className="visit" id="contacto"><div className="visit-info"><span>05 / RESERVAS</span><h2>GUARDA<br/>TU <i>MESA.</i></h2><p>Reservas para almuerzo y cena. Para grupos de más de 8 personas, escríbenos directamente.</p><dl><div><dt>Horario</dt><dd>Mar—Dom · 12:00—23:00</dd></div><div><dt>Dirección</dt><dd>Col. Palmira · Tegucigalpa</dd></div><div><dt>Teléfono</dt><dd>+504 2234-8899</dd></div></dl></div>{sent?<div className="booking-success" role="status"><span>✓</span><h3>LA MESA ESTÁ<br/>CASI LISTA.</h3><p>Te contactaremos para confirmar tu reserva.</p><button onClick={()=>setSent(false)}>HACER OTRA RESERVA</button></div>:<form onSubmit={submit}><label>Nombre<input required name="nombre" placeholder="Tu nombre"/></label><div className="form-pair"><label>Fecha<input required name="fecha" type="date"/></label><label>Hora<select name="hora" defaultValue="19:00"><option>12:30</option><option>14:00</option><option>19:00</option><option>20:30</option></select></label></div><div className="form-pair"><label>Personas<select name="personas" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select></label><label>Teléfono<input required name="telefono" type="tel" placeholder="+504 0000-0000"/></label></div><label>Algo que debamos saber<textarea name="nota" placeholder="Alergias, celebración, preferencia de mesa..."/></label><button type="submit">SOLICITAR RESERVA <span>↗</span></button><small>La reserva queda confirmada cuando nuestro equipo te contacte.</small></form>}</section>
    <footer><a className="logo footer-logo" href="#inicio">BRASA<span>NÓMADA</span></a><p>COCINA LATINA<br/>AL FUEGO</p><div><a href="#menu">MENÚ</a><a href="#historia">HISTORIA</a><a href="#contacto">RESERVAS</a></div><small>DEMO CONCEPTUAL © 2026<br/>FOTOGRAFÍAS: UNSPLASH</small></footer>
  </main>
}
