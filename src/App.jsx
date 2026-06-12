import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mllsraobvkoydfyfmklp.supabase.co";
const SUPABASE_KEY = "sb_publishable_v7-TyZzQrhBqUnc4KLmsvw_yjTu7gvs";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const GROUPS = {
  A: ["México","Corea del Sur","Sudáfrica","Rep. Checa"],
  B: ["Canadá","Suiza","Qatar","Bosnia"],
  C: ["Brasil","Marruecos","Escocia","Haití"],
  D: ["EE.UU.","Australia","Paraguay","Turquía"],
  E: ["Alemania","Ecuador","Costa de Marfil","Curazao"],
  F: ["Países Bajos","Japón","Túnez","Suecia"],
  G: ["Bélgica","Irán","Egipto","Nueva Zelanda"],
  H: ["España","Uruguay","Arabia Saudí","Cabo Verde"],
  I: ["Francia","Senegal","Noruega","Irak"],
  J: ["Argentina","Austria","Argelia","Jordania"],
  K: ["Portugal","Colombia","Uzbekistán","R.D. Congo"],
  L: ["Inglaterra","Croacia","Panamá","Ghana"],
};

const FLAGS = {
  "México":"🇲🇽","Corea del Sur":"🇰🇷","Sudáfrica":"🇿🇦","Rep. Checa":"🇨🇿",
  "Canadá":"🇨🇦","Suiza":"🇨🇭","Qatar":"🇶🇦","Bosnia":"🇧🇦",
  "Brasil":"🇧🇷","Marruecos":"🇲🇦","Escocia":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","Haití":"🇭🇹",
  "EE.UU.":"🇺🇸","Australia":"🇦🇺","Paraguay":"🇵🇾","Turquía":"🇹🇷",
  "Alemania":"🇩🇪","Ecuador":"🇪🇨","Costa de Marfil":"🇨🇮","Curazao":"🇨🇼",
  "Países Bajos":"🇳🇱","Japón":"🇯🇵","Túnez":"🇹🇳","Suecia":"🇸🇪",
  "Bélgica":"🇧🇪","Irán":"🇮🇷","Egipto":"🇪🇬","Nueva Zelanda":"🇳🇿",
  "España":"🇪🇸","Uruguay":"🇺🇾","Arabia Saudí":"🇸🇦","Cabo Verde":"🇨🇻",
  "Francia":"🇫🇷","Senegal":"🇸🇳","Noruega":"🇳🇴","Irak":"🇮🇶",
  "Argentina":"🇦🇷","Austria":"🇦🇹","Argelia":"🇩🇿","Jordania":"🇯🇴",
  "Portugal":"🇵🇹","Colombia":"🇨🇴","Uzbekistán":"🇺🇿","R.D. Congo":"🇨🇩",
  "Inglaterra":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croacia":"🇭🇷","Panamá":"🇵🇦","Ghana":"🇬🇭",
};

const TEAMS = Object.values(GROUPS).flat().sort();

