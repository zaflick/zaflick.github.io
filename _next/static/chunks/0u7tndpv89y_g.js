(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,76319,e=>{"use strict";var t=e.i(90072),i=e.i(8560);let r=([e,t])=>[(e-500)/365,(625-t)/365],a=e=>e.map(([e,t])=>[1e3-e,t]),o=e=>e.map(a).reverse().map(e=>e.slice().reverse()),s=[[[316,150],[290,240],[272,360],[264,480],[270,600],[288,720],[300,820],[304,920],[318,1050],[332,1186]],[[332,1186],[420,1190]],[[420,1190],[414,1060],[424,930],[446,800],[466,680],[480,570],[494,472]],[[494,472],[499,320],[500,152]],[[500,152],[316,150]]],n={id:"legging",color:"#4f2536",panel:{cx:500,cy:640,w:930,h:1330},pieces:[{id:"leg-l",edges:s,marker:{dx:-165,dy:30,rot:.05}},{id:"leg-r",edges:o(s),marker:{dx:15,dy:25,rot:-.04}},{id:"waistband",edges:[[[318,44],[500,38],[682,44]],[[682,44],[686,150]],[[686,150],[500,154],[314,150]],[[314,150],[318,44]]],marker:{dx:335,dy:330,rot:Math.PI/2}},{id:"pocket",edges:[[[652,292],[716,300]],[[716,300],[722,520]],[[722,520],[664,516]],[[664,516],[652,292]]],marker:{dx:190,dy:640,rot:-.2},front:!0}],seams:[{kind:"seam",pts:[[314,150],[500,154],[686,150]]},{kind:"seam",pts:[[500,156],[499,320],[494,470]]},{kind:"seam",pts:[[656,296],[668,512],[718,516]]},{kind:"piping",pts:[[588,140],[625,300],[648,450],[640,560],[590,650],[570,740],[588,880],[616,1030],[640,1180]]},{kind:"seam",pts:[[336,1172],[418,1176]]},{kind:"seam",pts:[[582,1176],[664,1172]]}]},l=[[[215,232],[160,270],[128,370],[106,480],[100,560]],[[100,560],[170,585],[236,600]],[[236,600],[236,545]],[[236,545],[226,390],[215,232]]],c=[n,{id:"tee",color:"#4b5140",panel:{cx:510,cy:660,w:940,h:1360},pieces:[{id:"body",edges:[[[380,150],[215,232]],[[215,232],[226,390],[236,545]],[[236,545],[234,800],[232,1140]],[[232,1140],[500,1146],[768,1140]],[[768,1140],[766,800],[764,545]],[[764,545],[774,390],[785,232]],[[785,232],[620,150]],[[620,150],[566,192],[500,206],[434,192],[380,150]]],marker:{dx:-115,dy:10,rot:0}},{id:"sleeve-l",edges:l,marker:{dx:630,dy:-60,rot:-.3}},{id:"sleeve-r",edges:o(l),marker:{dx:-40,dy:360,rot:.25}},{id:"collar",edges:[[[372,146],[436,132],[500,128],[564,132],[628,146]],[[628,146],[620,158]],[[620,158],[566,200],[500,216],[434,200],[380,158]],[[380,158],[372,146]]],marker:{dx:285,dy:960,rot:.08},front:!0}],seams:[{kind:"seam",pts:[[380,158],[434,200],[500,216],[566,200],[620,158]]},{kind:"seam",pts:[[215,232],[226,390],[236,545]]},{kind:"seam",pts:[[785,232],[774,390],[764,545]]},{kind:"piping",pts:[[258,440],[290,560],[312,690],[310,820],[292,960],[270,1120]]},{kind:"piping",pts:[[742,440],[710,560],[688,690],[690,820],[708,960],[730,1120]]},{kind:"seam",pts:[[108,545],[172,570],[232,585]]},{kind:"seam",pts:[[892,545],[828,570],[768,585]]},{kind:"seam",pts:[[240,1122],[500,1128],[760,1122]]}]}],u=[0,.16],m=[.16,.34],v=[.34,.43],d=[.43,.6],p=[.58,.83],h=(e,t,i)=>Math.min(1,Math.max(0,(e-t)/(i-t))),f=e=>e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2,g=(e,t,i)=>e+(t-e)*i,x=`
vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}`,w=`
uniform float uTime;
uniform vec2 uSize;
uniform float uAmp;
uniform float uKnitMul;
uniform float uDensity;
uniform vec2 uKnitOffset;
uniform float uKnitRot;
varying vec2 vKnit;
varying vec3 vN;
varying vec3 vViewPos;
varying vec2 vP;
${x}
float disp(vec2 p){
  if (uAmp < 0.0001) return 0.0;
  float t = uTime;
  float d = sin(p.x*0.55 + t*0.35 + sin(p.y*0.45 + t*0.21)*1.4) * 0.5;
  d += sin(p.y*1.05 - t*0.48 + p.x*0.3) * 0.2;
  d += snoise(p*0.42 + vec2(t*0.07, -t*0.05)) * 0.42;
  d += (1.0 - abs(snoise(p*0.85 + vec2(-t*0.06, t*0.045)))) * 0.2;
  return d * uAmp;
}
void main(){
  vec2 p = position.xy * uSize;
  float e = 0.04;
  float h = disp(p);
  float hx = disp(p + vec2(e, 0.0)) - disp(p - vec2(e, 0.0));
  float hy = disp(p + vec2(0.0, e)) - disp(p - vec2(0.0, e));
  vec3 n = normalize(vec3(-hx / (2.0*e), -hy / (2.0*e), 1.0));
  vec4 mv = modelViewMatrix * vec4(p, h, 1.0);
  vN = normalize(normalMatrix * n);
  vViewPos = mv.xyz;
  float c = cos(uKnitRot), s = sin(uKnitRot);
  vec2 kp = uKnitOffset + mat2(c, s, -s, c) * p;
  vKnit = kp * uKnitMul * uDensity;
  vP = p;
  gl_Position = projectionMatrix * mv;
}`,y=`
uniform vec3 uColor;
uniform vec3 uColor2;
uniform float uSplit;
uniform vec2 uSplitDir;
uniform float uOpacity;
uniform float uKnitAmt;
uniform float uLight;
varying vec2 vKnit;
varying vec3 vN;
varying vec3 vViewPos;
varying vec2 vP;
mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
// One leg of a knit "V" stitch.
float loopH(vec2 f, float side){
  vec2 q = f - vec2(0.2 * side, 0.0);
  q = rot(-0.45 * side) * q; // legs lean out at the top: a "V", like real jersey
  float e = length(q / vec2(0.18, 0.56));
  return 1.0 - smoothstep(0.35, 1.0, e);
}
float knit(vec2 st){
  vec2 f = fract(st) - 0.5;
  float h = max(loopH(f, -1.0), loopH(f, 1.0));
  // Loops from the row above overlap this cell, which is what makes rows interlock.
  vec2 g = f + vec2(0.0, -1.0);
  h = max(h, 0.85 * max(loopH(g, -1.0), loopH(g, 1.0)));
  return h;
}
void main(){
  vec2 st = vKnit * vec2(1.0, 1.25);
  float h = knit(st);
  // Fade the knit out where a stitch is only a few pixels, to avoid shimmer.
  float fw = length(fwidth(st));
  float detail = 1.0 - smoothstep(0.18, 0.5, fw);
  h = mix(0.7, h, detail * uKnitAmt);

  vec3 N = normalize(vN);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(-vViewPos);
  vec3 L = normalize(vec3(-0.45, 0.75, 0.65));
  float wrap = max((dot(N, L) + 0.45) / 1.45, 0.0);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);
  vec3 base = mix(uColor, uColor2, uSplit * smoothstep(-0.01, 0.01, dot(vP, uSplitDir)));
  vec3 col = base * (0.36 + 0.86 * wrap) * uLight;
  col *= mix(0.68, 1.1, h);
  // Soft, slightly warm sheen at grazing angles (brushed jersey, not satin).
  col += mix(base, vec3(0.86, 0.78, 0.7), 0.35) * fres * 0.32;
  vec3 H = normalize(L + V);
  col += vec3(1.0, 0.96, 0.9) * pow(max(dot(N, H), 0.0), 28.0) * 0.05;
  gl_FragColor = vec4(col, uOpacity);
}`,k=`
varying vec2 vUv;
varying vec3 vN;
void main(){
  vUv = uv;
  vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,C=`
uniform vec3 uColor;
uniform float uProgress;
uniform float uDashes;
uniform float uOpacity;
varying vec2 vUv;
varying vec3 vN;
void main(){
  if (vUv.x > uProgress) discard;
  if (uDashes > 0.0 && fract(vUv.x * uDashes) > 0.58) discard;
  float l = 0.62 + 0.45 * max(dot(normalize(vN), normalize(vec3(-0.3, 0.6, 0.8))), 0.0);
  gl_FragColor = vec4(uColor * l, uOpacity);
}`,z=e=>{let i=parseInt(e.slice(1),16);return new t.cE((i>>16&255)/255,(i>>8&255)/255,(255&i)/255)},P="#c96b4a";function b(e){return new t.Zg({vertexShader:w,fragmentShader:y,side:t.Vs,transparent:!0,uniforms:{uTime:{value:0},uSize:{value:new t.wq(1,1)},uAmp:{value:1},uKnitMul:{value:1},uDensity:{value:24},uKnitOffset:{value:new t.wq},uKnitRot:{value:0},uColor:{value:z(e)},uColor2:{value:z(e)},uSplit:{value:0},uSplitDir:{value:new t.wq(1,0)},uOpacity:{value:1},uKnitAmt:{value:1},uLight:{value:1}}})}function M(e,i){return new t.Zg({vertexShader:k,fragmentShader:C,transparent:!0,uniforms:{uColor:{value:z(e)},uProgress:{value:0},uDashes:{value:i},uOpacity:{value:1}}})}function S(e){let i=new t.C9,a=new t.wq(...r([e.panel.cx,e.panel.cy])),o=new t.wq(e.panel.w/365,e.panel.h/365),s=e.pieces.map((o,s)=>{var n;let l,c=(n=o.edges,l=[],n.forEach(e=>{let i=e.map(e=>{let[i,a]=r(e);return new t.cE(i,a,0)});(i.length>2?new t.$7(i,!1,"centripetal").getPoints(6*i.length):i).forEach((e,i)=>{l.length&&0===i||l.push(new t.wq(e.x,e.y))})}),l.length>1&&1e-4>l[0].distanceTo(l[l.length-1])&&l.pop(),l),u=new t.Xl().setFromPoints(c).getCenter(new t.wq),m=c.map(e=>e.clone().sub(u)),v=new t.Ow(m),d=new t.pY(v,1),p=b(e.color);p.uniforms.uAmp.value=0;let h=new t.wq(o.marker.dx/365,-o.marker.dy/365);p.uniforms.uKnitOffset.value.copy(u.clone().add(h).sub(a)),p.uniforms.uKnitRot.value=o.marker.rot;let f=new t.kE(d,p);f.renderOrder=o.front?6:5;let g=new t.p$({color:2759186,transparent:!0,opacity:0,depthWrite:!1}),x=new t.kE(d,g);x.renderOrder=4;let w=m.map(e=>new t.cE(e.x,e.y,.004)),y=new t.$7(w,!0,"catmullrom",0),k=M(P,26*y.getLength()),C=new t.kE(new t.Dn(y,Math.max(64,2*w.length),.007,4,!0),k);C.renderOrder=7;let z=new t.C9;return z.add(x,f,C),i.add(z),{group:z,mesh:f,mat:p,shadowMat:g,shadow:x,outlineMat:k,c:u,marker:h,markerRot:o.marker.rot,front:!!o.front,delay:s/e.pieces.length}}),n=e.seams.map(e=>{let i=e.pts.map(e=>{let[i,a]=r(e);return new t.cE(i,a,.03)});return new t.$7(i,!1,"centripetal")}),l=n.map(e=>e.getLength()),c=l.reduce((e,t)=>e+t,0),u=0,m=e.seams.map((e,r)=>{let a="piping"===e.kind,o=M(a?"#efe6d6":P,a?0:30*l[r]),s=new t.kE(new t.Dn(n[r],96,a?.012:.008,5,!1),o);s.renderOrder=8,i.add(s);let m=u/c;return u+=l[r],{mat:o,curve:n[r],a:m,b:u/c}}),v=new t.C9,d=new t.p$({color:0xbdb8b0}),p=new t.kE(new t.o1(.011,.011,.26,8),d);p.rotation.z=Math.PI/2,p.position.x=-.13;let h=new t.kE(new t.e0(.011,.07,8),d);return h.rotation.z=-Math.PI/2,h.position.x=.035,v.add(p,h),v.renderOrder=9,v.visible=!1,i.add(v),{def:e,group:i,pieces:s,seams:m,needle:v,panelC:a,panelS:o}}e.s(["StitchScene",0,class{canvas;cards;renderer;scene;camera;sheets;garments;w;h;cardRects;CZ;constructor(e,r){this.canvas=e,this.cards=r,this.scene=new t.P6,this.camera=new t.zm(35,1,.1,100),this.w=0,this.h=0,this.cardRects=[],this.CZ=8,this.renderer=new i.f({canvas:e,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setClearColor(0,0),this.renderer.outputColorSpace=t.Rg;let a=window.innerWidth<768?90:140;this.sheets=["#4f2536","#4b5140"].map((e,i)=>{let r=b(e),o=new t.kE(new t.CQ(1,1,a,a),r);return o.renderOrder=0===i?2:1,this.scene.add(o),{mesh:o,mat:r}}),this.garments=c.map(S),this.garments.forEach(e=>this.scene.add(e.group)),this.resize()}resize(){let e=this.canvas.clientWidth,t=this.canvas.clientHeight;e&&t&&(this.w=e,this.h=t,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,e<768?1.35:1.6)),this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.measureCards())}measureCards(){let e=this.canvas.getBoundingClientRect();this.cardRects=this.cards.map(t=>{let i=t.getBoundingClientRect();return{x:i.left-e.left+i.width/2,y:i.top-e.top+i.height/2,w:i.width,h:i.height}})}visH(e=this.CZ){return 2*e*Math.tan(t.rA.degToRad(this.camera.fov/2))}render(e,t){let i=e/1e3;this.sheets.forEach(e=>e.mat.uniforms.uTime.value=i),this.layout(t),this.renderer.render(this.scene,this.camera)}layout(e){this.camera.position.set(0,0,this.CZ),this.camera.lookAt(0,0,0);let t=this.visH(),i=t*(this.w/this.h),r=t/this.h,a=f(h(e,...u)),o=h(e,...m),s=1-Math.pow(1-h(e,...v),3),n=f(h(e,...d)),l=h(e,...p);this.garments.forEach((e,c)=>{let u=this.cardRects[c]||{x:0,y:0,w:0,h:0},m=u.h*r*.292,v=(u.x-this.w/2)*r,d=-(u.y-this.h/2)*r;e.group.position.set(v,d,0),e.group.scale.setScalar(m||.001),e.group.visible=a>.98;let p=this.sheets[c];p.mesh.visible=s<1;let f=e.panelS.x*m,x=e.panelS.y*m,w=v+e.panelC.x*m,y=d+e.panelC.y*m,k=0===c?-1:1;p.mesh.position.set(g(k*i*.27,w,a),g(.2,y,a),g(-.6,0,a)),p.mesh.rotation.set(g(-.42,0,a),g(.18*k,0,a),g(-.06*k,0,a)),p.mat.uniforms.uSize.value.set(g(.62*i,f,a),g(1.35*t,x,a)),p.mat.uniforms.uAmp.value=g(.55,0,a),p.mat.uniforms.uOpacity.value=1-s,p.mat.depthWrite=0===s,e.pieces.forEach(e=>{let t=h(o,.5*e.delay,.5*e.delay+.5);e.outlineMat.uniforms.uProgress.value=t,e.outlineMat.uniforms.uOpacity.value=1-h(n,.2,.7),e.mesh.visible=s>0,e.mat.uniforms.uKnitMul.value=m;let i=h(n,.75,1),r=.01+.12*s*(1-i)+.006*!!e.front;e.group.position.set(e.c.x+e.marker.x*(1-n),e.c.y+e.marker.y*(1-n),r),e.group.rotation.z=e.markerRot*(1-n),e.shadowMat.opacity=.22*s*(1-.85*i),e.shadow.position.set(.035*(1-i),-.05*(1-i),-.008)});let C=!1;e.seams.forEach(t=>{let i=h(l,t.a,t.b);if(t.mat.uniforms.uProgress.value=i,!C&&i>0&&i<1){C=!0;let r=t.curve.getPointAt(i),a=t.curve.getTangentAt(i);e.needle.position.set(r.x,r.y,.06),e.needle.rotation.set(0,-.35,Math.atan2(a.y,a.x))}}),e.needle.visible=C})}dispose(){this.scene.traverse(e=>{e.geometry?.dispose();let t=e.material;Array.isArray(t)?t.forEach(e=>e.dispose()):t?.dispose()}),this.renderer.dispose()}}],76319)}]);