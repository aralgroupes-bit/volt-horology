import { useState, useEffect } from "react";

const W_PINK = "/images/w_pink.jpg"
const W_BLUE_NYLON = "/images/w_blue_nylon.jpg"
const W_GREEN = "/images/w_green.jpg"
const W_BLUE_BLACK = "/images/w_blue_black.jpg"
const W_CARBON_RED = "/images/w_carbon_red.jpg"

const WATCHES = [
  {
    id:"W1", ref:"VM-01 ROSE", name:"ROSE QUARTZ",
    tagline:"Carbon TPT® Rose · Bracelet Rubber Noir",
    price:"CHF 80", priceNum:80, limited:"50 PIÈCES", badge:"BEST-SELLER",
    img: W_PINK, accent:"#c060a0", glow:"rgba(180,60,140,0.35)",
    bg:"radial-gradient(ellipse at 65% 50%, rgba(180,60,140,0.14) 0%, #040404 65%)",
    material:"Carbon TPT® Rose / Titane Grade 5",
    movement:"Quartz Squelette VM-CAL01", power:"3 ANS", size:"49×38×14mm", water:"50m",
    description:"Forgée en Carbon TPT® rose teinté dans la masse. 600 couches de fibres orientées à 45°, aiguilles argentées, bracelet rubber texturé noir.",
  },
  {
    id:"W2", ref:"VM-02 BLEU NYLON", name:"BLEU OCÉAN",
    tagline:"Carbon TPT® Bleu · Bracelet Nylon Bleu",
    price:"CHF 80", priceNum:80, limited:"40 PIÈCES", badge:"NOUVEAU",
    img: W_BLUE_NYLON, accent:"#2060cc", glow:"rgba(30,80,200,0.35)",
    bg:"radial-gradient(ellipse at 65% 50%, rgba(30,80,200,0.14) 0%, #040404 65%)",
    material:"Carbon TPT® Bleu / Titane Bleu PVD",
    movement:"Quartz Précision VM-CAL02", power:"5 ANS", size:"49×38×14.5mm", water:"50m",
    description:"Quartz TPT® bleu nuit aux reflets azur. Aiguilles tricolores blanc-bleu-rouge, bracelet nylon tissé bleu marine.",
  },
  {
    id:"W3", ref:"VM-03 VERT", name:"VERT JUNGLE",
    tagline:"Carbon TPT® Vert · Bracelet Nylon Vert",
    price:"CHF 80", priceNum:80, limited:"35 PIÈCES", badge:"ÉDITION SPORT",
    img: W_GREEN, accent:"#1a8040", glow:"rgba(20,120,50,0.35)",
    bg:"radial-gradient(ellipse at 65% 50%, rgba(20,120,50,0.14) 0%, #040404 65%)",
    material:"Carbon TPT® Vert / Titane PVD",
    movement:"Quartz Sport VM-CAL03", power:"3 ANS", size:"49×38×13.8mm", water:"100m",
    description:"Carbon TPT® vert forêt avec rayures jaune fluo. Aiguilles multicolores olympiques. Bracelet nylon vert tissé main.",
  },
  {
    id:"W4", ref:"VM-04 BLEU NOIR", name:"BLEU MINUIT",
    tagline:"Carbon TPT® Bleu · Bracelet Noir",
    price:"CHF 80", priceNum:80, limited:"30 PIÈCES", badge:"EXCLUSIF",
    img: W_BLUE_BLACK, accent:"#3050cc", glow:"rgba(40,60,200,0.35)",
    bg:"radial-gradient(ellipse at 65% 50%, rgba(40,60,200,0.14) 0%, #040404 65%)",
    material:"Carbon TPT® Bleu / Acier DLC Noir",
    movement:"Quartz Chronographe VM-CAL04", power:"4 ANS", size:"50×39×15mm", water:"100m",
    description:"Boîtier bleu profond sur bracelet noir carbone. Couronne oversize, cadran squelette maximaliste. La plus imposante.",
  },
  {
    id:"W5", ref:"VM-05 CARBON", name:"CARBON ROUGE",
    tagline:"Carbon TPT® Noir Brut · Bracelet Rouge",
    price:"CHF 80", priceNum:80, limited:"25 PIÈCES", badge:"PIÈCE PHARE",
    img: W_CARBON_RED, accent:"#cc2020", glow:"rgba(200,20,20,0.35)",
    bg:"radial-gradient(ellipse at 65% 50%, rgba(200,20,20,0.14) 0%, #040404 65%)",
    material:"Carbon TPT® Noir / Titane Or",
    movement:"Quartz Précision VM-CAL05", power:"5 ANS", size:"50×39×15.2mm", water:"100m",
    description:"Le joyau de la collection. Carbon brut noir, couronne dorée, insert rouge carmin, bracelet nylon rouge Ferrari.",
  },
];