const GROUP_MATCHES = [
  {id:"g1",group:"A",home:"México",away:"Sudáfrica",round:"groups",date:"11 jun",time:"21:00",city:"Ciudad de México"},
  {id:"g2",group:"A",home:"Corea del Sur",away:"Rep. Checa",round:"groups",date:"12 jun",time:"04:00",city:"Zapopan"},
  {id:"g3",group:"A",home:"Rep. Checa",away:"Sudáfrica",round:"groups",date:"18 jun",time:"18:00",city:"Atlanta"},
  {id:"g4",group:"A",home:"México",away:"Corea del Sur",round:"groups",date:"19 jun",time:"03:00",city:"Zapopan"},
  {id:"g5",group:"A",home:"Rep. Checa",away:"México",round:"groups",date:"25 jun",time:"03:00",city:"Ciudad de México"},
  {id:"g6",group:"A",home:"Sudáfrica",away:"Corea del Sur",round:"groups",date:"25 jun",time:"03:00",city:"Guadalupe"},
  {id:"g7",group:"B",home:"Canadá",away:"Bosnia",round:"groups",date:"12 jun",time:"21:00",city:"Toronto"},
  {id:"g8",group:"B",home:"Qatar",away:"Suiza",round:"groups",date:"13 jun",time:"21:00",city:"Santa Clara"},
  {id:"g9",group:"B",home:"Suiza",away:"Bosnia",round:"groups",date:"18 jun",time:"21:00",city:"Inglewood"},
  {id:"g10",group:"B",home:"Canadá",away:"Qatar",round:"groups",date:"19 jun",time:"00:00",city:"Vancouver"},
  {id:"g11",group:"B",home:"Suiza",away:"Canadá",round:"groups",date:"24 jun",time:"21:00",city:"Vancouver"},
  {id:"g12",group:"B",home:"Bosnia",away:"Qatar",round:"groups",date:"24 jun",time:"21:00",city:"Seattle"},
  {id:"g13",group:"C",home:"Brasil",away:"Marruecos",round:"groups",date:"14 jun",time:"00:00",city:"Nueva Jersey"},
  {id:"g14",group:"C",home:"Haití",away:"Escocia",round:"groups",date:"14 jun",time:"03:00",city:"Foxborough"},
  {id:"g15",group:"C",home:"Brasil",away:"Haití",round:"groups",date:"20 jun",time:"00:00",city:"Foxborough"},
  {id:"g16",group:"C",home:"Escocia",away:"Marruecos",round:"groups",date:"20 jun",time:"03:00",city:"Filadelfia"},
  {id:"g17",group:"C",home:"Escocia",away:"Brasil",round:"groups",date:"25 jun",time:"00:00",city:"Miami"},
  {id:"g18",group:"C",home:"Marruecos",away:"Haití",round:"groups",date:"25 jun",time:"00:00",city:"Atlanta"},
  {id:"g19",group:"D",home:"EE.UU.",away:"Paraguay",round:"groups",date:"13 jun",time:"03:00",city:"Inglewood"},
  {id:"g20",group:"D",home:"Australia",away:"Turquía",round:"groups",date:"13 jun",time:"06:00",city:"Vancouver"},
  {id:"g21",group:"D",home:"Turquía",away:"Paraguay",round:"groups",date:"19 jun",time:"06:00",city:"Santa Clara"},
  {id:"g22",group:"D",home:"EE.UU.",away:"Australia",round:"groups",date:"19 jun",time:"21:00",city:"Seattle"},
  {id:"g23",group:"D",home:"Turquía",away:"EE.UU.",round:"groups",date:"26 jun",time:"04:00",city:"Inglewood"},
  {id:"g24",group:"D",home:"Paraguay",away:"Australia",round:"groups",date:"26 jun",time:"04:00",city:"Santa Clara"},
  {id:"g25",group:"E",home:"Alemania",away:"Curazao",round:"groups",date:"14 jun",time:"19:00",city:"Houston"},
  {id:"g26",group:"E",home:"Costa de Marfil",away:"Ecuador",round:"groups",date:"15 jun",time:"01:00",city:"Filadelfia"},
  {id:"g27",group:"E",home:"Alemania",away:"Costa de Marfil",round:"groups",date:"21 jun",time:"00:00",city:"Toronto"},
  {id:"g28",group:"E",home:"Ecuador",away:"Curazao",round:"groups",date:"21 jun",time:"02:00",city:"Kansas City"},
  {id:"g29",group:"E",home:"Ecuador",away:"Alemania",round:"groups",date:"26 jun",time:"00:00",city:"Nueva Jersey"},
  {id:"g30",group:"E",home:"Curazao",away:"Costa de Marfil",round:"groups",date:"26 jun",time:"00:00",city:"Filadelfia"},
  {id:"g31",group:"F",home:"Países Bajos",away:"Japón",round:"groups",date:"15 jun",time:"00:00",city:"Arlington"},
  {id:"g32",group:"F",home:"Suecia",away:"Túnez",round:"groups",date:"15 jun",time:"04:00",city:"Guadalupe"},
  {id:"g33",group:"F",home:"Países Bajos",away:"Suecia",round:"groups",date:"20 jun",time:"19:00",city:"Houston"},
  {id:"g34",group:"F",home:"Túnez",away:"Japón",round:"groups",date:"20 jun",time:"06:00",city:"Guadalupe"},
  {id:"g35",group:"F",home:"Túnez",away:"Países Bajos",round:"groups",date:"26 jun",time:"01:00",city:"Kansas City"},
  {id:"g36",group:"F",home:"Japón",away:"Suecia",round:"groups",date:"26 jun",time:"01:00",city:"Arlington"},
  {id:"g37",group:"G",home:"Bélgica",away:"Egipto",round:"groups",date:"15 jun",time:"21:00",city:"Seattle"},
  {id:"g38",group:"G",home:"Irán",away:"Nueva Zelanda",round:"groups",date:"16 jun",time:"03:00",city:"Inglewood"},
  {id:"g39",group:"G",home:"Bélgica",away:"Irán",round:"groups",date:"22 jun",time:"01:00",city:"Inglewood"},
  {id:"g40",group:"G",home:"Nueva Zelanda",away:"Egipto",round:"groups",date:"22 jun",time:"03:00",city:"Vancouver"},
  {id:"g41",group:"G",home:"Nueva Zelanda",away:"Bélgica",round:"groups",date:"27 jun",time:"05:00",city:"Seattle"},
  {id:"g42",group:"G",home:"Egipto",away:"Irán",round:"groups",date:"27 jun",time:"05:00",city:"Vancouver"},
  {id:"g43",group:"H",home:"España",away:"Cabo Verde",round:"groups",date:"15 jun",time:"18:00",city:"Atlanta"},
  {id:"g44",group:"H",home:"Arabia Saudí",away:"Uruguay",round:"groups",date:"16 jun",time:"00:00",city:"Miami"},
  {id:"g45",group:"H",home:"España",away:"Arabia Saudí",round:"groups",date:"21 jun",time:"18:00",city:"Atlanta"},
  {id:"g46",group:"H",home:"Uruguay",away:"Cabo Verde",round:"groups",date:"22 jun",time:"00:00",city:"Miami"},
  {id:"g47",group:"H",home:"Uruguay",away:"España",round:"groups",date:"27 jun",time:"02:00",city:"Zapopan"},
  {id:"g48",group:"H",home:"Cabo Verde",away:"Arabia Saudí",round:"groups",date:"27 jun",time:"02:00",city:"Houston"},
  {id:"g49",group:"I",home:"Francia",away:"Senegal",round:"groups",date:"16 jun",time:"21:00",city:"Nueva Jersey"},
  {id:"g50",group:"I",home:"Irak",away:"Noruega",round:"groups",date:"17 jun",time:"00:00",city:"Foxborough"},
  {id:"g51",group:"I",home:"Francia",away:"Irak",round:"groups",date:"22 jun",time:"23:00",city:"Filadelfia"},
  {id:"g52",group:"I",home:"Noruega",away:"Senegal",round:"groups",date:"23 jun",time:"02:00",city:"Nueva Jersey"},
  {id:"g53",group:"I",home:"Noruega",away:"Francia",round:"groups",date:"26 jun",time:"21:00",city:"Foxborough"},
  {id:"g54",group:"I",home:"Senegal",away:"Irak",round:"groups",date:"26 jun",time:"21:00",city:"Toronto"},
  {id:"g55",group:"J",home:"Argentina",away:"Argelia",round:"groups",date:"17 jun",time:"03:00",city:"Kansas City"},
  {id:"g56",group:"J",home:"Austria",away:"Jordania",round:"groups",date:"17 jun",time:"06:00",city:"Santa Clara"},
  {id:"g57",group:"J",home:"Argentina",away:"Austria",round:"groups",date:"22 jun",time:"19:00",city:"Arlington"},
  {id:"g58",group:"J",home:"Jordania",away:"Argelia",round:"groups",date:"23 jun",time:"05:00",city:"Santa Clara"},
  {id:"g59",group:"J",home:"Jordania",away:"Argentina",round:"groups",date:"28 jun",time:"04:00",city:"Kansas City"},
  {id:"g60",group:"J",home:"Argelia",away:"Austria",round:"groups",date:"28 jun",time:"04:00",city:"Arlington"},
  {id:"g61",group:"K",home:"Portugal",away:"R.D. Congo",round:"groups",date:"17 jun",time:"19:00",city:"Houston"},
  {id:"g62",group:"K",home:"Uzbekistán",away:"Colombia",round:"groups",date:"18 jun",time:"04:00",city:"Ciudad de México"},
  {id:"g63",group:"K",home:"Portugal",away:"Uzbekistán",round:"groups",date:"23 jun",time:"19:00",city:"Houston"},
  {id:"g64",group:"K",home:"Colombia",away:"R.D. Congo",round:"groups",date:"24 jun",time:"04:00",city:"Zapopan"},
  {id:"g65",group:"K",home:"Colombia",away:"Portugal",round:"groups",date:"28 jun",time:"01:30",city:"Miami"},
  {id:"g66",group:"K",home:"R.D. Congo",away:"Uzbekistán",round:"groups",date:"28 jun",time:"01:30",city:"Atlanta"},
  {id:"g67",group:"L",home:"Inglaterra",away:"Croacia",round:"groups",date:"17 jun",time:"22:00",city:"Arlington"},
  {id:"g68",group:"L",home:"Ghana",away:"Panamá",round:"groups",date:"18 jun",time:"01:00",city:"Toronto"},
  {id:"g69",group:"L",home:"Inglaterra",away:"Ghana",round:"groups",date:"23 jun",time:"22:00",city:"Foxborough"},
  {id:"g70",group:"L",home:"Panamá",away:"Croacia",round:"groups",date:"24 jun",time:"01:00",city:"Toronto"},
  {id:"g71",group:"L",home:"Panamá",away:"Inglaterra",round:"groups",date:"27 jun",time:"23:00",city:"Nueva Jersey"},
  {id:"g72",group:"L",home:"Croacia",away:"Ghana",round:"groups",date:"27 jun",time:"23:00",city:"Filadelfia"},
];

const MULT = { groups:1, r32:2, r16:3, qf:4, sf:5, final:6 };
const ROUND_LABEL = { groups:"Fase de Grupos", r32:"Dieciseisavos", r16:"Octavos", qf:"Cuartos", sf:"Semifinales", final:"Final" };

// ─────────────────────────────────────────────
// SCORING
// ─────────────────────────────────────────────
function scoreMatch(pred, result, round) {
  if (!pred || result?.home_score == null) return 0;
  const m = MULT[round] || 1;
  const ph = parseInt(pred.home_score), pa = parseInt(pred.away_score);
  const rh = parseInt(result.home_score), ra = parseInt(result.away_score);
  if (isNaN(ph)||isNaN(pa)) return 0;
  if (ph===rh && pa===ra) return 3*m;
  const pw = ph>pa?"H":ph<pa?"A":"D", rw = rh>ra?"H":rh<ra?"A":"D";
  return pw===rw ? 1*m : 0;
}

