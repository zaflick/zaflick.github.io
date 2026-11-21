(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,38419,e=>{"use strict";var t=e.i(90072),i=e.i(8560);let o=`
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
}`,s=`
uniform float uTime;
uniform vec2 uSize;
uniform float uAmp;
uniform float uDensity;
varying vec2 vKnit;
varying vec3 vN;
varying vec3 vViewPos;
${o}
float disp(vec2 p){
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
  vKnit = p * uDensity;
  gl_Position = projectionMatrix * mv;
}`,a=`
uniform vec3 uColor;
varying vec2 vKnit;
varying vec3 vN;
varying vec3 vViewPos;
mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
// One leg of a knit "V" stitch.
float loopH(vec2 f, float side){
  vec2 q = f - vec2(0.2 * side, 0.0);
  q = rot(-0.45 * side) * q;
  float e = length(q / vec2(0.18, 0.56));
  return 1.0 - smoothstep(0.35, 1.0, e);
}
float knit(vec2 st){
  vec2 f = fract(st) - 0.5;
  float h = max(loopH(f, -1.0), loopH(f, 1.0));
  vec2 g = f + vec2(0.0, -1.0);
  h = max(h, 0.85 * max(loopH(g, -1.0), loopH(g, 1.0)));
  return h;
}
void main(){
  vec2 st = vKnit * vec2(1.0, 1.25);
  float h = knit(st);
  // Fade the knit out where a stitch is only a few pixels, to avoid shimmer.
  float fw = length(fwidth(st));
  h = mix(0.7, h, 1.0 - smoothstep(0.18, 0.5, fw));
  vec3 N = normalize(vN);
  if (!gl_FrontFacing) N = -N;
  vec3 V = normalize(-vViewPos);
  vec3 L = normalize(vec3(-0.45, 0.75, 0.65));
  float wrap = max((dot(N, L) + 0.45) / 1.45, 0.0);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);
  vec3 col = uColor * (0.36 + 0.86 * wrap);
  col *= mix(0.68, 1.1, h);
  col += mix(uColor, vec3(0.86, 0.78, 0.7), 0.35) * fres * 0.32;
  vec3 H = normalize(L + V);
  col += vec3(1.0, 0.96, 0.9) * pow(max(dot(N, H), 0.0), 28.0) * 0.05;
  gl_FragColor = vec4(col, 1.0);
}`;e.s(["FabricScene",0,class{canvas;renderer;scene;camera;mesh;mat;w;h;start;end;look;lookStart;lookEnd;constructor(e){this.canvas=e,this.scene=new t.P6,this.camera=new t.zm(35,1,.1,100),this.w=0,this.h=0,this.start=new t.cE,this.end=new t.cE(.35,-.55,.62),this.look=new t.cE,this.lookStart=new t.cE(0,-1.5,-2.2),this.lookEnd=new t.cE(.38,-1.7,-.45),this.renderer=new i.f({canvas:e,antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setClearColor(5186870,1),this.renderer.outputColorSpace=t.Rg;let o=window.innerWidth<768?110:170;this.mat=new t.Zg({vertexShader:s,fragmentShader:a,side:t.Vs,uniforms:{uTime:{value:0},uSize:{value:new t.wq(30,30)},uAmp:{value:1},uDensity:{value:24},uColor:{value:new t.cE(79/255,37/255,54/255)}}}),this.mesh=new t.kE(new t.CQ(1,1,o,o),this.mat),this.mesh.position.set(0,-1.6,0),this.mesh.rotation.set(-1.08,0,.12),this.scene.add(this.mesh),this.resize()}resize(){let e=this.canvas.clientWidth,t=this.canvas.clientHeight;e&&t&&(this.w=e,this.h=t,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,e<768?1.35:1.6)),this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix())}render(e,t){let i,o=this.w/this.h||1,s=(i=Math.min(1,Math.max(0,(t-.05)/.85)))<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;this.mat.uniforms.uTime.value=e/1e3,this.mat.uniforms.uSize.value.set(Math.max(30,22*o),30),this.mat.uniforms.uAmp.value=1+-.55*s;let a=o<.8;this.start.set(0,a?1.6:1.1,a?11:8.5),this.camera.position.lerpVectors(this.start,this.end,s),this.look.lerpVectors(this.lookStart,this.lookEnd,s),this.camera.lookAt(this.look),this.renderer.render(this.scene,this.camera)}dispose(){this.mesh.geometry.dispose(),this.mat.dispose(),this.renderer.dispose()}}])}]);