function Cart({ cart, onRemove, onClose, accent, onCheckout, checkoutLoading, checkoutError }) {
  const total = cart.reduce((s,i) => s + i.priceNum, 0);
  return (
    <div style={{position:"fixed",inset:0,zIndex:1000}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.9)",backdropFilter:"blur(12px)"}}/>
      <div className="v-cart-panel" onClick={e=>e.stopPropagation()} style={{
        position:"absolute",right:0,top:0,bottom:0,width:390,
        background:"#060606",borderLeft:"1px solid #141414",
        
        display:"flex",flexDirection:"column",
        animation:"slideIn .3s cubic-bezier(.4,0,.2,1)",
      }}>
        <div style={{padding:"30px 26px 18px",borderBottom:"1px solid #0f0f0f",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,color:"#fff",letterSpacing:4,fontWeight:800}}>PANIER</div>
            <div style={{fontSize:9,color:"#444",letterSpacing:3,marginTop:2}}>{cart.length} PIÈCE{cart.length!==1?"S":""}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#444",cursor:"pointer",fontSize:22}}>✕</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"14px 26px"}}>
          {cart.length===0 ? (
            <div style={{textAlign:"center",paddingTop:80}}>
              <div style={{fontSize:44,marginBottom:10,opacity:.2}}>⌚</div>
              <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:3,color:"#222"}}>PANIER VIDE</div>
            </div>
          ) : cart.map((item,i) => (
            <div key={i} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid #0c0c0c",alignItems:"center"}}>
              <div style={{width:60,height:70,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <img src={item.img} alt={item.name} style={{width:60,height:60,objectFit:"contain"}}/>
              </div>
              <div style={{flex:1}}>
                <div style={{color:"#fff",fontSize:14,fontWeight:800,letterSpacing:2,fontFamily:"'Barlow Condensed',sans-serif"}}>{item.name}</div>
                <div style={{color:"#444",fontSize:9,letterSpacing:2,marginTop:1}}>{item.ref}</div>
                <div style={{color:item.accent,fontSize:15,fontWeight:700,marginTop:4,fontFamily:"monospace"}}>{item.price}</div>
              </div>
              <button onClick={()=>onRemove(i)} style={{background:"none",border:"none",color:"#2a2a2a",cursor:"pointer",fontSize:18,transition:"color .15s"}}
                onMouseEnter={e=>e.target.style.color="#e53935"} onMouseLeave={e=>e.target.style.color="#2a2a2a"}>✕</button>
            </div>
          ))}
        </div>
        <div style={{padding:"18px 26px",borderTop:"1px solid #0f0f0f"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <span style={{color:"#444",fontSize:10,letterSpacing:3}}>TOTAL</span>
            <span style={{color:"#fff",fontFamily:"monospace",fontSize:20,fontWeight:700}}>CHF {total.toLocaleString("fr-CH")}</span>
          </div>
          <button onClick={onCheckout} style={{
            width:"100%",padding:"15px",
            background:cart.length>0 && !checkoutLoading ? `linear-gradient(135deg,${accent},${accent}bb)` : "#111",
            border:"none",color:cart.length>0 && !checkoutLoading ? "#000" : "#333",
            fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:800,letterSpacing:4,
            cursor: cart.length>0 && !checkoutLoading ? "pointer" : "not-allowed", borderRadius:3,
            transition:"all .2s",
          }} disabled={cart.length===0 || checkoutLoading}>
            {checkoutLoading ? "REDIRECTION..." : "PAYER AVEC STRIPE →"}
          </button>
          {checkoutError && (
            <div style={{marginTop:10,padding:"8px 10px",background:"#2a0606",border:"1px solid #5a0a0a",borderRadius:3,color:"#e53935",fontSize:11,letterSpacing:1}}>
              {checkoutError}
            </div>
          )}
          <div style={{textAlign:"center",marginTop:10,fontSize:9,color:"#1e1e1e",letterSpacing:2}}>PAIEMENT SÉCURISÉ STRIPE · LIVRAISON ASSURÉE</div>
        </div>
      </div>
    </div>
  );
}


function AccountModal({ onClose, accent, account, setAccount }) {
  const [mode, setMode] = useState(account ? "profile" : "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    setError("");
    if (mode === "signup") {
      if (!name.trim()) return setError("Veuillez saisir votre nom.");
      if (!email.includes("@")) return setError("Adresse e-mail invalide.");
      if (password.length < 6) return setError("Mot de passe trop court (6+ caractères).");
      if (password !== confirm) return setError("Les mots de passe ne correspondent pas.");
      setAccount({ name, email });
      setMode("profile");
    } else if (mode === "login") {
      if (!email.includes("@")) return setError("Adresse e-mail invalide.");
      if (password.length < 1) return setError("Veuillez saisir votre mot de passe.");
      setAccount({ name: email.split("@")[0], email });
      setMode("profile");
    }
  };

  const inputStyle = {
    width:"100%", padding:"12px 14px", marginBottom:12,
    background:"#0a0a0a", border:"1px solid #1a1a1a", borderRadius:3,
    color:"#fff", fontFamily:"'Barlow',sans-serif", fontSize:13,
    outline:"none", transition:"border-color .2s",
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:1100}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.92)",backdropFilter:"blur(14px)"}}/>
      <div className="v-account-modal" onClick={e=>e.stopPropagation()} style={{
        position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
        width:420,maxWidth:"92vw",
        background:"#060606",border:`1px solid ${accent}33`,borderRadius:6,
        padding:"34px 32px",animation:"fadeIn .3s",
      }}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:18,background:"none",border:"none",color:"#444",cursor:"pointer",fontSize:22}}>✕</button>

        <div style={{textAlign:"center",marginBottom:22}}>
          <svg width={36} height={36} viewBox="0 0 30 30" style={{marginBottom:8}}>
            <rect x={1} y={1} width={28} height={28} rx={6} fill="none" stroke={accent} strokeWidth={1.5}/>
            <text x={15} y={21} textAnchor="middle" fill={accent} fontSize={15} fontWeight="900" fontFamily="'Barlow Condensed',sans-serif">V</text>
          </svg>
          <div style={{fontFamily:"'Barlow Condensed',sans-serif",fontSize:20,color:"#fff",letterSpacing:5,fontWeight:800}}>
            {mode==="profile" ? "MON COMPTE" : mode==="signup" ? "CRÉER UN COMPTE" : "CONNEXION"}
          </div>
          <div style={{fontSize:9,color:"#444",letterSpacing:3,marginTop:4}}>
            {mode==="profile" ? "ESPACE CLIENT VOLT" : "VOLT HOROLOGY"}
          </div>
        </div>

        {mode !== "profile" && (
          <div style={{display:"flex",marginBottom:22,borderBottom:"1px solid #131313"}}>
            {[["login","CONNEXION"],["signup","CRÉER UN COMPTE"]].map(([k,l])=>(
              <button key={k} onClick={()=>{setMode(k);setError("");}} style={{
                flex:1,padding:"10px 0",background:"none",border:"none",cursor:"pointer",
                color: mode===k ? "#fff" : "#555",
                fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:3,fontWeight:700,
                borderBottom: mode===k ? `2px solid ${accent}` : "2px solid transparent",
                transition:"all .2s",
              }}>{l}</button>
            ))}
          </div>
        )}

        {mode === "profile" ? (
          <div>
            <div style={{padding:"18px",background:"#0a0a0a",border:"1px solid #131313",borderRadius:4,marginBottom:18}}>
              <div style={{fontSize:9,color:"#444",letterSpacing:3,marginBottom:4}}>NOM</div>
              <div style={{fontSize:16,color:"#fff",fontWeight:600,marginBottom:14}}>{account?.name}</div>
              <div style={{fontSize:9,color:"#444",letterSpacing:3,marginBottom:4}}>E-MAIL</div>
              <div style={{fontSize:13,color:"#aaa",fontFamily:"'Barlow',sans-serif"}}>{account?.email}</div>
            </div>
            <button onClick={()=>{setAccount(null);setMode("login");setEmail("");setPassword("");setName("");setConfirm("");}} style={{
              width:"100%",padding:"13px",background:"transparent",
              border:"1px solid #2a2a2a",color:"#888",borderRadius:3,cursor:"pointer",
              fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:3,fontWeight:700,
            }}>SE DÉCONNECTER</button>
          </div>
        ) : (
          <div>
            {mode==="signup" && (
              <input type="text" placeholder="Nom complet" value={name} onChange={e=>setName(e.target.value)} style={inputStyle}/>
            )}
            <input type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle}/>
            <input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} style={inputStyle}/>
            {mode==="signup" && (
              <input type="password" placeholder="Confirmer le mot de passe" value={confirm} onChange={e=>setConfirm(e.target.value)} style={inputStyle}/>
            )}
            {error && (
              <div style={{color:"#e53935",fontSize:11,marginBottom:12,letterSpacing:1}}>{error}</div>
            )}
            <button onClick={submit} className="cta" style={{
              width:"100%",padding:"14px",
              background:`linear-gradient(135deg,${accent},${accent}bb)`,
              border:"none",color:"#000",borderRadius:3,cursor:"pointer",
              fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:4,fontWeight:900,
            }}>{mode==="signup" ? "CRÉER MON COMPTE →" : "SE CONNECTER →"}</button>
            <div style={{textAlign:"center",marginTop:14,fontSize:9,color:"#1e1e1e",letterSpacing:2}}>
              CONNEXION SÉCURISÉE · DONNÉES CHIFFRÉES
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VoltWatches() {
  const [active, setActive] = useState(0);
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on first render
    try {
      const saved = typeof window !== "undefined" && window.localStorage.getItem("volt_cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [showCart, setShowCart] = useState(false);
  const [added, setAdded] = useState(null);
  const [showAccount, setShowAccount] = useState(false);
  const [account, setAccount] = useState(() => {
    try {
      const saved = typeof window !== "undefined" && window.localStorage.getItem("volt_account");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const w = WATCHES[active];

  // Persist cart to localStorage on every change
  useEffect(() => {
    try { window.localStorage.setItem("volt_cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  // Persist account to localStorage on every change
  useEffect(() => {
    try {
      if (account) window.localStorage.setItem("volt_account", JSON.stringify(account));
      else window.localStorage.removeItem("volt_account");
    } catch {}
  }, [account]);

  const addToCart = (watch) => {
    setCart(c=>[...c,watch]);
    setAdded(watch.id);
    setTimeout(()=>setAdded(null),1800);
  };

  const handleCheckout = async () => {
    if (cart.length === 0 || checkoutLoading) return;
    setCheckoutError("");
    setCheckoutLoading(true);
    try {
      // Demo mode: if no backend is reachable, show a friendly message
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(it => ({
            id: it.id, ref: it.ref, name: it.name,
            price: it.priceNum, currency: "chf", quantity: 1,
          })),
          customerEmail: account?.email || null,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Erreur lors de la création de la session de paiement.");
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Réponse Stripe invalide.");
      }
    } catch (e) {
      console.error(e);
      setCheckoutError(
        "Impossible de joindre le serveur de paiement. " +
        "Vérifiez que les fonctions Vercel et la clé Stripe sont configurées."
      );
      setCheckoutLoading(false);
    }
  };

  return (
    <div style={{fontFamily:"'Barlow Condensed',sans-serif",background:"#040404",minHeight:"100vh",color:"#e0e0e0",overflowX:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes float{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-16px) rotate(-5deg)}}
        @keyframes gp{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes glowAnim{0%,100%{opacity:.3}50%{opacity:.7}}
        ::-webkit-scrollbar{width:2px;}
        ::-webkit-scrollbar-thumb{background:#111;}
        .nb{background:none;border:none;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:3px;color:#444;padding:8px 14px;transition:color .2s;font-weight:600;}
        .nb:hover{color:#fff;}
        .cta{transition:all .18s;cursor:pointer;}
        .cta:hover{transform:translateY(-2px);filter:brightness(1.1);}
        .cta:active{transform:scale(.97);}
        .card{transition:all .28s;cursor:pointer;border-radius:10px;}
        .card:hover{transform:translateY(-8px);}
        .dot{transition:all .28s cubic-bezier(.4,0,.2,1);cursor:pointer;border-radius:50%;overflow:hidden;}
        .dot:hover{transform:scale(1.12);}

        /* === RESPONSIVE MOBILE === */
        @media (max-width: 768px) {
          .v-nav { padding: 0 4% !important; height: 56px !important; }
          .v-nav-links { display: none !important; }
          .v-nav-account-text { display: none !important; }
          .v-nav-panier-text { font-size: 10px !important; padding: 6px 12px !important; }
          .v-hero { flex-direction: column !important; min-height: auto !important; padding: 90px 0 40px !important; gap: 20px; }
          .v-hero-left { flex: none !important; padding: 0 6% !important; width: 100% !important; box-sizing: border-box; }
          .v-hero-right { flex: none !important; width: 100% !important; padding: 0 6% !important; order: -1; }
          .v-hero-watch-img { width: 70vw !important; max-width: 320px !important; }
          .v-hero-bg-text { display: none !important; }
          .v-hero-side-strips { display: none !important; }
          .v-hero-h1 { font-size: 42px !important; line-height: 0.95 !important; }
          .v-hero-grid-specs { grid-template-columns: 1fr 1fr !important; }
          .v-grid-section { padding: 50px 5% !important; }
          .v-grid-header { flex-direction: column !important; gap: 16px; align-items: flex-start !important; margin-bottom: 30px !important; }
          .v-grid-h2 { font-size: 36px !important; }
          .v-watches-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .v-watch-card { padding: 14px 8px !important; }
          .v-watch-card img { height: 110px !important; }
          .v-dna-section { padding: 50px 6% !important; }
          .v-dna-flex { flex-direction: column !important; gap: 30px !important; }
          .v-dna-h3 { font-size: 32px !important; }
          .v-dna-image { width: 200px !important; }
          .v-dna-stats { gap: 20px !important; }
          .v-detail-section { padding: 30px 5% !important; }
          .v-detail-flex { flex-direction: column !important; gap: 30px !important; }
          .v-detail-img { width: 240px !important; }
          .v-detail-h1 { font-size: 42px !important; }
          .v-cart-panel { width: 100vw !important; max-width: 100vw !important; }
          .v-account-modal { width: 92vw !important; padding: 26px 22px !important; }
          .v-footer { flex-wrap: wrap !important; gap: 12px !important; padding: 20px 5% !important; justify-content: center !important; text-align: center; }
        }
      `}</style>

      {/* NAV */}
      <nav className="v-nav" style={{position:"fixed",top:0,left:0,right:0,zIndex:200,height:64,display:"flex",alignItems:"center",padding:"0 5%",background:"rgba(4,4,4,0.97)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${w.accent}18`,transition:"border-color .6s"}}>
        <button onClick={()=>setPage("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
          <svg width={30} height={30} viewBox="0 0 30 30">
            <rect x={1} y={1} width={28} height={28} rx={6} fill="none" stroke={w.accent} strokeWidth={1.5}/>
            <text x={15} y={21} textAnchor="middle" fill={w.accent} fontSize={15} fontWeight="900" fontFamily="'Barlow Condensed',sans-serif">V</text>
          </svg>
          <span style={{fontWeight:900,fontSize:20,letterSpacing:6,color:"#fff"}}>VOLT</span>
          <span style={{fontSize:8,color:"#252525",letterSpacing:3,marginTop:1}}>HOROLOGY</span>
        </button>
        <div style={{flex:1}}/>
        <div className="v-nav-links" style={{display:"flex",gap:2}}>
          {["COLLECTION","SAVOIR-FAIRE","BOUTIQUE"].map(l=><button key={l} className="nb">{l}</button>)}
        </div>
        <div style={{flex:1}}/>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={()=>setShowAccount(true)} style={{
            background:"none",border:`1px solid ${w.accent}33`,borderRadius:4,
            padding:"7px 16px",cursor:"pointer",color:"#666",
            fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:3,
            display:"flex",alignItems:"center",gap:8,transition:"all .2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=w.accent;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=w.accent+"33";e.currentTarget.style.color="#666";}}
          >
            <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx={12} cy={8} r={4}/>
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
            </svg>
            <span className="v-nav-account-text">{account ? account.name.split(" ")[0].toUpperCase() : "COMPTE"}</span>
          </button>
          <button onClick={()=>setShowCart(true)} style={{
            background:"none",border:`1px solid ${w.accent}33`,borderRadius:4,
            padding:"7px 18px",cursor:"pointer",color:"#666",
            fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:3,
            display:"flex",alignItems:"center",gap:8,transition:"all .2s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=w.accent;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=w.accent+"33";e.currentTarget.style.color="#666";}}
          >
            PANIER
            {cart.length>0&&<span style={{background:w.accent,color:"#000",borderRadius:"50%",width:18,height:18,fontSize:10,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{cart.length}</span>}
          </button>
        </div>
      </nav>

      {page==="home"&&(
        <div style={{paddingTop:64}}>
          {/* HERO */}
          <section className="v-hero" style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",background:w.bg,transition:"background .8s ease"}}>
            <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${w.accent}05 1px,transparent 1px),linear-gradient(90deg,${w.accent}05 1px,transparent 1px)`,backgroundSize:"55px 55px",pointerEvents:"none"}}/>
            <div className="v-hero-bg-text" style={{position:"absolute",right:"-2%",bottom:"2%",fontWeight:900,fontSize:"clamp(80px,16vw,210px)",color:"rgba(255,255,255,0.016)",letterSpacing:-8,lineHeight:1,userSelect:"none"}}>{w.ref}</div>

            {/* LEFT */}
            <div className="v-hero-left" style={{flex:"0 0 44%",padding:"0 0 0 7%",animation:"fadeIn .5s",zIndex:2}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:26}}>
                <div style={{width:24,height:1.5,background:w.accent}}/>
                <span style={{fontSize:9,color:w.accent,letterSpacing:4,fontWeight:700}}>{w.limited}</span>
                <div style={{background:w.accent+"20",border:`1px solid ${w.accent}55`,borderRadius:2,padding:"3px 10px"}}>
                  <span style={{fontSize:8,color:w.accent,letterSpacing:3}}>{w.badge}</span>
                </div>
              </div>
              <h1 className="v-hero-h1" style={{fontSize:"clamp(44px,5.5vw,78px)",fontWeight:900,color:"#fff",lineHeight:.9,letterSpacing:1,marginBottom:10,textTransform:"uppercase"}}>
                {w.name.split(" ")[0]}<br/>
                <span style={{color:w.accent}}>{w.name.split(" ").slice(1).join(" ")}</span>
              </h1>
              <div style={{fontSize:12,color:"#3a3a3a",letterSpacing:4,marginBottom:18,fontWeight:500}}>{w.tagline}</div>
              <div style={{width:42,height:2,background:w.accent,marginBottom:22,opacity:.8}}/>
              <p style={{fontSize:14,lineHeight:1.8,color:"#505050",maxWidth:380,marginBottom:34,fontFamily:"'Barlow',sans-serif",fontWeight:300}}>{w.description}</p>
              <div className="v-hero-grid-specs" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 18px",marginBottom:36}}>
                {[["MATIÈRE",w.material],["MOUVEMENT",w.movement],["BATTERIE",w.power],["ÉTANCHÉITÉ",w.water]].map(([k,v])=>(
                  <div key={k} style={{borderLeft:`2px solid ${w.accent}44`,paddingLeft:10}}>
                    <div style={{fontSize:8,color:"#2a2a2a",letterSpacing:3,marginBottom:2}}>{k}</div>
                    <div style={{fontSize:11,color:"#888",fontFamily:"'Barlow',sans-serif"}}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:24}}>
                <span style={{fontSize:44,fontWeight:900,color:"#fff"}}>{w.price}</span>
                <span style={{fontSize:9,color:"#2a2a2a",letterSpacing:3}}>TVA INCLUSE</span>
              </div>
              <div style={{display:"flex",gap:10,marginBottom:34}}>
                <button className="cta" onClick={()=>addToCart(w)} style={{
                  flex:2,padding:"14px 0",
                  background:added===w.id?w.accent+"22":`linear-gradient(135deg,${w.accent},${w.accent}cc)`,
                  border:added===w.id?`1px solid ${w.accent}`:"none",
                  color:added===w.id?w.accent:"#000",
                  fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,fontWeight:900,letterSpacing:4,borderRadius:3,
                }}>{added===w.id?"✓ AJOUTÉ AU PANIER":"AJOUTER AU PANIER"}</button>
                <button className="cta" onClick={()=>setPage("detail")} style={{
                  flex:1,padding:"14px 0",background:"transparent",
                  border:`1px solid ${w.accent}44`,color:w.accent,
                  fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,fontWeight:600,letterSpacing:3,borderRadius:3,
                }}>DÉTAILS</button>
              </div>
              {/* Color dots avec vraies photos */}
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontSize:8,color:"#2a2a2a",letterSpacing:4}}>COLORIS</span>
                {WATCHES.map((ww,i)=>(
                  <div key={ww.id} className="dot" onClick={()=>setActive(i)} style={{
                    width:i===active?44:32,height:i===active?44:32,
                    border:i===active?`2.5px solid ${ww.accent}`:"2px solid #1a1a1a",
                    boxShadow:i===active?`0 0 18px ${ww.accent}77`:"none",
                    background:"#0a0a0a",
                  }}>
                    <img src={ww.img} alt={ww.name} style={{width:"100%",height:"100%",objectFit:"contain"}}/>
                  </div>
                ))}
              </div>
            </div>

            {/* CENTER — Watch photo SANS fond */}
            <div className="v-hero-right" style={{flex:1,display:"flex",justifyContent:"center",alignItems:"center",padding:"60px 20px",zIndex:2}}>
              <div style={{position:"relative",animation:"float 5s ease-in-out infinite"}}>
                {/* Glow au sol */}
                <div style={{
                  position:"absolute",bottom:"-10%",left:"50%",transform:"translateX(-50%)",
                  width:"60%",height:24,background:w.accent,
                  borderRadius:"50%",filter:"blur(30px)",
                  opacity:.45,animation:"glowAnim 3s ease-in-out infinite",
                }}/>
                <img className="v-hero-watch-img" src={w.img} alt={w.name} style={{
                  width:"clamp(260px,26vw,420px)",
                  objectFit:"contain",
                  filter:`drop-shadow(0 40px 60px rgba(0,0,0,1)) drop-shadow(0 0 60px ${w.glow})`,
                  transition:"all .6s cubic-bezier(.4,0,.2,1)",
                }}/>
              </div>
            </div>

            {/* Nav strips */}
            <div className="v-hero-side-strips" style={{position:"absolute",right:30,top:"50%",transform:"translateY(-50%)",display:"flex",flexDirection:"column",gap:8,alignItems:"center"}}>
              <div style={{writingMode:"vertical-rl",fontSize:8,color:"#1e1e1e",letterSpacing:4,marginBottom:8}}>COLLECTION</div>
              {WATCHES.map((ww,i)=>(
                <div key={ww.id} onClick={()=>setActive(i)} style={{
                  width:i===active?3:1,height:i===active?36:18,
                  background:i===active?ww.accent:"#181818",
                  borderRadius:99,cursor:"pointer",transition:"all .3s",
                  boxShadow:i===active?`0 0 10px ${ww.accent}`:"none",
                }}/>
              ))}
            </div>
          </section>

          {/* GRID */}
          <section className="v-grid-section" style={{padding:"80px 5%",background:"#020202"}}>
            <div className="v-grid-header" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:50}}>
              <div>
                <div style={{fontSize:9,color:"#252525",letterSpacing:5,marginBottom:8}}>LA COLLECTION</div>
                <h2 className="v-grid-h2" style={{fontSize:52,fontWeight:900,color:"#fff",letterSpacing:2,lineHeight:.9}}>
                  5 PIÈCES<br/><span style={{WebkitTextStroke:"1px #1e1e1e",color:"transparent"}}>UNIQUES</span>
                </h2>
              </div>
              <div style={{textAlign:"right",fontSize:10,color:"#1a1a1a",letterSpacing:3,lineHeight:2}}>PRODUCTION LIMITÉE<br/>SWISS MADE</div>
            </div>
            <div className="v-watches-grid" style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12}}>
              {WATCHES.map((ww,i)=>(
                <div key={ww.id} className="card v-watch-card"
                  onClick={()=>{setActive(i);window.scrollTo({top:0,behavior:"smooth"});}} style={{background:`linear-gradient(160deg,#0c0c0c,${ww.accent}12)`,border:`1px solid ${i===active?ww.accent+"55":"#0f0f0f"}`,padding:"18px 12px",textAlign:"center",position:"relative"}}
                >
                  {i===active&&<div style={{position:"absolute",top:8,left:8,width:6,height:6,borderRadius:"50%",background:ww.accent,animation:"gp 2s infinite"}}/>}
                  <div style={{height:155,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}>
                    <img src={ww.img} alt={ww.name} style={{
                      height:"100%",maxWidth:"100%",objectFit:"contain",
                      filter:`drop-shadow(0 12px 28px rgba(0,0,0,1)) drop-shadow(0 0 20px ${ww.glow})`,
                      transition:"transform .3s",
                    }}/>
                  </div>
                  <div style={{fontSize:8,color:ww.accent,letterSpacing:3,marginBottom:3}}>{ww.badge}</div>
                  <div style={{fontSize:15,fontWeight:800,color:"#fff",letterSpacing:1,marginBottom:2}}>{ww.name}</div>
                  <div style={{fontSize:8,color:"#252525",letterSpacing:2,marginBottom:10}}>{ww.limited}</div>
                  <div style={{fontSize:18,fontWeight:800,color:ww.accent,fontFamily:"monospace",marginBottom:12}}>{ww.price}</div>
                  <button onClick={e=>{e.stopPropagation();addToCart(ww);}} style={{
                    width:"100%",padding:"7px 0",
                    background:added===ww.id?ww.accent+"22":"transparent",
                    border:`1px solid ${ww.accent}44`,
                    color:added===ww.id?ww.accent:"#333",
                    fontFamily:"'Barlow Condensed',sans-serif",fontSize:9,letterSpacing:3,
                    cursor:"pointer",borderRadius:3,transition:"all .2s",
                  }}>{added===ww.id?"✓ RÉSERVÉ":"RÉSERVER"}</button>
                </div>
              ))}
            </div>
          </section>

          {/* DNA */}
          <section className="v-dna-section" style={{padding:"80px 7%",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",inset:0,backgroundImage:`linear-gradient(${w.accent}04 1px,transparent 1px),linear-gradient(90deg,${w.accent}04 1px,transparent 1px)`,backgroundSize:"42px 42px"}}/>
            <div className="v-dna-flex" style={{display:"flex",gap:"8%",alignItems:"center",flexWrap:"wrap",position:"relative"}}>
              <div style={{flex:"1 1 380px"}}>
                <div style={{fontSize:9,color:"#252525",letterSpacing:5,marginBottom:12}}>ADN VOLT</div>
                <h3 className="v-dna-h3" style={{fontSize:50,fontWeight:900,color:"#fff",lineHeight:.95,marginBottom:22}}>
                  FORGÉE POUR<br/><span style={{color:w.accent}}>L'EXTRÊME.</span>
                </h3>
                <p style={{fontSize:14,color:"#383838",lineHeight:1.9,maxWidth:480,fontFamily:"'Barlow',sans-serif",fontWeight:300}}>
                  Chaque pièce VOLT est usinée dans des matériaux Carbon TPT® issus de l'aérospatiale. Mouvements squelette entièrement visibles, vis étoile en titane, boîtier tonneau signature.
                </p>
                <div className="v-dna-stats" style={{display:"flex",gap:40,marginTop:48,flexWrap:"wrap"}}>
                  {[["600","COUCHES CARBON"],["6000G","RÉSISTANCE"],["29g","POIDS MIN"],["100m","ÉTANCHÉITÉ"]].map(([n,l])=>(
                    <div key={l}>
                      <div style={{fontSize:30,fontWeight:900,color:w.accent}}>{n}</div>
                      <div style={{fontSize:8,color:"#252525",letterSpacing:3,marginTop:3}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{flex:"0 0 auto"}}>
                <img className="v-dna-image" src={w.img} alt={w.name} style={{
                  width:260,objectFit:"contain",
                  filter:`drop-shadow(0 0 50px ${w.glow}) drop-shadow(0 30px 40px rgba(0,0,0,1))`,
                  transform:"rotate(-8deg)",
                }}/>
              </div>
            </div>
          </section>

          <footer className="v-footer" style={{padding:"22px 6%",borderTop:"1px solid #0a0a0a",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontSize:18,fontWeight:900,letterSpacing:7,color:"#141414"}}>VOLT</div>
            <div style={{fontSize:9,color:"#141414",letterSpacing:3}}>© 2026 VOLT HOROLOGY · SWISS MADE</div>
            <div style={{fontSize:9,color:"#141414",letterSpacing:3}}>LIVRAISON · RETOURS · CGV</div>
          </footer>
        </div>
      )}

      {page==="detail"&&(
        <div style={{paddingTop:64,animation:"fadeIn .4s"}}>
          <div className="v-detail-section" style={{maxWidth:1180,margin:"0 auto",padding:"56px 6%"}}>
            <button onClick={()=>setPage("home")} style={{background:"none",border:"none",color:w.accent,cursor:"pointer",fontFamily:"'Barlow Condensed',sans-serif",fontSize:11,letterSpacing:4,marginBottom:52,display:"flex",alignItems:"center",gap:8}}>← COLLECTION</button>
            <div className="v-detail-flex" style={{display:"flex",gap:"7%",alignItems:"flex-start",flexWrap:"wrap"}}>
              <div style={{flex:"0 0 auto",display:"flex",flexDirection:"column",alignItems:"center",gap:26}}>
                <div style={{position:"relative"}}>
                  <div style={{position:"absolute",bottom:"-5%",left:"50%",transform:"translateX(-50%)",width:"50%",height:20,background:w.accent,borderRadius:"50%",filter:"blur(25px)",opacity:.5}}/>
                  <img className="v-detail-img" src={w.img} alt={w.name} style={{
                    width:340,objectFit:"contain",
                    filter:`drop-shadow(0 50px 80px rgba(0,0,0,1)) drop-shadow(0 0 60px ${w.glow})`,
                    transform:"rotate(-5deg)",
                  }}/>
                </div>
                <div style={{display:"flex",gap:10}}>
                  {WATCHES.map((ww,i)=>(
                    <div key={ww.id} className="dot" onClick={()=>setActive(i)} style={{
                      width:34,height:34,background:"#0a0a0a",
                      border:i===active?`2.5px solid ${ww.accent}`:"2px solid #1a1a1a",
                      boxShadow:i===active?`0 0 14px ${ww.accent}77`:"none",
                    }}>
                      <img src={ww.img} alt={ww.name} style={{width:"100%",height:"100%",objectFit:"contain"}}/>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{flex:1,minWidth:280}}>
                <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}>
                  <span style={{fontSize:9,color:w.accent,letterSpacing:4}}>{w.badge}</span>
                  <span style={{width:1,height:10,background:"#1e1e1e"}}/>
                  <span style={{fontSize:9,color:"#252525",letterSpacing:3}}>{w.limited}</span>
                </div>
                <div style={{fontSize:11,color:"#252525",letterSpacing:4,marginBottom:6}}>{w.tagline}</div>
                <h1 className="v-detail-h1" style={{fontSize:58,fontWeight:900,color:"#fff",letterSpacing:2,lineHeight:.88,marginBottom:16}}>{w.name}</h1>
                <div style={{fontSize:9,color:"#1e1e1e",letterSpacing:4,marginBottom:20}}>{w.ref}</div>
                <div style={{width:38,height:2,background:w.accent,marginBottom:22}}/>
                <p style={{fontSize:14,lineHeight:1.8,color:"#484848",marginBottom:34,fontFamily:"'Barlow',sans-serif",fontWeight:300}}>{w.description}</p>
                <div style={{marginBottom:36}}>
                  <div style={{fontSize:8,color:"#1a1a1a",letterSpacing:4,marginBottom:12}}>SPÉCIFICATIONS</div>
                  {[["RÉFÉRENCE",w.ref],["MATIÈRE",w.material],["MOUVEMENT",w.movement],["BATTERIE",w.power],["DIMENSIONS",w.size],["ÉTANCHÉITÉ",w.water]].map(([k,v])=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"10px",borderBottom:"1px solid #0c0c0c",transition:"background .15s"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#0a0a0a"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                    >
                      <span style={{fontSize:9,color:"#2a2a2a",letterSpacing:3}}>{k}</span>
                      <span style={{fontSize:13,color:"#aaa",fontFamily:"'Barlow',sans-serif"}}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:24}}>
                  <span style={{fontSize:46,fontWeight:900,color:"#fff"}}>{w.price}</span>
                  <span style={{fontSize:8,color:"#2a2a2a",letterSpacing:3}}>TVA CH · LIVRAISON OFFERTE</span>
                </div>
                <div style={{display:"flex",gap:10,marginBottom:16}}>
                  <button className="cta" onClick={()=>addToCart(w)} style={{
                    flex:2,padding:"16px",
                    background:added===w.id?w.accent+"22":`linear-gradient(135deg,${w.accent},${w.accent}bb)`,
                    border:added===w.id?`1px solid ${w.accent}`:"none",
                    color:added===w.id?w.accent:"#000",
                    fontFamily:"'Barlow Condensed',sans-serif",fontSize:13,fontWeight:900,letterSpacing:4,borderRadius:3,
                  }}>{added===w.id?"✓ AJOUTÉ AU PANIER":"AJOUTER AU PANIER →"}</button>
                  <button className="cta" onClick={()=>setShowCart(true)} style={{
                    flex:1,padding:"16px",background:"transparent",
                    border:`1px solid ${w.accent}33`,color:w.accent,
                    fontFamily:"'Barlow Condensed',sans-serif",fontSize:12,letterSpacing:3,borderRadius:3,
                  }}>PANIER ({cart.length})</button>
                </div>
                <div style={{display:"flex",gap:20,fontSize:9,color:"#1e1e1e",letterSpacing:2}}>
                  {["🔒 SSL","📦 48H","🔄 30J","🛡️ 3 ANS"].map(t=><span key={t}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCart&&<Cart cart={cart} onRemove={i=>setCart(c=>c.filter((_,j)=>j!==i))} onClose={()=>setShowCart(false)} accent={w.accent} onCheckout={handleCheckout} checkoutLoading={checkoutLoading} checkoutError={checkoutError}/>}
      {showAccount&&<AccountModal onClose={()=>setShowAccount(false)} accent={w.accent} account={account} setAccount={setAccount}/>}
    </div>
  );
}