function scoreSpecials(userSpec, actual) {
  if (!userSpec||!actual) return 0;
  let p=0;
  if (actual.champion && userSpec.champion===actual.champion) p+=20;
  if (actual.runner_up && userSpec.runner_up===actual.runner_up) p+=10;
  if (actual.third && userSpec.third===actual.third) p+=5;
  if (actual.top_scorer && userSpec.top_scorer===actual.top_scorer) p+=10;
  if (actual.mvp && userSpec.mvp===actual.mvp) p+=10;
  return p;
}

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const C = {
  bg:"#080c14", surface:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.09)",
  gold:"#f0c040", goldDim:"rgba(240,192,64,0.15)", goldBorder:"rgba(240,192,64,0.3)",
  green:"#3dd68c", red:"#f87171", text:"#f1f5f9",
  muted:"rgba(241,245,249,0.45)", faint:"rgba(241,245,249,0.2)",
};
const card = { background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:20 };
const inp = { width:"100%", padding:"10px 14px", borderRadius:10, background:"rgba(255,255,255,0.07)", border:`1px solid ${C.border}`, color:C.text, fontSize:14, outline:"none", fontFamily:"inherit", boxSizing:"border-box" };
const btnGold = { width:"100%", padding:"12px 20px", borderRadius:10, background:"linear-gradient(135deg,#f0c040,#e08020)", color:"#0a0d14", fontWeight:800, fontSize:14, border:"none", cursor:"pointer", fontFamily:"inherit" };
const btnGhost = { ...btnGold, background:"rgba(255,255,255,0.07)", color:C.text, border:`1px solid ${C.border}` };
const btnSmall = { padding:"6px 14px", borderRadius:8, background:"rgba(255,255,255,0.07)", border:`1px solid ${C.border}`, color:C.muted, fontSize:12, cursor:"pointer", fontFamily:"inherit" };

// ─────────────────────────────────────────────
// SMALL COMPONENTS
// ─────────────────────────────────────────────
function Stars() {
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
      {Array.from({length:25},(_,i)=>({left:`${(i*37+13)%100}%`,top:`${(i*53+7)%100}%`,size:i%5===0?3:i%3===0?2:1.5,dur:`${2.5+i%3}s`,delay:`${(i*0.4)%3}s`})).map((s,i)=>(
        <div key={i} style={{position:"absolute",left:s.left,top:s.top,width:s.size,height:s.size,borderRadius:"50%",background:"rgba(255,255,255,0.25)",animation:`twkl ${s.dur} ${s.delay} infinite alternate`}}/>
      ))}
    </div>
  );
}

function Tag({children,color="#f0c040"}) {
  return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:6,fontSize:11,fontWeight:700,background:`${color}22`,color,border:`1px solid ${color}44`}}>{children}</span>;
}

function ScoreBox({val,onChange,disabled}) {
  const si = { width:44,padding:"7px 4px",textAlign:"center",background:disabled?"rgba(255,255,255,0.04)":"rgba(255,255,255,0.09)",border:`1px solid ${disabled?C.border:C.goldBorder}`,borderRadius:8,color:C.text,fontSize:17,fontWeight:700,outline:"none",fontFamily:"inherit" };
  return (
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <input type="number" min="0" max="20" value={val?.home_score??""} placeholder="—" onChange={e=>onChange({...val,home_score:e.target.value})} disabled={disabled} style={si}/>
      <span style={{color:C.gold,fontWeight:900,fontSize:16}}>:</span>
      <input type="number" min="0" max="20" value={val?.away_score??""} placeholder="—" onChange={e=>onChange({...val,away_score:e.target.value})} disabled={disabled} style={si}/>
    </div>
  );
}

function MatchRow({match,pred,onChange,result,disabled}) {
  const pts = result?.home_score!=null && pred ? scoreMatch(pred,result,match.round) : null;
  const maxPts = 3*(MULT[match.round]||1);
  const bg = pts===maxPts?"rgba(61,214,140,0.07)":pts>0?"rgba(240,192,64,0.07)":pts===0&&result?"rgba(248,113,113,0.06)":C.surface;
  return (
    <div style={{...card,padding:"8px 12px",marginBottom:6,background:bg}}>
      {(match.date||match.city) && (
        <div style={{fontSize:10,color:C.faint,marginBottom:5,display:"flex",gap:8}}>
          {match.date&&<span>📅 {match.date}</span>}
          {match.time&&<span>🕐 {match.time}h</span>}
          {match.city&&<span>📍 {match.city}</span>}
        </div>
      )}
      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <span style={{flex:1,fontSize:13,fontWeight:600,color:C.text,minWidth:90}}>{FLAGS[match.home]||""} {match.home}</span>
        <ScoreBox val={pred} onChange={onChange} disabled={disabled}/>
        <span style={{flex:1,fontSize:13,fontWeight:600,color:C.text,textAlign:"right",minWidth:90}}>{match.away} {FLAGS[match.away]||""}</span>
        {result?.home_score!=null && (
          <span style={{fontSize:11,minWidth:70,textAlign:"right",color:pts===maxPts?C.green:pts>0?C.gold:C.red}}>
            {result.home_score}:{result.away_score} {pts!=null?`+${pts}p`:""}
          </span>
        )}
      </div>
    </div>
  );
}

function SectionTitle({children}) {
  return <h2 style={{fontSize:20,fontWeight:800,color:C.gold,margin:"0 0 18px",letterSpacing:.5}}>{children}</h2>;
}

