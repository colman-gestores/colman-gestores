
import { useState, useEffect, useCallback } from "react";

// ── DATOS INICIALES ─────────────────────────────────────────────────────────
const CLIENTES_BASE = [
  {id:"c1",nombre:"Figueroa Hernan Agustin",zona:"Norte",pago:"Bien",monto:"$445.180",fecha:"2027-03-01",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c2",nombre:"Vargas Marcela Noemi",zona:"Norte",pago:"Bien",monto:"$1.212.950",fecha:"2026-06-27",cuotas:0,deuda:"",ultima:"Actualmente",obs:"Dos créditos"},
  {id:"c3",nombre:"Chavez Juan Manuel",zona:"Norte",pago:"Mal",monto:"$300.000",fecha:"",cuotas:0,deuda:"",ultima:"",obs:"Atrasado CrediColman"},
  {id:"c4",nombre:"Saavedra Adriana",zona:"Norte",pago:"Bien",monto:"$200.000",fecha:"2026-10-18",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c5",nombre:"Cañizares Dario Ruben",zona:"Norte",pago:"Medio",monto:"$600.000",fecha:"2026-10-07",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c6",nombre:"Vazquez Jaqueline Gloria",zona:"Norte",pago:"Bien",monto:"$150.000",fecha:"2026-09-27",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c7",nombre:"Renfiges Jose Jonatan",zona:"Norte",pago:"Medio",monto:"$2.796.730",fecha:"2026-12-03",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c8",nombre:"Jurado Carlos Modesto",zona:"Norte",pago:"Bien",monto:"$900.000",fecha:"2026-10-07",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c9",nombre:"Huanca Lidia",zona:"Norte",pago:"Bien",monto:"$1.161.000",fecha:"2026-09-27",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c10",nombre:"Garcia Mirta Estela",zona:"Norte",pago:"Bien",monto:"$800.000",fecha:"2026-06-11",cuotas:0,deuda:"",ultima:"Actualmente",obs:"3 créditos"},
  {id:"c11",nombre:"Saracho Eduardo Alejandro",zona:"Norte",pago:"Bien",monto:"$1.000.000",fecha:"2026-09-30",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c12",nombre:"Martinez Luisa Elena",zona:"Norte",pago:"Bien",monto:"$1.000.000",fecha:"2026-10-06",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c13",nombre:"Espinosa Maria Cristina",zona:"Norte",pago:"Bien",monto:"$2.000.000",fecha:"2026-10-18",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c14",nombre:"Cutipa Francisco",zona:"Norte",pago:"Mal",monto:"$800.000",fecha:"",cuotas:0,deuda:"",ultima:"",obs:""},
  {id:"c15",nombre:"Aparicio Nelida",zona:"Norte",pago:"Medio",monto:"$500.000",fecha:"2026-11-07",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c16",nombre:"Ortega Carina Mabel",zona:"Oeste",pago:"Bien",monto:"$500.000",fecha:"2026-09-11",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c17",nombre:"Jorge Jaqueline Melisa",zona:"Oeste",pago:"Medio",monto:"$700.000",fecha:"2026-10-07",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c18",nombre:"Lamas Alicia Milagro",zona:"Oeste",pago:"Medio",monto:"$500.000",fecha:"2026-10-05",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c19",nombre:"Mamani Erika Yanina",zona:"Oeste",pago:"Bien",monto:"$800.000",fecha:"2026-06-27",cuotas:0,deuda:"",ultima:"Actualmente",obs:"Dos créditos"},
  {id:"c20",nombre:"Portal Ortiz Claudia Susana",zona:"Oeste",pago:"Bien",monto:"$500.000",fecha:"2026-09-27",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c21",nombre:"Vilte Maria De Los Angeles",zona:"Oeste",pago:"Mal",monto:"$1.145.850",fecha:"",cuotas:0,deuda:"",ultima:"",obs:"Paga mal"},
  {id:"c22",nombre:"Alvarado Diego Armando",zona:"Oeste",pago:"Mal",monto:"$300.000",fecha:"2026-10-06",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c23",nombre:"Monetengro Maximiliano",zona:"Sudeste",pago:"Bien",monto:"$300.000",fecha:"2026-10-04",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c24",nombre:"Casimiro Constanza Belen",zona:"Sudeste",pago:"Bien",monto:"$1.586.660",fecha:"2027-01-23",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c25",nombre:"Coria Pamela Alejandra",zona:"Sudeste",pago:"Bien",monto:"$770.061",fecha:"2026-10-05",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c26",nombre:"Beeche Isaias Alexander",zona:"Sudeste",pago:"Bien",monto:"$300.004",fecha:"2026-10-23",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c27",nombre:"Zulema Esteban Mabel",zona:"Sudeste",pago:"Bien",monto:"$800.000",fecha:"2026-10-28",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c28",nombre:"Navarro Ana Maria",zona:"Sudeste",pago:"Bien",monto:"$500.000",fecha:"2026-10-04",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c29",nombre:"Aguilera Rogelio",zona:"Sudeste",pago:"Medio",monto:"$975.000",fecha:"2026-12-01",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c30",nombre:"Fontañez Andrea",zona:"Sudeste",pago:"Mal",monto:"$150.000",fecha:"2026-12-08",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
  {id:"c31",nombre:"Pastrana Miguel Angel",zona:"Sudeste",pago:"Mal",monto:"$551.000",fecha:"",cuotas:0,deuda:"",ultima:"Actualmente",obs:""},
];

const ATRASADOS_BASE = [
  {id:"a1",nombre:"Cutipa Nelly Milagro",zona:"Norte",pago:"Mal",monto:"$2.290.000",cuotas:5,deuda:"$2.290.000",diasVencido:279,obs:"12/12 vencido"},
  {id:"a2",nombre:"Aparicio Ileana",zona:"Norte",pago:"Mal",monto:"$1.192.000",cuotas:5,deuda:"$1.192.000",diasVencido:285,obs:"38/38 vencido"},
  {id:"a3",nombre:"Rojo Adet Ricardo",zona:"Norte",pago:"Mal",monto:"$1.543.430",cuotas:5,deuda:"$1.543.430",diasVencido:372,obs:"30/30 vencido"},
  {id:"a4",nombre:"Krivoshen Maximiliano",zona:"Norte",pago:"Mal",monto:"$1.655.190",cuotas:5,deuda:"$1.655.190",diasVencido:349,obs:"210/210 vencido"},
  {id:"a5",nombre:"Hessling Virginia Gisel",zona:"Norte",pago:"Mal",monto:"$1.704.800",cuotas:5,deuda:"$1.704.800",diasVencido:349,obs:"210/210 vencido"},
  {id:"a6",nombre:"Navarro Magdalena Beatriz",zona:"Norte",pago:"Mal",monto:"$133.477",cuotas:10,deuda:"$133.477",diasVencido:1341,obs:"7/7 vencido"},
  {id:"a7",nombre:"Lozano Jorge Alfredo",zona:"Norte",pago:"Mal",monto:"$84.640",cuotas:10,deuda:"$84.640",diasVencido:1348,obs:"20/20 vencido"},
  {id:"a8",nombre:"Guanca Juan Roberto",zona:"Norte",pago:"Mal",monto:"$105.008",cuotas:2,deuda:"$105.008",diasVencido:119,obs:"12/12 vencido"},
  {id:"a9",nombre:"Martinez Guillermo",zona:"Norte",pago:"Medio",monto:"$1.189.020",cuotas:3,deuda:"$1.006.420",diasVencido:0,obs:"18/20 parcial"},
  {id:"a10",nombre:"Carrasco Claudio Adrian",zona:"Oeste",pago:"Mal",monto:"$635.430",cuotas:5,deuda:"$635.430",diasVencido:66,obs:"10/10 vencido"},
  {id:"a11",nombre:"Sacarias Juan Carlos",zona:"Oeste",pago:"Mal",monto:"$412.250",cuotas:10,deuda:"$412.250",diasVencido:690,obs:"6/6 vencido"},
  {id:"a12",nombre:"Mapelliz Judith Gabriela",zona:"Oeste",pago:"Mal",monto:"$170.945",cuotas:10,deuda:"$170.945",diasVencido:1249,obs:"15/15 vencido"},
  {id:"a13",nombre:"Castillo Lucas Emanuel",zona:"Oeste",pago:"Mal",monto:"$766.010",cuotas:5,deuda:"$766.010",diasVencido:312,obs:"35/35 vencido"},
  {id:"a14",nombre:"Romero Liliana",zona:"Oeste",pago:"Mal",monto:"$592.490",cuotas:7,deuda:"$592.490",diasVencido:413,obs:"10/10 vencido"},
  {id:"a15",nombre:"Lamas Alicia Milagro",zona:"Oeste",pago:"Medio",monto:"$225.011",cuotas:3,deuda:"$100.247",diasVencido:0,obs:"18/21 parcial"},
  {id:"a16",nombre:"Condori Norma Beatriz",zona:"Sudeste",pago:"Mal",monto:"$404.000",cuotas:7,deuda:"$404.000",diasVencido:453,obs:"4/4 vencido"},
  {id:"a17",nombre:"Orozco Grecia",zona:"Sudeste",pago:"Mal",monto:"$754.756",cuotas:10,deuda:"$754.756",diasVencido:659,obs:"6/6 vencido"},
  {id:"a18",nombre:"Coronel Juan Carlos",zona:"Sudeste",pago:"Mal",monto:"$468.530",cuotas:10,deuda:"$468.530",diasVencido:783,obs:"10/10 vencido"},
  {id:"a19",nombre:"Pastrana Miguel Angel",zona:"Sudeste",pago:"Mal",monto:"$505.060",cuotas:5,deuda:"$505.060",diasVencido:294,obs:"10/10 vencido"},
  {id:"a20",nombre:"Aguilera Rogelio",zona:"Sudeste",pago:"Medio",monto:"$1.035.060",cuotas:3,deuda:"$157.515",diasVencido:0,obs:"16/60 parcial"},
  {id:"a21",nombre:"Mamani Patricia",zona:"Sudeste",pago:"Medio",monto:"$880.240",cuotas:3,deuda:"$257.688",diasVencido:0,obs:"9/15 parcial"},
  {id:"a22",nombre:"Castillo Modesta Carina",zona:"Sudeste",pago:"Medio",monto:"$512.511",cuotas:3,deuda:"$138.219",diasVencido:0,obs:"10/21 parcial"},
];

// ── UTILIDADES ──────────────────────────────────────────────────────────────
const hoy = new Date(); hoy.setHours(0,0,0,0);
function diasVencer(f) {
  if (!f) return null;
  const d = new Date(f); d.setHours(0,0,0,0);
  return Math.round((d - hoy) / 86400000);
}
function fmtFecha(f) {
  if (!f) return "—";
  const [y,m,d] = f.split("-"); return `${d}/${m}/${y}`;
}
function semaforo(c) {
  const n = parseInt(c)||0;
  if (n<=0) return null;
  if (n<=2) return {color:"#F57F17",bg:"#FFF9C4",ico:"🟡",label:`${n} cuota${n>1?"s":""} atrasada${n>1?"s":""}`,g:1};
  if (n<=4) return {color:"#E65100",bg:"#FFE0B2",ico:"🟠",label:`${n} cuotas atrasadas`,g:2};
  return       {color:"#B71C1C",bg:"#FFCDD2",ico:"🔴",label:`${n} cuotas atrasadas`,g:3};
}
function badgeColor(p) {
  if (p==="Bien")  return {bg:"#D5F5E3",color:"#1E8449"};
  if (p==="Medio") return {bg:"#FEF9E7",color:"#D68910"};
  return                  {bg:"#FADBD8",color:"#C0392B"};
}
function venceColor(dias) {
  if (dias===null) return {bg:"#EAF3FB",color:"#1A3A6B"};
  if (dias<0)      return {bg:"#FADBD8",color:"#C0392B"};
  if (dias<=30)    return {bg:"#FDEBD0",color:"#E67E22"};
  return                  {bg:"#EAF3FB",color:"#1A3A6B"};
}
function venceLabel(dias) {
  if (dias===null) return "Sin fecha";
  if (dias<0)      return "Vencido";
  if (dias<=30)    return `Vence en ${dias}d`;
  return `${dias} días`;
}
function msgGestor(c) {
  const dias=diasVencer(c.fecha), ff=fmtFecha(c.fecha);
  if (dias===null) return `📋 ${c.nombre}\nZona: ${c.zona} | Pago: ${c.pago} | Monto: ${c.monto}\n\n⚠️ Sin fecha de finalización. Actualizar para gestionar renovación.`;
  if (dias<0)      return `⚠️ CRÉDITO VENCIDO\n\n${c.nombre}\nZona: ${c.zona} | Pago: ${c.pago}\nMonto: ${c.monto} | Venció: ${ff} (hace ${Math.abs(dias)} días)\n\n👉 Contactar urgente para renovación.`;
  if (dias<=30)    return `🔔 RENOVACIÓN URGENTE\n\n${c.nombre}\nZona: ${c.zona} | Pago: ${c.pago}\nMonto: ${c.monto} | Vence: ${ff} (en ${dias} días)\n\n✅ Contactar esta semana para ofrecer renovación.`;
  return `📅 ${c.nombre}\nMonto: ${c.monto} | Finaliza: ${ff} (en ${dias} días)\n\nAgendar visita para ofrecerle renovación.`;
}
function msgCliente(c) {
  const dias=diasVencer(c.fecha), ff=fmtFecha(c.fecha);
  const n=c.nombre.split(" ").pop();
  if (!dias||dias>60) return `Hola ${n}! 👋 Te saluda Colman Equipamientos.\n\nTenés disponible la posibilidad de renovar o tomar un nuevo crédito.\n\nTenemos equipos de hogar y comerciales con financiación cómoda. 🛒\n\n¿Te interesa que pasemos a visitarte?`;
  if (dias<0)         return `Hola ${n}! 👋 Te contactamos de Colman Equipamientos.\n\nTu crédito venció el ${ff}. Tenemos una propuesta especial de renovación para vos.\n\nUn gestor va a pasar a visitarte. 😊`;
  if (dias<=30)       return `Hola ${n}! 👋 Te contactamos de Colman Equipamientos.\n\nTu crédito finaliza el ${ff} — te quedan ${dias} días.\n\n🎉 Tenés una oferta especial de renovación:\n• Nuevos montos disponibles\n• Cuotas a tu medida\n• Sin trámites complicados\n\nUn gestor pasa a visitarte esta semana. 💪`;
  return `Hola ${n}! 👋 Te saluda Colman Equipamientos.\n\nTu crédito finaliza el ${ff} (en ${dias} días).\n\nYa podemos preparar tu renovación. Tenemos muy buenas opciones. 😊\n\nEn los próximos días pasa un gestor a visitarte.`;
}
function msgDeudaGestor(c) {
  const s=semaforo(c.cuotas); if (!s) return "";
  if (s.g===1) return `🟡 ATRASO LEVE\n\n${c.nombre}\nZona: ${c.zona} | Cuotas: ${c.cuotas}\nDeuda: ${c.deuda||"no registrado"}\n\nContactar para acordar pago.`;
  if (s.g===2) return `🟠 ATRASO IMPORTANTE\n\n${c.nombre}\nZona: ${c.zona} | Cuotas: ${c.cuotas}\nDeuda: ${c.deuda||"no registrado"}\n\nVisitar urgente. Ofrecer plan de pago.`;
  return `🔴 DEUDA CRÍTICA\n\n${c.nombre}\nZona: ${c.zona} | Cuotas: ${c.cuotas}\nDeuda: ${c.deuda||"no registrado"}\n\n⚠️ Gestión urgente. Escalar si no responde.`;
}
function msgDeudaCliente(c) {
  const s=semaforo(c.cuotas); if (!s) return "";
  const n=c.nombre.split(" ").pop();
  if (s.g===1) return `Hola ${n}! 👋 Te contactamos de Colman Equipamientos.\n\nNotamos que tenés ${c.cuotas} cuota${c.cuotas>1?"s":""} pendiente${c.cuotas>1?"s":""}.\n\nPasamos a visitarte para encontrar la mejor manera de ponerte al día. 😊`;
  if (s.g===2) return `Hola ${n}! Te contactamos de Colman Equipamientos.\n\nRegistramos ${c.cuotas} cuotas impagas.\n\nEs importante regularizar. Un gestor va a visitarte. 🤝`;
  return `Hola ${n}, te contactamos de Colman Equipamientos.\n\nRegistramos una deuda de ${c.cuotas} cuotas sin regularizar.\n\n⚠️ Un gestor va a visitarte a la brevedad.`;
}

// ── ESTILOS ─────────────────────────────────────────────────────────────────
const S = {
  app: {fontFamily:"'DM Sans',sans-serif",background:"#F4F6F8",minHeight:"100vh",paddingBottom:80,color:"#1C2833"},
  header: {background:"#1A3A6B",padding:"14px 14px 10px",position:"sticky",top:0,zIndex:100},
  headerTop: {display:"flex",alignItems:"center",justifyContent:"space-between"},
  logo: {display:"flex",alignItems:"center",gap:8},
  logoHex: {width:30,height:30,background:"#75AADB",clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,color:"#1A3A6B"},
  logoTxt: {color:"white",fontWeight:700,fontSize:14},
  logoSpan: {color:"#75AADB"},
  salirBtn: {background:"rgba(255,255,255,0.12)",border:"none",borderRadius:6,color:"rgba(255,255,255,0.7)",fontSize:11,padding:"4px 8px",cursor:"pointer",fontFamily:"inherit"},
  fecha: {color:"rgba(255,255,255,0.5)",fontSize:10,marginTop:4},
  tabs: {display:"flex",gap:3,background:"rgba(255,255,255,0.08)",borderRadius:10,padding:3,marginTop:10},
  tab: (active) => ({flex:1,padding:"6px 2px",border:"none",borderRadius:8,background:active?"white":"transparent",color:active?"#1A3A6B":"rgba(255,255,255,0.6)",fontFamily:"inherit",fontSize:10,fontWeight:active?700:500,cursor:"pointer"}),
  vista: {padding:"12px 12px"},
  secTitle: {fontSize:11,fontWeight:700,color:"#5D6D7E",textTransform:"uppercase",letterSpacing:"0.8px",margin:"14px 0 8px"},
  empty: {textAlign:"center",padding:"40px 20px",color:"#5D6D7E",fontSize:13},
  card: (borderLeft) => ({background:"white",borderRadius:14,border:`1px solid #E0E6EE`,marginBottom:10,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.05)",borderLeft:borderLeft||"none"}),
  cardHeader: {display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px 8px",cursor:"pointer"},
  cardNombre: {fontWeight:600,fontSize:14,color:"#1C2833"},
  cardMeta: {fontSize:11,color:"#5D6D7E",marginTop:2},
  badges: {display:"flex",gap:5,marginTop:6,flexWrap:"wrap"},
  badge: (bg,color) => ({background:bg,color,padding:"3px 8px",borderRadius:20,fontSize:10,fontWeight:600,display:"inline-block"}),
  chevron: (open) => ({color:"#5D6D7E",fontSize:16,marginLeft:8,transition:"transform .25s",transform:open?"rotate(180deg)":"none"}),
  detail: {padding:"0 14px 14px",borderTop:"1px solid #E0E6EE"},
  detailRow: {display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 0",borderBottom:"1px solid #F0F3F6"},
  detailLabel: {color:"#5D6D7E",fontSize:12},
  detailVal: {fontWeight:600,color:"#1C2833",fontSize:12,textAlign:"right",maxWidth:"55%",wordBreak:"break-word"},
  msgTabRow: {display:"flex",gap:6,marginTop:10},
  msgTab: (active) => ({flex:1,padding:"6px 4px",border:`1.5px solid ${active?"#1A3A6B":"#E0E6EE"}`,borderRadius:8,background:active?"#EAF3FB":"white",color:active?"#1A3A6B":"#5D6D7E",fontFamily:"inherit",fontSize:11,fontWeight:600,cursor:"pointer",textAlign:"center"}),
  waBox: (cli) => ({background:cli?"#FFF8E1":"#E7F8EE",border:`1px solid ${cli?"#FFD54F":"#A9DFBF"}`,borderRadius:8,padding:"10px 12px",marginTop:8}),
  waLabel: (cli) => ({fontSize:11,fontWeight:700,color:cli?"#E65100":"#27AE60",marginBottom:6}),
  waMsg: (cli) => ({fontSize:12,color:cli?"#4E342E":"#1C5631",lineHeight:1.6,fontFamily:"monospace",whiteSpace:"pre-wrap"}),
  waBtn: (cli) => ({display:"flex",alignItems:"center",justifyContent:"center",gap:6,width:"100%",marginTop:8,padding:10,background:cli?"#FF8F00":"#25D366",border:"none",borderRadius:8,color:"white",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer"}),
  actions: {display:"flex",gap:8,marginTop:10},
  editBtn: {flex:1,padding:8,background:"#EAF3FB",border:"1px solid #75AADB",borderRadius:8,color:"#1A3A6B",fontFamily:"inherit",fontSize:12,fontWeight:600,cursor:"pointer"},
  delBtn: {flex:1,padding:8,background:"#FADBD8",border:"1px solid #C0392B",borderRadius:8,color:"#C0392B",fontFamily:"inherit",fontSize:12,fontWeight:600,cursor:"pointer"},
  confirmBox: {background:"#FADBD8",border:"1px solid #C0392B",borderRadius:8,padding:12,marginTop:10},
  confirmTxt: {fontSize:12,color:"#C0392B",fontWeight:600,marginBottom:10},
  confirmBtns: {display:"flex",gap:8},
  confirmSi: {flex:1,padding:8,background:"#C0392B",border:"none",borderRadius:8,color:"white",fontFamily:"inherit",fontSize:12,fontWeight:700,cursor:"pointer"},
  confirmNo: {flex:1,padding:8,background:"white",border:"1px solid #E0E6EE",borderRadius:8,color:"#5D6D7E",fontFamily:"inherit",fontSize:12,fontWeight:600,cursor:"pointer"},
  modal: {position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:500,display:"flex",alignItems:"flex-end"},
  modalBox: {background:"white",borderRadius:"20px 20px 0 0",padding:"20px 16px 32px",width:"100%",maxHeight:"90vh",overflowY:"auto"},
  modalTitle: {fontWeight:700,fontSize:16,color:"#1A3A6B",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"},
  modalClose: {background:"none",border:"none",fontSize:22,color:"#5D6D7E",cursor:"pointer"},
  formGroup: {marginBottom:12},
  formLabel: {fontSize:11,fontWeight:600,color:"#5D6D7E",marginBottom:5,display:"block"},
  formInput: {width:"100%",padding:"10px 12px",border:"1.5px solid #E0E6EE",borderRadius:8,fontFamily:"inherit",fontSize:14,color:"#1C2833",background:"white",outline:"none",boxSizing:"border-box"},
  formRow: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},
  formBtn: {width:"100%",padding:13,background:"#1A3A6B",border:"none",borderRadius:8,color:"white",fontFamily:"inherit",fontSize:15,fontWeight:700,cursor:"pointer",marginTop:4},
  notaBox: {background:"#D5F5E3",border:"1px solid #1E8449",borderRadius:8,padding:"10px 12px",fontSize:12,color:"#1E8449",fontWeight:600,marginTop:10,textAlign:"center"},
  statsGrid: {display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12},
  statCard: {background:"white",borderRadius:14,border:"1px solid #E0E6EE",padding:"12px 14px"},
  statNum: (color) => ({fontSize:26,fontWeight:700,lineHeight:1,color}),
  statLbl: {fontSize:11,color:"#5D6D7E",marginTop:4,fontWeight:500},
  alertBanner: {background:"#FDEBD0",border:"1px solid #E67E22",borderRadius:8,padding:"10px 12px",display:"flex",alignItems:"center",gap:8,marginBottom:12},
  filtroRow: {display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"},
  filtroBtn: (active) => ({padding:"5px 10px",border:`1.5px solid ${active?"#1A3A6B":"#E0E6EE"}`,borderRadius:20,background:active?"#EAF3FB":"white",fontFamily:"inherit",fontSize:11,fontWeight:600,color:active?"#1A3A6B":"#5D6D7E",cursor:"pointer"}),
  searchWrap: {position:"relative",marginBottom:12},
  searchIco: {position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#5D6D7E",fontSize:14},
  searchInput: {width:"100%",padding:"9px 12px 9px 34px",border:"1.5px solid #E0E6EE",borderRadius:8,fontFamily:"inherit",fontSize:14,background:"white",outline:"none",boxSizing:"border-box"},
  select: {width:"100%",padding:"10px 12px",border:"1.5px solid #E0E6EE",borderRadius:8,fontFamily:"inherit",fontSize:14,color:"#1C2833",background:"white",outline:"none",marginBottom:10,appearance:"none"},
  zonaBadge: {background:"#75AADB",color:"#1A3A6B",fontSize:10,fontWeight:700,padding:"3px 9px",borderRadius:20,whiteSpace:"nowrap"},
  syncDot: (s) => ({width:8,height:8,borderRadius:"50%",background:s?"#FFC107":"#4CAF50",display:"inline-block",marginLeft:5}),
};

// ── COMPONENTES ─────────────────────────────────────────────────────────────
function Badge({bg,color,children}) {
  return <span style={S.badge(bg,color)}>{children}</span>;
}

function Card({c, tipo, onEdit, onDelete}) {
  const [open, setOpen] = useState(false);
  const [msgTab, setMsgTab] = useState("g");
  const [confirm, setConfirm] = useState(false);
  const [copied, setCopied] = useState("");

  const dias = tipo==="cliente" ? diasVencer(c.fecha) : null;
  const s = tipo==="atrasado" ? semaforo(c.cuotas) : null;
  const vc = venceColor(dias);
  const bp = badgeColor(c.pago);

  const borderLeft = s ? `4px solid ${s.color}` : undefined;

  const copy = (txt, key) => {
    navigator.clipboard.writeText(txt).catch(()=>{
      const t=document.createElement("textarea");t.value=txt;document.body.appendChild(t);t.select();document.execCommand("copy");document.body.removeChild(t);
    });
    setCopied(key); setTimeout(()=>setCopied(""),2000);
  };

  const mg = tipo==="cliente" ? msgGestor(c) : msgDeudaGestor(c);
  const mc = tipo==="cliente" ? msgCliente(c) : msgDeudaCliente(c);

  return (
    <div style={S.card(borderLeft)}>
      <div style={S.cardHeader} onClick={()=>setOpen(!open)}>
        <div style={{flex:1}}>
          <div style={S.cardNombre}>{c.nombre}</div>
          <div style={S.cardMeta}>{c.monto} · {tipo==="cliente" ? fmtFecha(c.fecha) : (c.diasVencido ? `${c.diasVencido} días vencido` : c.obs)}</div>
          <div style={S.badges}>
            <Badge bg="#EEF2FF" color="#3730A3">📍 {c.zona}</Badge>
            <Badge bg={bp.bg} color={bp.color}>{c.pago}</Badge>
            {tipo==="cliente" && <Badge bg={vc.bg} color={vc.color}>{venceLabel(dias)}</Badge>}
            {s && <span style={{...S.badge(s.bg,s.color)}}>{s.ico} {s.label}</span>}
          </div>
        </div>
        <span style={S.chevron(open)}>▾</span>
      </div>

      {open && (
        <div style={S.detail}>
          {tipo==="cliente" && <>
            <div style={S.detailRow}><span style={S.detailLabel}>Última actividad</span><span style={S.detailVal}>{c.ultima||"—"}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Finalización</span><span style={S.detailVal}>{fmtFecha(c.fecha)}</span></div>
          </>}
          {tipo==="atrasado" && <>
            <div style={S.detailRow}><span style={S.detailLabel}>Cuotas atrasadas</span><span style={{...S.detailVal,color:"#C0392B"}}>{c.cuotas}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Monto adeudado</span><span style={S.detailVal}>{c.deuda||"—"}</span></div>
            {c.diasVencido>0 && <div style={S.detailRow}><span style={S.detailLabel}>Días vencido</span><span style={S.detailVal}>{c.diasVencido}</span></div>}
          </>}
          <div style={{...S.detailRow,borderBottom:"none"}}><span style={S.detailLabel}>Observaciones</span><span style={S.detailVal}>{c.obs||"—"}</span></div>

          <div style={S.msgTabRow}>
            <button style={S.msgTab(msgTab==="g")} onClick={()=>setMsgTab("g")}>👤 Para el gestor</button>
            <button style={S.msgTab(msgTab==="c")} onClick={()=>setMsgTab("c")}>📲 Para el cliente</button>
          </div>

          {msgTab==="g" && (
            <div style={S.waBox(false)}>
              <div style={S.waLabel(false)}>💬 Recordatorio interno</div>
              <div style={S.waMsg(false)}>{mg}</div>
              <button style={S.waBtn(false)} onClick={()=>copy(mg,"mg")}>{copied==="mg"?"✅ Copiado!":"📋 Copiar mensaje"}</button>
            </div>
          )}
          {msgTab==="c" && (
            <div style={S.waBox(true)}>
              <div style={S.waLabel(true)}>📲 Mensaje para el cliente</div>
              <div style={S.waMsg(true)}>{mc}</div>
              <button style={S.waBtn(true)} onClick={()=>copy(mc,"mc")}>{copied==="mc"?"✅ Copiado!":"📋 Copiar para cliente"}</button>
            </div>
          )}

          <div style={S.actions}>
            <button style={S.editBtn} onClick={()=>onEdit(c)}>✏️ Editar</button>
            <button style={S.delBtn} onClick={()=>setConfirm(true)}>🗑️ Borrar</button>
          </div>
          {confirm && (
            <div style={S.confirmBox}>
              <div style={S.confirmTxt}>¿Borrar a {c.nombre}?</div>
              <div style={S.confirmBtns}>
                <button style={S.confirmSi} onClick={()=>onDelete(c)}>Sí, borrar</button>
                <button style={S.confirmNo} onClick={()=>setConfirm(false)}>Cancelar</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── APP PRINCIPAL ────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("alertas");
  const [clientes, setClientes] = useState([]);
  const [atrasados, setAtrasados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [filtroZona, setFiltroZona] = useState("todas");
  const [filtroDeuda, setFiltroDeuda] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState(null); // {tipo, data}
  const [form, setForm] = useState({});
  const [notaGuardado, setNotaGuardado] = useState(false);

  // ── STORAGE ────────────────────────────────────────────────────────────────
  const cargarDatos = useCallback(async () => {
    try {
      setSyncing(true);
      const rc = await window.storage.get("colman-clientes", true).catch(()=>null);
      const ra = await window.storage.get("colman-atrasados", true).catch(()=>null);
      if (rc) setClientes(JSON.parse(rc.value));
      else {
        setClientes(CLIENTES_BASE);
        await window.storage.set("colman-clientes", JSON.stringify(CLIENTES_BASE), true);
      }
      if (ra) setAtrasados(JSON.parse(ra.value));
      else {
        setAtrasados(ATRASADOS_BASE);
        await window.storage.set("colman-atrasados", JSON.stringify(ATRASADOS_BASE), true);
      }
    } catch(e) {
      setClientes(CLIENTES_BASE);
      setAtrasados(ATRASADOS_BASE);
    }
    setSyncing(false);
    setLoading(false);
  }, []);

  useEffect(() => { cargarDatos(); }, [cargarDatos]);

  // Polling cada 15 segundos
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const rc = await window.storage.get("colman-clientes", true).catch(()=>null);
        const ra = await window.storage.get("colman-atrasados", true).catch(()=>null);
        if (rc) setClientes(JSON.parse(rc.value));
        if (ra) setAtrasados(JSON.parse(ra.value));
      } catch(e) {}
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const guardarClientes = async (nueva) => {
    setSyncing(true);
    setClientes(nueva);
    await window.storage.set("colman-clientes", JSON.stringify(nueva), true).catch(()=>{});
    setSyncing(false);
  };
  const guardarAtrasados = async (nueva) => {
    setSyncing(true);
    setAtrasados(nueva);
    await window.storage.set("colman-atrasados", JSON.stringify(nueva), true).catch(()=>{});
    setSyncing(false);
  };

  // ── CRUD ───────────────────────────────────────────────────────────────────
  const onEdit = (c, tipo) => {
    setForm({...c, _tipo: tipo});
    setModal("editar");
  };
  const onDelete = async (c, tipo) => {
    if (tipo==="cliente") await guardarClientes(clientes.filter(x=>x.id!==c.id));
    else await guardarAtrasados(atrasados.filter(x=>x.id!==c.id));
  };
  const guardarEdicion = async () => {
    if (form._tipo==="cliente") {
      await guardarClientes(clientes.map(c=>c.id===form.id?{...form}:c));
    } else {
      await guardarAtrasados(atrasados.map(c=>c.id===form.id?{...form,cuotas:parseInt(form.cuotas)||0}:c));
    }
    setModal(null);
  };
  const guardarNuevo = async () => {
    if (!form.nombre?.trim()) return;
    const id = "n" + Date.now();
    const cuotas = parseInt(form.cuotas)||0;
    const nuevo = {...form, id, cuotas};
    if (cuotas > 0) await guardarAtrasados([...atrasados, nuevo]);
    else await guardarClientes([...clientes, {...nuevo, cuotas:0}]);
    setForm({});
    setNotaGuardado(true);
    setTimeout(()=>setNotaGuardado(false), 2500);
  };

  // ── DATOS FILTRADOS ────────────────────────────────────────────────────────
  const hoyStr = `${["domingo","lunes","martes","miércoles","jueves","viernes","sábado"][hoy.getDay()]} ${hoy.getDate()} de ${["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"][hoy.getMonth()]} ${hoy.getFullYear()}`;

  const alertas = clientes.filter(c=>{const d=diasVencer(c.fecha);return d!==null&&d<=30;}).sort((a,b)=>(diasVencer(a.fecha)||0)-(diasVencer(b.fecha)||0));
  const clientesFiltrados = clientes.filter(c=>(filtroZona==="todas"||c.zona===filtroZona)&&(!busqueda||c.nombre.toLowerCase().includes(busqueda.toLowerCase()))).sort((a,b)=>{const da=diasVencer(a.fecha),db=diasVencer(b.fecha);if(da===null&&db===null)return 0;if(da===null)return 1;if(db===null)return -1;return da-db;});
  const atrasadosFiltrados = atrasados.filter(c=>{const s=semaforo(c.cuotas);if(!s)return false;if(filtroDeuda==="critico")return s.g===3;if(filtroDeuda==="importante")return s.g===2;if(filtroDeuda==="leve")return s.g===1;return true;}).sort((a,b)=>(parseInt(b.cuotas)||0)-(parseInt(a.cuotas)||0));

  if (loading) return (
    <div style={{position:"fixed",inset:0,background:"#1A3A6B",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14}}>
      <div style={{width:36,height:36,border:"3px solid rgba(255,255,255,0.2)",borderTopColor:"#75AADB",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <p style={{color:"white",fontSize:13}}>Cargando datos...</p>
    </div>
  );

  return (
    <div style={S.app}>
      {/* HEADER */}
      <div style={S.header}>
        <div style={S.headerTop}>
          <div style={S.logo}>
            <div style={S.logoHex}>G</div>
            <div style={S.logoTxt}>GRUPO <span style={S.logoSpan}>COLMAN</span></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {filtroZona!=="todas" && <span style={S.zonaBadge}>{filtroZona} <span style={S.syncDot(syncing)}/></span>}
            {filtroZona==="todas" && syncing && <span style={{...S.syncDot(true),display:"inline-block"}}/>}
          </div>
        </div>
        <div style={S.fecha}>{hoyStr}</div>
        <div style={S.tabs}>
          {[["alertas","🔔 Alertas"],["clientes","👥 Clientes"],["atrasados","⚠️ Deudas"],["nuevo","➕ Nuevo"],["resumen","📊 Resumen"]].map(([id,lbl])=>(
            <button key={id} style={S.tab(tab===id)} onClick={()=>setTab(id)}>{lbl}</button>
          ))}
        </div>
      </div>

      {/* ALERTAS */}
      {tab==="alertas" && (
        <div style={S.vista}>
          {!alertas.length ? <div style={S.empty}>✅ No hay créditos urgentes en los próximos 30 días.</div> : <>
            <div style={S.alertBanner}><span style={{fontSize:18}}>🔔</span><span style={{fontSize:12,color:"#E67E22",fontWeight:600}}>{alertas.length} cliente{alertas.length>1?"s":""} requieren atención urgente</span></div>
            {alertas.filter(c=>diasVencer(c.fecha)<0).length>0 && <><div style={S.secTitle}>⚠️ Vencidos</div>{alertas.filter(c=>diasVencer(c.fecha)<0).map(c=><Card key={c.id} c={c} tipo="cliente" onEdit={c=>onEdit(c,"cliente")} onDelete={c=>onDelete(c,"cliente")}/>)}</>}
            {alertas.filter(c=>diasVencer(c.fecha)>=0).length>0 && <><div style={S.secTitle}>🔔 Vencen en 30 días</div>{alertas.filter(c=>diasVencer(c.fecha)>=0).map(c=><Card key={c.id} c={c} tipo="cliente" onEdit={c=>onEdit(c,"cliente")} onDelete={c=>onDelete(c,"cliente")}/>)}</>}
          </>}
        </div>
      )}

      {/* CLIENTES */}
      {tab==="clientes" && (
        <div style={S.vista}>
          <select style={S.select} value={filtroZona} onChange={e=>setFiltroZona(e.target.value)}>
            <option value="todas">Todas las zonas</option>
            <option value="Norte">Zona Norte</option>
            <option value="Oeste">Zona Oeste</option>
            <option value="Sudeste">Zona Sudeste</option>
          </select>
          <div style={S.searchWrap}>
            <span style={S.searchIco}>🔍</span>
            <input style={S.searchInput} placeholder="Buscar cliente..." value={busqueda} onChange={e=>setBusqueda(e.target.value)}/>
          </div>
          {!clientesFiltrados.length ? <div style={S.empty}>No se encontraron clientes.</div> : <>
            <div style={S.secTitle}>{clientesFiltrados.length} cliente{clientesFiltrados.length>1?"s":""}</div>
            {clientesFiltrados.map(c=><Card key={c.id} c={c} tipo="cliente" onEdit={c=>onEdit(c,"cliente")} onDelete={c=>onDelete(c,"cliente")}/>)}
          </>}
        </div>
      )}

      {/* DEUDAS */}
      {tab==="atrasados" && (
        <div style={S.vista}>
          <div style={{background:"white",borderRadius:14,border:"1px solid #E0E6EE",padding:14,marginBottom:12}}>
            <div style={{fontWeight:700,fontSize:14,color:"#1A3A6B",marginBottom:10}}>Resumen de deudas</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,textAlign:"center"}}>
              {[["#FFCDD2","#B71C1C","🔴","Críticos",3],["#FFE0B2","#E65100","🟠","Importantes",2],["#FFF9C4","#F57F17","🟡","Leves",1]].map(([bg,c,ico,lbl,g])=>(
                <div key={g} style={{background:bg,borderRadius:10,padding:8}}>
                  <div style={{fontSize:20,fontWeight:700,color:c}}>{atrasados.filter(a=>semaforo(a.cuotas)?.g===g).length}</div>
                  <div style={{fontSize:10,color:c,fontWeight:600}}>{ico} {lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={S.filtroRow}>
            {[["todos","Todos"],["critico","🔴 Críticos"],["importante","🟠 Importantes"],["leve","🟡 Leves"]].map(([v,l])=>(
              <button key={v} style={S.filtroBtn(filtroDeuda===v)} onClick={()=>setFiltroDeuda(v)}>{l}</button>
            ))}
          </div>
          {!atrasadosFiltrados.length ? <div style={S.empty}>No hay clientes en esta categoría.</div> : <>
            <div style={S.secTitle}>{atrasadosFiltrados.length} cliente{atrasadosFiltrados.length>1?"s":""}</div>
            {atrasadosFiltrados.map(c=><Card key={c.id} c={c} tipo="atrasado" onEdit={c=>onEdit(c,"atrasado")} onDelete={c=>onDelete(c,"atrasado")}/>)}
          </>}
        </div>
      )}

      {/* NUEVO */}
      {tab==="nuevo" && (
        <div style={S.vista}>
          <div style={{background:"white",borderRadius:14,border:"1px solid #E0E6EE",padding:16}}>
            <div style={{fontWeight:700,fontSize:15,color:"#1A3A6B",marginBottom:14}}>Registrar nuevo cliente</div>
            <div style={S.formGroup}><label style={S.formLabel}>Nombre y Apellido *</label><input style={S.formInput} placeholder="Ej: García María Elena" value={form.nombre||""} onChange={e=>setForm({...form,nombre:e.target.value})}/></div>
            <div style={S.formRow}>
              <div style={S.formGroup}><label style={S.formLabel}>Zona *</label>
                <select style={S.formInput} value={form.zona||"Norte"} onChange={e=>setForm({...form,zona:e.target.value})}>
                  <option value="Norte">Zona Norte</option><option value="Oeste">Zona Oeste</option><option value="Sudeste">Zona Sudeste</option>
                </select>
              </div>
              <div style={S.formGroup}><label style={S.formLabel}>Cómo paga *</label>
                <select style={S.formInput} value={form.pago||"Bien"} onChange={e=>setForm({...form,pago:e.target.value})}>
                  <option>Bien</option><option>Medio</option><option>Mal</option>
                </select>
              </div>
            </div>
            <div style={S.formRow}>
              <div style={S.formGroup}><label style={S.formLabel}>Monto</label><input style={S.formInput} placeholder="$300.000" value={form.monto||""} onChange={e=>setForm({...form,monto:e.target.value})}/></div>
              <div style={S.formGroup}><label style={S.formLabel}>Fecha fin</label><input style={S.formInput} type="date" value={form.fecha||""} onChange={e=>setForm({...form,fecha:e.target.value})}/></div>
            </div>
            <div style={S.formRow}>
              <div style={S.formGroup}><label style={S.formLabel}>Cuotas atrasadas</label><input style={S.formInput} type="number" min="0" placeholder="0" value={form.cuotas||""} onChange={e=>setForm({...form,cuotas:e.target.value})}/></div>
              <div style={S.formGroup}><label style={S.formLabel}>Monto adeudado</label><input style={S.formInput} placeholder="$0" value={form.deuda||""} onChange={e=>setForm({...form,deuda:e.target.value})}/></div>
            </div>
            <div style={S.formGroup}><label style={S.formLabel}>Última actividad</label><input style={S.formInput} placeholder="Actualmente" value={form.ultima||""} onChange={e=>setForm({...form,ultima:e.target.value})}/></div>
            <div style={S.formGroup}><label style={S.formLabel}>Observaciones</label><input style={S.formInput} placeholder="Notas..." value={form.obs||""} onChange={e=>setForm({...form,obs:e.target.value})}/></div>
            <button style={S.formBtn} onClick={guardarNuevo}>Guardar cliente</button>
            {notaGuardado && <div style={S.notaBox}>✅ Cliente guardado y sincronizado ☁️</div>}
          </div>
        </div>
      )}

      {/* RESUMEN */}
      {tab==="resumen" && (
        <div style={S.vista}>
          <div style={S.secTitle}>Renovaciones</div>
          <div style={S.statsGrid}>
            <div style={S.statCard}><div style={S.statNum("#1C2833")}>{clientes.length}</div><div style={S.statLbl}>Total clientes</div></div>
            <div style={S.statCard}><div style={S.statNum("#E67E22")}>{alertas.length}</div><div style={S.statLbl}>🔔 Por renovar (30d)</div></div>
            <div style={S.statCard}><div style={S.statNum("#1E8449")}>{clientes.filter(c=>c.pago==="Bien").length}</div><div style={S.statLbl}>✅ Pagan bien</div></div>
            <div style={S.statCard}><div style={S.statNum("#D68910")}>{clientes.filter(c=>c.pago==="Medio").length}</div><div style={S.statLbl}>⚠️ Pagan medio</div></div>
          </div>
          <div style={S.secTitle}>Deudas</div>
          <div style={S.statsGrid}>
            <div style={S.statCard}><div style={S.statNum("#C0392B")}>{atrasados.length}</div><div style={S.statLbl}>Total deudores</div></div>
            <div style={S.statCard}><div style={S.statNum("#C0392B")}>{atrasados.filter(c=>semaforo(c.cuotas)?.g===3).length}</div><div style={S.statLbl}>🔴 Críticos</div></div>
          </div>
          <div style={S.secTitle}>Por zona</div>
          {["Norte","Oeste","Sudeste"].map(z=>{
            const tot=clientes.filter(c=>c.zona===z).length;
            const urg=clientes.filter(c=>c.zona===z&&diasVencer(c.fecha)!==null&&(diasVencer(c.fecha)||0)<=30).length;
            const deu=atrasados.filter(c=>c.zona===z).length;
            return (
              <div key={z} style={{...S.statCard,marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div><div style={{fontWeight:600,fontSize:13,color:"#1A3A6B"}}>Zona {z}</div><div style={S.statLbl}>{tot} clientes · {deu} deudores</div></div>
                  {urg>0 ? <Badge bg="#FDEBD0" color="#E67E22">🔔 {urg} renovar</Badge> : <Badge bg="#D5F5E3" color="#1E8449">✅ Al día</Badge>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL EDITAR */}
      {modal==="editar" && (
        <div style={S.modal} onClick={e=>{if(e.target===e.currentTarget)setModal(null)}}>
          <div style={S.modalBox}>
            <div style={S.modalTitle}>Editar cliente <button style={S.modalClose} onClick={()=>setModal(null)}>✕</button></div>
            <div style={S.formGroup}><label style={S.formLabel}>Nombre</label><input style={S.formInput} value={form.nombre||""} onChange={e=>setForm({...form,nombre:e.target.value})}/></div>
            <div style={S.formRow}>
              <div style={S.formGroup}><label style={S.formLabel}>Zona</label>
                <select style={S.formInput} value={form.zona||"Norte"} onChange={e=>setForm({...form,zona:e.target.value})}>
                  <option value="Norte">Norte</option><option value="Oeste">Oeste</option><option value="Sudeste">Sudeste</option>
                </select>
              </div>
              <div style={S.formGroup}><label style={S.formLabel}>Cómo paga</label>
                <select style={S.formInput} value={form.pago||"Bien"} onChange={e=>setForm({...form,pago:e.target.value})}>
                  <option>Bien</option><option>Medio</option><option>Mal</option>
                </select>
              </div>
            </div>
            <div style={S.formRow}>
              <div style={S.formGroup}><label style={S.formLabel}>Monto</label><input style={S.formInput} value={form.monto||""} onChange={e=>setForm({...form,monto:e.target.value})}/></div>
              <div style={S.formGroup}><label style={S.formLabel}>Fecha fin</label><input style={S.formInput} type="date" value={form.fecha||""} onChange={e=>setForm({...form,fecha:e.target.value})}/></div>
            </div>
            <div style={S.formRow}>
              <div style={S.formGroup}><label style={S.formLabel}>Cuotas atrasadas</label><input style={S.formInput} type="number" min="0" value={form.cuotas||0} onChange={e=>setForm({...form,cuotas:e.target.value})}/></div>
              <div style={S.formGroup}><label style={S.formLabel}>Monto adeudado</label><input style={S.formInput} value={form.deuda||""} onChange={e=>setForm({...form,deuda:e.target.value})}/></div>
            </div>
            <div style={S.formGroup}><label style={S.formLabel}>Última actividad</label><input style={S.formInput} value={form.ultima||""} onChange={e=>setForm({...form,ultima:e.target.value})}/></div>
            <div style={S.formGroup}><label style={S.formLabel}>Observaciones</label><input style={S.formInput} value={form.obs||""} onChange={e=>setForm({...form,obs:e.target.value})}/></div>
            <button style={S.formBtn} onClick={guardarEdicion}>Guardar cambios</button>
          </div>
        </div>
      )}
    </div>
  );
}