function Alert({children}) {
  return <div style={{background:C.goldDim,border:`1px solid ${C.goldBorder}`,borderRadius:10,padding:"10px 14px",color:C.gold,fontSize:13,marginBottom:16}}>{children}</div>;
}

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────
function AuthScreen({onLogin}) {
  const [mode,setMode]=useState("login");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [displayName,setDisplayName]=useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const submit = async () => {
    setErr(""); setLoading(true);
    if (!username.trim()||!password.trim()) { setErr("Rellena todos los campos"); setLoading(false); return; }
    try {
      if (mode==="register") {
        if (!displayName.trim()) { setErr("Pon tu nombre visible"); setLoading(false); return; }
        if (password.length<4) { setErr("Contraseña mínimo 4 caracteres"); setLoading(false); return; }
        const {data:existing} = await supabase.from("users").select("id").ilike("username", username.trim()).single();
        if (existing) { setErr("Ese usuario ya existe"); setLoading(false); return; }
        const {data:allUsers} = await supabase.from("users").select("id");
        const isFirstUser = !allUsers || allUsers.length === 0;
        const {data:newUser, error} = await supabase.from("users").insert({
          username: username.trim().toLowerCase(),
          password,
          display_name: displayName.trim(),
          is_admin: isFirstUser,
        }).select().single();
        if (error) { setErr("Error al registrarse"); setLoading(false); return; }
        onLogin(newUser);
      } else {
        const {data:user, error} = await supabase.from("users").select("*").ilike("username", username.trim()).eq("password", password).single();
        if (error||!user) { setErr("Usuario o contraseña incorrectos"); setLoading(false); return; }
        onLogin(user);
      }
    } catch(e) { setErr("Error de conexión"); }
    setLoading(false);
  };

  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{...card,width:"100%",maxWidth:380,padding:32}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:56,marginBottom:10}}>⚽</div>
          <h1 style={{fontSize:22,fontWeight:900,color:C.gold,margin:0,letterSpacing:1}}>PORRA MUNDIAL LABASTIDA</h1>
          <p style={{color:C.muted,fontSize:12,margin:"6px 0 0",letterSpacing:3,textTransform:"uppercase"}}>USA · Canadá · México 2026</p>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:20}}>
          {["login","register"].map(m=>(
            <button key={m} onClick={()=>{setMode(m);setErr("");}} style={{flex:1,padding:"8px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:mode===m?700:400,background:mode===m?C.goldDim:"transparent",color:mode===m?C.gold:C.muted,borderBottom:`2px solid ${mode===m?C.gold:"transparent"}`}}>
              {m==="login"?"Entrar":"Registrarse"}
            </button>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {mode==="register"&&<input value={displayName} onChange={e=>setDisplayName(e.target.value)} placeholder="Tu nombre (visible en clasificación)" style={inp} autoComplete="name"/>}
          <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Usuario" style={inp} autoComplete="username"/>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Contraseña" style={inp} autoComplete={mode==="login"?"current-password":"new-password"} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          {err&&<p style={{color:C.red,fontSize:13,margin:0,textAlign:"center"}}>{err}</p>}
          <button onClick={submit} disabled={loading} style={btnGold}>{loading?"...":mode==="login"?"Entrar":"Crear cuenta"}</button>
        </div>
        <p style={{color:C.faint,fontSize:11,textAlign:"center",marginTop:16}}>El primer usuario en registrarse será el administrador.</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// INSTRUCCIONES
// ─────────────────────────────────────────────
function Instrucciones() {
  const [open,setOpen]=useState("plazos");
  const Section=({id,icon,title,children})=>(
    <div style={{...card,padding:0,overflow:"hidden",marginBottom:8}}>
      <button onClick={()=>setOpen(o=>o===id?null:id)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"15px 18px",background:"transparent",border:"none",cursor:"pointer",fontFamily:"inherit",color:C.text}}>
        <div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:18}}>{icon}</span><span style={{fontWeight:700,fontSize:15}}>{title}</span></div>
        <span style={{color:C.gold,fontSize:20,lineHeight:1,transform:open===id?"rotate(90deg)":"rotate(0deg)",transition:"transform .2s"}}>›</span>
      </button>
      {open===id&&<div style={{padding:"0 18px 18px",borderTop:`1px solid ${C.border}`}}>{children}</div>}
    </div>
  );
  const P=({children})=><p style={{color:C.muted,fontSize:14,lineHeight:1.65,margin:"12px 0 0"}}>{children}</p>;
  const Hl=({children})=><strong style={{color:C.text}}>{children}</strong>;
  return (
    <div style={{paddingBottom:40}}>
      <SectionTitle>📖 Instrucciones</SectionTitle>
      <div style={{...card,background:C.goldDim,border:`1px solid ${C.goldBorder}`,marginBottom:20,padding:"14px 18px"}}>
        <p style={{margin:0,fontSize:13,color:C.gold,lineHeight:1.6}}>⚡ <strong>Resumen:</strong> mete tus predicciones de grupos y especiales antes del primer partido. Para la eliminatoria, predice antes de cada partido. Gana quien más puntos acumule.</p>
      </div>
      <Section id="plazos" icon="⏰" title="Cuándo predecir">
        <P><Hl>Fase de grupos:</Hl> todos los partidos se predicen antes del primer partido del torneo. Una vez empiece, se bloquean.</P>
        <P><Hl>Eliminatoria:</Hl> predice antes del pitido inicial de cada partido.</P>
        <P><Hl>Especiales:</Hl> Campeón, Subcampeón, 3º, Pichichi y MVP se cierran antes del primer partido.</P>
      </Section>
      <Section id="puntos" icon="⚽" title="Sistema de puntos">
        <P>Dos niveles de acierto por partido:</P>
        <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:130,...card,background:"rgba(61,214,140,0.07)",border:"1px solid rgba(61,214,140,0.25)",textAlign:"center",padding:14}}>
            <div style={{fontSize:22,marginBottom:4}}>🎯</div>
            <div style={{fontWeight:900,fontSize:22,color:C.green}}>3 pts</div>
            <div style={{fontSize:12,color:C.muted,marginTop:4}}>Resultado exacto</div>
          </div>
          <div style={{flex:1,minWidth:130,...card,background:"rgba(240,192,64,0.07)",border:"1px solid rgba(240,192,64,0.25)",textAlign:"center",padding:14}}>
            <div style={{fontSize:22,marginBottom:4}}>👍</div>
            <div style={{fontWeight:900,fontSize:22,color:C.gold}}>1 pt</div>
            <div style={{fontSize:12,color:C.muted,marginTop:4}}>Ganador correcto</div>
          </div>
        </div>
        <P>Multiplicados por ronda: Grupos ×1 · Dieciseisavos ×2 · Octavos ×3 · Cuartos ×4 · Semis ×5 · Final ×6</P>
      </Section>
      <Section id="especiales" icon="🌟" title="Predicciones especiales">
        {[["🏆","Campeón",20],["🥈","Subcampeón",10],["🥉","3er puesto",5],["⚽","Pichichi",10],["⭐","MVP",10]].map(([ic,lb,pt])=>(
          <div key={lb} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
            <span style={{color:C.muted,fontSize:14}}>{ic} {lb}</span><Tag>+{pt} pts</Tag>
          </div>
        ))}
      </Section>
      <Section id="desempate" icon="⚖️" title="Desempate">
        {["Más resultados exactos","Más ganadores correctos","Mayor puntuación en especiales","Se comparte posición"].map((t,n)=>(
          <div key={n} style={{display:"flex",gap:12,alignItems:"flex-start",marginTop:12}}>
            <div style={{minWidth:24,height:24,borderRadius:"50%",background:C.goldDim,border:`1px solid ${C.goldBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:C.gold,flexShrink:0}}>{n+1}</div>
            <p style={{color:C.muted,fontSize:14,margin:0,paddingTop:3}}>{t}</p>
          </div>
        ))}
      </Section>
    </div>
  );
}

// ─────────────────────────────────────────────
// CLASIFICACIÓN
// ─────────────────────────────────────────────
function Clasificacion({users,predictions,results,specials,actualSpecials}) {
  const koMatches = results.knockoutMatches||[];
  const allMatches = [...GROUP_MATCHES,...koMatches];
  const ranking = users.map(u=>{
    let pts=0,exact=0,correct=0;
    allMatches.forEach(m=>{
      const pred = predictions.find(p=>p.username===u.username&&p.match_id===m.id);
      const res = results[m.id];
      if (pred&&res?.home_score!=null) {
        const p=scoreMatch(pred,res,m.round);
        pts+=p;
        if (p===3*(MULT[m.round]||1)) exact++;
        else if (p>0) correct++;
      }
    });
    const userSpec = specials.find(s=>s.username===u.username);
    pts+=scoreSpecials(userSpec, actualSpecials);
    return {...u,pts,exact,correct};
  }).sort((a,b)=>b.pts-a.pts||b.exact-a.exact);

  return (
    <div style={{paddingBottom:40}}>
      <SectionTitle>🏆 Clasificación</SectionTitle>
      {ranking.length===0&&<p style={{color:C.muted,textAlign:"center",marginTop:40}}>Aún no hay participantes.</p>}
      {ranking.map((u,i)=>(
        <div key={u.username} style={{...card,marginBottom:10,display:"flex",alignItems:"center",gap:14,background:i===0?"rgba(240,192,64,0.1)":C.surface,border:`1px solid ${i===0?C.goldBorder:C.border}`}}>
          <span style={{fontSize:22,minWidth:32,textAlign:"center"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:16,color:i===0?C.gold:C.text}}>{u.display_name||u.username}</div>
            <div style={{fontSize:12,color:C.faint,marginTop:2}}>✅ {u.exact} exactos · 👍 {u.correct} correctos</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontWeight:900,fontSize:26,color:C.gold}}>{u.pts}</div>
            <div style={{fontSize:11,color:C.faint}}>puntos</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// PREDICCIONES GRUPOS
// ─────────────────────────────────────────────
function PredGrupos({currentUser,predictions,setPredictions,results,locked}) {
  const userPreds = predictions.filter(p=>p.username===currentUser.username);
  const getPred = (matchId) => userPreds.find(p=>p.match_id===matchId)||{};
  const [local,setLocal]=useState(()=>{
    const m={};
    userPreds.forEach(p=>{ m[p.match_id]=p; });
    return m;
  });
  const [saved,setSaved]=useState(false);
  const [saving,setSaving]=useState(false);

  const save = async () => {
    setSaving(true);
    for (const [matchId, pred] of Object.entries(local)) {
      if (pred.home_score===""||pred.away_score===""||pred.home_score==null) continue;
      await supabase.from("predictions").upsert({
        username: currentUser.username,
        match_id: matchId,
        home_score: parseInt(pred.home_score),
        away_score: parseInt(pred.away_score),
      }, {onConflict:"username,match_id"});
    }
    const {data} = await supabase.from("predictions").select("*");
    setPredictions(data||[]);
    setSaving(false); setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  return (
    <div style={{paddingBottom:40}}>
      <SectionTitle>⚽ Predicciones — Fase de Grupos</SectionTitle>
      {locked&&<Alert>🔒 Las predicciones de grupos están cerradas.</Alert>}
      {!locked&&<Alert>⏳ Introduce todos los marcadores antes del inicio del torneo.</Alert>}
      {Object.entries(GROUPS).map(([grp])=>(
        <div key={grp} style={{marginBottom:24}}>
          <div style={{fontSize:11,fontWeight:700,color:C.gold,letterSpacing:3,textTransform:"uppercase",margin:"0 0 10px"}}>Grupo {grp}</div>
          {GROUP_MATCHES.filter(m=>m.group===grp).map(m=>(
            <MatchRow key={m.id} match={m}
              pred={local[m.id]||getPred(m.id)}
              onChange={v=>setLocal(l=>({...l,[m.id]:v}))}
              result={results[m.id]}
              disabled={locked}/>
          ))}
        </div>
      ))}
      {!locked&&<button onClick={save} disabled={saving} style={btnGold}>{saving?"Guardando...":saved?"✅ Guardado":"Guardar predicciones"}</button>}
    </div>
  );
}

// ─────────────────────────────────────────────
// ESPECIALES
// ─────────────────────────────────────────────
function PredEspeciales({currentUser,specials,setSpecials,locked,actualSpecials}) {
  const userSpec = specials.find(s=>s.username===currentUser.username)||{};
  const [local,setLocal]=useState(userSpec);
  const [saved,setSaved]=useState(false);

  const save = async () => {
    await supabase.from("specials").upsert({
      username: currentUser.username,
      champion: local.champion||null,
      runner_up: local.runner_up||null,
      third: local.third||null,
      top_scorer: local.top_scorer||null,
      mvp: local.mvp||null,
    }, {onConflict:"username"});
    const {data} = await supabase.from("specials").select("*");
    setSpecials(data||[]);
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  const fields=[
    {f:"champion",l:"🏆 Campeón",pts:20,team:true},
    {f:"runner_up",l:"🥈 Subcampeón",pts:10,team:true},
    {f:"third",l:"🥉 3er puesto",pts:5,team:true},
    {f:"top_scorer",l:"⚽ Pichichi",pts:10,team:false},
    {f:"mvp",l:"⭐ MVP",pts:10,team:false},
  ];

  return (
    <div style={{paddingBottom:40}}>
      <SectionTitle>🌟 Predicciones Especiales</SectionTitle>
      {locked&&<Alert>🔒 Las predicciones especiales están cerradas.</Alert>}
      {fields.map(({f,l,pts,team})=>{
        const actual=actualSpecials?.[f];
        const hit=actual&&local[f]===actual;
        return (
          <div key={f} style={{...card,marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
              <span style={{fontWeight:700,fontSize:15,color:C.text}}>{l}</span>
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                {actual&&<Tag color={hit?C.green:C.red}>{hit?"✅":"❌"} {actual}</Tag>}
                <Tag>+{pts} pts</Tag>
              </div>
            </div>
            {team?(
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {TEAMS.map(t=>(
                  <button key={t} onClick={()=>!locked&&setLocal(l=>({...l,[f]:t}))} style={{padding:"4px 9px",borderRadius:16,fontSize:12,cursor:locked?"default":"pointer",background:local[f]===t?C.gold:"rgba(255,255,255,0.06)",color:local[f]===t?"#0a0d14":C.muted,border:`1px solid ${local[f]===t?C.gold:C.border}`,fontFamily:"inherit"}}>{FLAGS[t]||""} {t}</button>
                ))}
              </div>
            ):(
              <input value={local[f]||""} onChange={e=>setLocal(l=>({...l,[f]:e.target.value}))} disabled={locked} placeholder="Nombre del jugador" style={inp}/>
            )}
          </div>
        );
      })}
      {!locked&&<button onClick={save} style={btnGold}>{saved?"✅ Guardado":"Guardar especiales"}</button>}
    </div>
  );
}

// ─────────────────────────────────────────────
// ELIMINATORIA
// ─────────────────────────────────────────────
function Eliminatoria({currentUser,predictions,setPredictions,results}) {
  const koMatches=results.knockoutMatches||[];
  const userPreds=predictions.filter(p=>p.username===currentUser.username);
  const [local,setLocal]=useState(()=>{const m={};userPreds.forEach(p=>{m[p.match_id]=p;});return m;});
  const [saved,setSaved]=useState(false);

  const save = async () => {
    for (const [matchId,pred] of Object.entries(local)) {
      if (pred.home_score===""||pred.away_score===""||pred.home_score==null) continue;
      await supabase.from("predictions").upsert({username:currentUser.username,match_id:matchId,home_score:parseInt(pred.home_score),away_score:parseInt(pred.away_score)},{onConflict:"username,match_id"});
    }
    const {data}=await supabase.from("predictions").select("*");
    setPredictions(data||[]);
    setSaved(true); setTimeout(()=>setSaved(false),2000);
  };

  if (koMatches.length===0) return (
    <div style={{paddingBottom:40}}>
      <SectionTitle>🥊 Fase Eliminatoria</SectionTitle>
      <div style={{...card,textAlign:"center",padding:48}}>
        <div style={{fontSize:44,marginBottom:12}}>⏳</div>
        <p style={{color:C.muted,margin:0}}>Los cruces aparecerán cuando finalice la fase de grupos.</p>
      </div>
    </div>
  );

  return (
    <div style={{paddingBottom:40}}>
      <SectionTitle>🥊 Fase Eliminatoria</SectionTitle>
      {Object.entries(ROUND_LABEL).filter(([r])=>r!=="groups").map(([round,label])=>{
        const ms=koMatches.filter(m=>m.round===round);
        if (!ms.length) return null;
        return (
          <div key={round} style={{marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:8,margin:"0 0 10px"}}>
              <span style={{fontSize:11,fontWeight:700,color:C.gold,letterSpacing:3,textTransform:"uppercase"}}>{label}</span>
              <Tag>×{MULT[round]}</Tag>
            </div>
            {ms.map(m=>{
              const res=results[m.id];
              return <MatchRow key={m.id} match={m} pred={local[m.id]||{}} onChange={v=>setLocal(l=>({...l,[m.id]:v}))} result={res} disabled={res?.home_score!=null}/>;
            })}
          </div>
        );
      })}
      <button onClick={save} style={btnGold}>{saved?"✅ Guardado":"Guardar predicciones"}</button>
    </div>
  );
}

// ─────────────────────────────────────────────
// HISTORIAL
// ─────────────────────────────────────────────
function Historial({currentUser,predictions,results,specials,actualSpecials}) {
  const uname=currentUser.username;
  const koMatches=results.knockoutMatches||[];
  const allM=[...GROUP_MATCHES,...koMatches];
  const rows=allM.map(m=>{
    const pred=predictions.find(p=>p.username===uname&&p.match_id===m.id);
    const res=results[m.id];
    const pts=pred&&res?.home_score!=null?scoreMatch(pred,res,m.round):null;
    return {...m,pred,res,pts};
  }).filter(r=>r.pred);
  const userSpec=specials.find(s=>s.username===uname);
  const specPts=scoreSpecials(userSpec,actualSpecials);
  const total=rows.reduce((s,r)=>s+(r.pts||0),0)+specPts;

  return (
    <div style={{paddingBottom:40}}>
      <SectionTitle>📊 Mi historial</SectionTitle>
      <div style={{...card,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{color:C.muted}}>Total acumulado</span>
        <span style={{fontWeight:900,fontSize:28,color:C.gold}}>{total} <span style={{fontSize:14,color:C.faint,fontWeight:400}}>pts</span></span>
      </div>
      {Object.entries(ROUND_LABEL).map(([round,label])=>{
        const rs=rows.filter(r=>r.round===round);
        if (!rs.length) return null;
        return (
          <div key={round} style={{marginBottom:22}}>
            <div style={{display:"flex",justifyContent:"space-between",margin:"0 0 8px"}}>
              <span style={{fontSize:11,fontWeight:700,color:C.gold,letterSpacing:3,textTransform:"uppercase"}}>{label}</span>
              <span style={{fontSize:12,color:C.muted}}>+{rs.reduce((s,r)=>s+(r.pts||0),0)} pts</span>
            </div>
            {rs.map(r=>{
              const maxP=3*(MULT[r.round]||1);
              const bg=r.pts===maxP?"rgba(61,214,140,0.07)":r.pts>0?"rgba(240,192,64,0.07)":r.res?"rgba(248,113,113,0.06)":C.surface;
              return (
                <div key={r.id} style={{...card,background:bg,marginBottom:5,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",padding:"9px 12px"}}>
                  <span style={{flex:1,fontSize:12,color:C.text}}>{FLAGS[r.home]||""} {r.home}</span>
                  <div style={{textAlign:"center",minWidth:100}}>
                    <div style={{fontSize:12,color:C.faint}}>Pred: {r.pred?.home_score??"-"}:{r.pred?.away_score??"-"}</div>
                    {r.res?.home_score!=null&&<div style={{fontSize:12,color:C.text}}>Real: {r.res.home_score}:{r.res.away_score}</div>}
                  </div>
                  <span style={{flex:1,fontSize:12,color:C.text,textAlign:"right"}}>{r.away} {FLAGS[r.away]||""}</span>
                  <span style={{fontSize:13,fontWeight:700,color:r.pts>0?C.green:r.res?C.red:C.faint,minWidth:40,textAlign:"right"}}>{r.pts!=null?`+${r.pts}`:"—"}</span>
                </div>
              );
            })}
          </div>
        );
      })}
      <div style={card}>
        <div style={{fontSize:11,fontWeight:700,color:C.gold,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Especiales +{specPts} pts</div>
        {[{f:"champion",l:"🏆 Campeón",pts:20},{f:"runner_up",l:"🥈 Subcampeón",pts:10},{f:"third",l:"🥉 3er puesto",pts:5},{f:"top_scorer",l:"⚽ Pichichi",pts:10},{f:"mvp",l:"⭐ MVP",pts:10}].map(({f,l,pts})=>{
          const uv=userSpec?.[f];
          const ac=actualSpecials?.[f];
          const hit=ac&&uv===ac;
          return (
            <div key={f} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
              <span style={{color:C.muted}}>{l}</span>
              <span style={{color:hit?C.green:C.text}}>{uv||"—"} {ac?hit?`✅ +${pts}`:`❌ (${ac})`:""}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN
// ─────────────────────────────────────────────
function Admin({results,setResults,actualSpecials,setActualSpecials,groupsLocked,setGroupsLocked}) {
  const [localSpec,setLocalSpec]=useState(actualSpecials||{});
  const [specSaved,setSpecSaved]=useState(false);
  const [ko,setKo]=useState({home:"",away:"",hScore:"",aScore:"",round:"r32"});

  const toggleLock = async () => {
    const v=!groupsLocked;
    await supabase.from("settings").upsert({key:"groups_locked",value:String(v)});
    setGroupsLocked(v);
  };

  const updateRes = async (id,home,away) => {
    await supabase.from("results").upsert({match_id:id,home_score:parseInt(home)||0,away_score:parseInt(away)||0},{onConflict:"match_id"});
    const {data}=await supabase.from("results").select("*");
    const map={knockoutMatches:results.knockoutMatches||[]};
    (data||[]).forEach(r=>{map[r.match_id]=r;});
    setResults(map);
  };

  const saveSpec = async () => {
    for (const [k,v] of Object.entries(localSpec)) {
      await supabase.from("settings").upsert({key:`special_${k}`,value:v||""});
    }
    setActualSpecials(localSpec);
    setSpecSaved(true); setTimeout(()=>setSpecSaved(false),2000);
  };

  const addKO = async () => {
    if (!ko.home||!ko.away) return;
    const id=`ko_${Date.now()}`;
    const nm={id,home:ko.home,away:ko.away,round:ko.round};
    const kms=[...(results.knockoutMatches||[]),nm];
    await supabase.from("settings").upsert({key:"knockout_matches",value:JSON.stringify(kms)});
    const newResults={...results,knockoutMatches:kms};
    if (ko.hScore!==""&&ko.aScore!=="") {
      await supabase.from("results").upsert({match_id:id,home_score:parseInt(ko.hScore),away_score:parseInt(ko.aScore)},{onConflict:"match_id"});
      newResults[id]={home_score:parseInt(ko.hScore),away_score:parseInt(ko.aScore)};
    }
    setResults(newResults);
    setKo({home:"",away:"",hScore:"",aScore:"",round:"r32"});
  };

  const updateKORes = async (id,home,away) => {
    await supabase.from("results").upsert({match_id:id,home_score:parseInt(home)||0,away_score:parseInt(away)||0},{onConflict:"match_id"});
    const {data}=await supabase.from("results").select("*");
    const map={knockoutMatches:results.knockoutMatches||[]};
    (data||[]).forEach(r=>{map[r.match_id]=r;});
    setResults(map);
  };

  return (
    <div style={{paddingBottom:40}}>
      <SectionTitle>⚙️ Panel Admin</SectionTitle>
      <div style={{...card,marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:C.gold,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Control de predicciones</div>
        <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <span style={{color:C.muted,fontSize:14,flex:1}}>Grupos y especiales:</span>
          <button onClick={toggleLock} style={{...btnSmall,color:groupsLocked?C.red:C.green,borderColor:groupsLocked?"rgba(248,113,113,0.3)":"rgba(61,214,140,0.3)",background:groupsLocked?"rgba(248,113,113,0.1)":"rgba(61,214,140,0.1)"}}>
            {groupsLocked?"🔒 Cerradas — abrir":"🔓 Abiertas — cerrar"}
          </button>
        </div>
      </div>
      <div style={{...card,marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:C.gold,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Resultados — Fase de Grupos</div>
        {Object.entries(GROUPS).map(([grp])=>(
          <div key={grp} style={{marginBottom:14}}>
            <div style={{fontSize:11,color:C.gold,letterSpacing:2,marginBottom:6}}>GRUPO {grp}</div>
            {GROUP_MATCHES.filter(m=>m.group===grp).map(m=>{
              const res=results[m.id]||{};
              return (
                <div key={m.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
                  <span style={{flex:1,fontSize:12,color:C.muted}}>{FLAGS[m.home]||""} {m.home} — {m.away} {FLAGS[m.away]||""}</span>
                  <input type="number" min="0" defaultValue={res.home_score??""} placeholder="L" style={{...inp,width:44,padding:"6px 4px",textAlign:"center"}} onChange={e=>updateRes(m.id,e.target.value,results[m.id]?.away_score??0)}/>
                  <span style={{color:C.gold}}>:</span>
                  <input type="number" min="0" defaultValue={res.away_score??""} placeholder="V" style={{...inp,width:44,padding:"6px 4px",textAlign:"center"}} onChange={e=>updateRes(m.id,results[m.id]?.home_score??0,e.target.value)}/>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{...card,marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:700,color:C.gold,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Fase Eliminatoria</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12}}>
          <select value={ko.round} onChange={e=>setKo(k=>({...k,round:e.target.value}))} style={{...inp,width:"auto",flex:"none"}}>
            <option value="r32">Dieciseisavos</option><option value="r16">Octavos</option>
            <option value="qf">Cuartos</option><option value="sf">Semis</option><option value="final">Final</option>
          </select>
          <select value={ko.home} onChange={e=>setKo(k=>({...k,home:e.target.value}))} style={{...inp,flex:1,minWidth:120}}>
            <option value="">Local...</option>{TEAMS.map(t=><option key={t} value={t}>{t}</option>)}
          </select>
          <select value={ko.away} onChange={e=>setKo(k=>({...k,away:e.target.value}))} style={{...inp,flex:1,minWidth:120}}>
            <option value="">Visitante...</option>{TEAMS.map(t=><option key={t} value={t}>{t}</option>)}
          </select>
          <input type="number" placeholder="G.L" value={ko.hScore} onChange={e=>setKo(k=>({...k,hScore:e.target.value}))} style={{...inp,width:52,padding:"6px 4px",textAlign:"center"}}/>
          <input type="number" placeholder="G.V" value={ko.aScore} onChange={e=>setKo(k=>({...k,aScore:e.target.value}))} style={{...inp,width:52,padding:"6px 4px",textAlign:"center"}}/>
          <button onClick={addKO} style={{...btnGold,width:"auto",padding:"10px 16px"}}>Añadir</button>
        </div>
        {(results.knockoutMatches||[]).map(m=>(
          <div key={m.id} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
            <span style={{flex:1,fontSize:12,color:C.muted}}>[{ROUND_LABEL[m.round]}] {m.home} vs {m.away}</span>
            <input type="number" min="0" defaultValue={results[m.id]?.home_score??""} placeholder="L" style={{...inp,width:44,padding:"6px 4px",textAlign:"center"}} onChange={e=>updateKORes(m.id,e.target.value,results[m.id]?.away_score??0)}/>
            <span style={{color:C.gold}}>:</span>
            <input type="number" min="0" defaultValue={results[m.id]?.away_score??""} placeholder="V" style={{...inp,width:44,padding:"6px 4px",textAlign:"center"}} onChange={e=>updateKORes(m.id,results[m.id]?.home_score??0,e.target.value)}/>
          </div>
        ))}
      </div>
      <div style={card}>
        <div style={{fontSize:11,fontWeight:700,color:C.gold,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>Resultados Especiales</div>
        {[{f:"champion",l:"🏆 Campeón",team:true},{f:"runner_up",l:"🥈 Subcampeón",team:true},{f:"third",l:"🥉 3er puesto",team:true},{f:"top_scorer",l:"⚽ Pichichi",team:false},{f:"mvp",l:"⭐ MVP",team:false}].map(({f,l,team})=>(
          <div key={f} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{color:C.muted,minWidth:130,fontSize:13}}>{l}</span>
            {team?(
              <select value={localSpec[f]||""} onChange={e=>setLocalSpec(s=>({...s,[f]:e.target.value}))} style={{...inp,flex:1}}>
                <option value="">Sin definir</option>{TEAMS.map(t=><option key={t} value={t}>{t}</option>)}
              </select>
            ):(
              <input value={localSpec[f]||""} onChange={e=>setLocalSpec(s=>({...s,[f]:e.target.value}))} style={{...inp,flex:1}} placeholder="Nombre"/>
            )}
          </div>
        ))}
        <button onClick={saveSpec} style={btnGold}>{specSaved?"✅ Guardado":"Guardar resultados especiales"}</button>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────
// PREDICCIONES (ver las de otros)
// ─────────────────────────────────────────────
function VerPredicciones({currentUser, users, predictions, specials, results, groupsLocked}) {
  const [selected, setSelected] = useState("");

  const otherUsers = users.filter(u => u.username !== currentUser.username);
  const selectedUser = users.find(u => u.username === selected);
  const userPreds = predictions.filter(p => p.username === selected);
  const getPred = (matchId) => userPreds.find(p => p.match_id === matchId);
  const userSpec = specials.find(s => s.username === selected) || {};
  const koMatches = results.knockoutMatches || [];

  return (
    <div style={{paddingBottom:40}}>
      <SectionTitle>🔍 Predicciones</SectionTitle>

      {!groupsLocked && (
        <Alert>🔒 Las predicciones de los demás se desbloquean cuando el admin cierre el plazo.</Alert>
      )}

      {groupsLocked && (
        <>
          <div style={{...card, marginBottom:20}}>
            <label style={{color:C.muted, fontSize:12, letterSpacing:1, textTransform:"uppercase", display:"block", marginBottom:8}}>Ver predicciones de:</label>
            <select value={selected} onChange={e=>setSelected(e.target.value)} style={{...inp}}>
              <option value="">— Elige un jugador —</option>
              {users.filter(u=>u.username!==currentUser.username).map(u=>(
                <option key={u.username} value={u.username}>{u.display_name||u.username}</option>
              ))}
            </select>
          </div>

          {selected && (
            <>
              <div style={{...card, marginBottom:20, background:"rgba(240,192,64,0.08)", border:`1px solid ${C.goldBorder}`, display:"flex", alignItems:"center", gap:12}}>
                <span style={{fontSize:28}}>👤</span>
                <div>
                  <div style={{fontWeight:800, fontSize:17, color:C.gold}}>{selectedUser?.display_name||selected}</div>
                  <div style={{fontSize:12, color:C.faint}}>Predicciones fase de grupos</div>
                </div>
              </div>

              {Object.entries({A:1,B:1,C:1,D:1,E:1,F:1,G:1,H:1,I:1,J:1,K:1,L:1}).map(([grp])=>(
                <div key={grp} style={{marginBottom:24}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.gold,letterSpacing:3,textTransform:"uppercase",margin:"0 0 10px"}}>Grupo {grp}</div>
                  {GROUP_MATCHES.filter(m=>m.group===grp).map(m=>{
                    const pred = getPred(m.id);
                    const res = results[m.id];
                    const pts = pred && res?.home_score!=null ? scoreMatch(pred, res, m.round) : null;
                    const maxPts = 3*(MULT[m.round]||1);
                    const bg = pts===maxPts?"rgba(61,214,140,0.07)":pts>0?"rgba(240,192,64,0.07)":pts===0&&res?"rgba(248,113,113,0.06)":C.surface;
                    return (
                      <div key={m.id} style={{...card, padding:"8px 12px", marginBottom:6, background:bg}}>
                        {(m.date||m.city) && (
                          <div style={{fontSize:10,color:C.faint,marginBottom:5,display:"flex",gap:8}}>
                            {m.date&&<span>📅 {m.date}</span>}
                            {m.time&&<span>🕐 {m.time}h</span>}
                            {m.city&&<span>📍 {m.city}</span>}
                          </div>
                        )}
                        <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                          <span style={{flex:1,fontSize:13,fontWeight:600,color:C.text,minWidth:90}}>{FLAGS[m.home]||""} {m.home}</span>
                          <div style={{display:"flex",alignItems:"center",gap:6}}>
                            <div style={{width:44,padding:"7px 4px",textAlign:"center",background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:17,fontWeight:700}}>
                              {pred?.home_score??"-"}
                            </div>
                            <span style={{color:C.gold,fontWeight:900,fontSize:16}}>:</span>
                            <div style={{width:44,padding:"7px 4px",textAlign:"center",background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:17,fontWeight:700}}>
                              {pred?.away_score??"-"}
                            </div>
                          </div>
                          <span style={{flex:1,fontSize:13,fontWeight:600,color:C.text,textAlign:"right",minWidth:90}}>{m.away} {FLAGS[m.away]||""}</span>
                          {res?.home_score!=null && (
                            <span style={{fontSize:11,minWidth:70,textAlign:"right",color:pts===maxPts?C.green:pts>0?C.gold:C.red}}>
                              {res.home_score}:{res.away_score} {pts!=null?`+${pts}p`:""}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {koMatches.length > 0 && (
                <div style={{marginBottom:24}}>
                  {Object.entries(ROUND_LABEL).filter(([r])=>r!=="groups").map(([round,label])=>{
                    const ms = koMatches.filter(m=>m.round===round);
                    if (!ms.length) return null;
                    return (
                      <div key={round} style={{marginBottom:20}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,margin:"0 0 10px"}}>
                          <span style={{fontSize:11,fontWeight:700,color:C.gold,letterSpacing:3,textTransform:"uppercase"}}>{label}</span>
                          <Tag>×{MULT[round]}</Tag>
                        </div>
                        {ms.map(m=>{
                          const pred = getPred(m.id);
                          const res = results[m.id];
                          const pts = pred && res?.home_score!=null ? scoreMatch(pred, res, m.round) : null;
                          const maxPts = 3*(MULT[m.round]||1);
                          const bg = pts===maxPts?"rgba(61,214,140,0.07)":pts>0?"rgba(240,192,64,0.07)":pts===0&&res?"rgba(248,113,113,0.06)":C.surface;
                          return (
                            <div key={m.id} style={{...card,padding:"8px 12px",marginBottom:6,background:bg,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                              <span style={{flex:1,fontSize:13,fontWeight:600,color:C.text,minWidth:90}}>{FLAGS[m.home]||""} {m.home}</span>
                              <div style={{display:"flex",alignItems:"center",gap:6}}>
                                <div style={{width:44,padding:"7px 4px",textAlign:"center",background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:17,fontWeight:700}}>{pred?.home_score??"-"}</div>
                                <span style={{color:C.gold,fontWeight:900,fontSize:16}}>:</span>
                                <div style={{width:44,padding:"7px 4px",textAlign:"center",background:"rgba(255,255,255,0.04)",border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:17,fontWeight:700}}>{pred?.away_score??"-"}</div>
                              </div>
                              <span style={{flex:1,fontSize:13,fontWeight:600,color:C.text,textAlign:"right",minWidth:90}}>{m.away} {FLAGS[m.away]||""}</span>
                              {res?.home_score!=null&&<span style={{fontSize:11,minWidth:70,textAlign:"right",color:pts===maxPts?C.green:pts>0?C.gold:C.red}}>{res.home_score}:{res.away_score} {pts!=null?`+${pts}p`:""}</span>}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}

              <div style={card}>
                <div style={{fontSize:11,fontWeight:700,color:C.gold,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>🌟 Especiales</div>
                {[{f:"champion",l:"🏆 Campeón"},{f:"runner_up",l:"🥈 Subcampeón"},{f:"third",l:"🥉 3er puesto"},{f:"top_scorer",l:"⚽ Pichichi"},{f:"mvp",l:"⭐ MVP"}].map(({f,l})=>(
                  <div key={f} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
                    <span style={{color:C.muted}}>{l}</span>
                    <span style={{color:C.text,fontWeight:600}}>{userSpec[f]||"—"}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
const ALL_TABS = [
  {id:"instrucciones",label:"📖 Reglas"},
  {id:"clasificacion",label:"🏆 Clasificación"},
  {id:"grupos",label:"⚽ Grupos"},
  {id:"eliminatoria",label:"🥊 Eliminatoria"},
  {id:"especiales",label:"🌟 Especiales"},
  {id:"historial",label:"📊 Historial"},
  {id:"predicciones",label:"🔍 Predicciones"},
];

export default function App() {
  const [user,setUser]=useState(null);
  const [tab,setTab]=useState("instrucciones");
  const [users,setUsers]=useState([]);
  const [predictions,setPredictions]=useState([]);
  const [results,setResults]=useState({});
  const [specials,setSpecials]=useState([]);
  const [actualSpecials,setActualSpecials]=useState({});
  const [groupsLocked,setGroupsLocked]=useState(false);
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    (async()=>{
      const [{data:u},{data:p},{data:r},{data:s},{data:st}] = await Promise.all([
        supabase.from("users").select("*"),
        supabase.from("predictions").select("*"),
        supabase.from("results").select("*"),
        supabase.from("specials").select("*"),
        supabase.from("settings").select("*"),
      ]);
      setUsers(u||[]);
      setPredictions(p||[]);
      const resMap={knockoutMatches:[]};
      (r||[]).forEach(row=>{resMap[row.match_id]=row;});
      const stMap={};
      (st||[]).forEach(row=>{stMap[row.key]=row.value;});
      if (stMap.knockout_matches) {
        try { resMap.knockoutMatches=JSON.parse(stMap.knockout_matches); } catch {}
      }
      setResults(resMap);
      setSpecials(s||[]);
      const specObj={};
      ["champion","runner_up","third","top_scorer","mvp"].forEach(k=>{
        if (stMap[`special_${k}`]) specObj[k]=stMap[`special_${k}`];
      });
      setActualSpecials(specObj);
      setGroupsLocked(stMap.groups_locked==="true");
      setReady(true);
    })();
  },[]);

  if (!ready) return (
    <div style={{minHeight:"100vh",background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{fontSize:48,animation:"spin 1s linear infinite"}}>⚽</div>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!user) return (
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.bg} 0%,#0d1a2e 50%,#1a0d2e 100%)`,fontFamily:"'Plus Jakarta Sans',sans-serif",color:C.text}}>
      <Stars/>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');*{box-sizing:border-box}input[type=number]{-moz-appearance:textfield}input::-webkit-inner-spin-button{-webkit-appearance:none}@keyframes twkl{from{opacity:.15}to{opacity:.7}}`}</style>
      <div style={{position:"relative",zIndex:1}}><AuthScreen onLogin={u=>{setUser(u);setUsers(prev=>prev.find(x=>x.username===u.username)?prev:[...prev,u]);}}/></div>
    </div>
  );

  const tabs=user.is_admin?[...ALL_TABS,{id:"admin",label:"⚙️ Admin"}]:ALL_TABS;

  return (
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${C.bg} 0%,#0d1a2e 50%,#1a0d2e 100%)`,fontFamily:"'Plus Jakarta Sans',sans-serif",color:C.text}}>
      <Stars/>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');*{box-sizing:border-box}input[type=number]{-moz-appearance:textfield}input::-webkit-inner-spin-button{-webkit-appearance:none}@keyframes twkl{from{opacity:.15}to{opacity:.7}}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(240,192,64,.3);border-radius:4px}select option{background:#0d1120;color:#f1f5f9}`}</style>
      <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(8,12,20,0.94)",backdropFilter:"blur(18px)",borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:680,margin:"0 auto",padding:"11px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontWeight:900,fontSize:15,color:C.gold,letterSpacing:.5}}>⚽ PORRA MUNDIAL LABASTIDA</div>
            <div style={{fontSize:10,color:C.faint,letterSpacing:3,textTransform:"uppercase"}}>USA · CANADÁ · MÉXICO 2026</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:12,color:C.muted}}>{user.display_name||user.username}</span>
            <button onClick={()=>setUser(null)} style={btnSmall}>Salir</button>
          </div>
        </div>
        <div style={{maxWidth:680,margin:"0 auto",padding:"0 16px",display:"flex",gap:2,overflowX:"auto",scrollbarWidth:"none"}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"8px 11px",border:"none",cursor:"pointer",fontFamily:"inherit",background:"transparent",whiteSpace:"nowrap",fontSize:12,color:tab===t.id?C.gold:C.muted,fontWeight:tab===t.id?700:400,borderBottom:`2px solid ${tab===t.id?C.gold:"transparent"}`,transition:"all .15s"}}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{maxWidth:680,margin:"0 auto",padding:"24px 16px",position:"relative",zIndex:1}}>
        {tab==="instrucciones"&&<Instrucciones/>}
        {tab==="clasificacion"&&<Clasificacion users={users} predictions={predictions} results={results} specials={specials} actualSpecials={actualSpecials}/>}
        {tab==="grupos"&&<PredGrupos currentUser={user} predictions={predictions} setPredictions={setPredictions} results={results} locked={groupsLocked}/>}
        {tab==="eliminatoria"&&<Eliminatoria currentUser={user} predictions={predictions} setPredictions={setPredictions} results={results}/>}
        {tab==="especiales"&&<PredEspeciales currentUser={user} specials={specials} setSpecials={setSpecials} locked={groupsLocked} actualSpecials={actualSpecials}/>}
        {tab==="historial"&&<Historial currentUser={user} predictions={predictions} results={results} specials={specials} actualSpecials={actualSpecials}/>}
        {tab==="predicciones"&&<VerPredicciones currentUser={user} users={users} predictions={predictions} specials={specials} results={results} groupsLocked={groupsLocked}/>}
        {tab==="admin"&&user.is_admin&&<Admin results={results} setResults={setResults} actualSpecials={actualSpecials} setActualSpecials={setActualSpecials} groupsLocked={groupsLocked} setGroupsLocked={setGroupsLocked}/>}
      </div>
    </div>
  );
}
