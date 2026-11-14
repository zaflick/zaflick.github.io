import * as THREE from "three";
import { story, CUT } from "@/lib/story";
import { range, ease, easeOut, lerp } from "@/lib/scroll";
import { GARMENTS, toGU, PX_PER_GU, type GarmentDef, type P } from "./patterns";

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

// 2D simplex noise (Ashima Arts / Stefan Gustavson, MIT).
const SIMPLEX = /* glsl */ `
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
}`;

const clothVert = /* glsl */ `
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
${SIMPLEX}
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
}`;

const clothFrag = /* glsl */ `
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
}`;

const threadVert = /* glsl */ `
varying vec2 vUv;
varying vec3 vN;
void main(){
  vUv = uv;
  vN = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const threadFrag = /* glsl */ `
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
}`;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

const COLORS = {
  aubergine: "#4f2536",
  olive: "#4b5140",
  terracotta: "#c96b4a",
  ivory: "#efe6d6",
};

const DENSITY = 24; // knit stitches per world unit (fine jersey; reads as texture only up close)

function clothMaterial(color: string) {
  return new THREE.ShaderMaterial({
    vertexShader: clothVert,
    fragmentShader: clothFrag,
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: new THREE.Vector2(1, 1) },
      uAmp: { value: 1 },
      uKnitMul: { value: 1 },
      uDensity: { value: DENSITY },
      uKnitOffset: { value: new THREE.Vector2() },
      uKnitRot: { value: 0 },
      uColor: { value: rgb(color) },
      uColor2: { value: rgb(color) },
      uSplit: { value: 0 },
      uSplitDir: { value: new THREE.Vector2(1, 0) },
      uOpacity: { value: 1 },
      uKnitAmt: { value: 1 },
      uLight: { value: 1 },
    },
  });
}

function threadMaterial(color: string, dashes: number) {
  return new THREE.ShaderMaterial({
    vertexShader: threadVert,
    fragmentShader: threadFrag,
    transparent: true,
    uniforms: {
      uColor: { value: rgb(color) },
      uProgress: { value: 0 },
      uDashes: { value: dashes },
      uOpacity: { value: 1 },
    },
  });
}

/** Smooth each edge on its own and join them, so corners between edges stay sharp. */
function outlinePoints(edges: P[][]): THREE.Vector2[] {
  const out: THREE.Vector2[] = [];
  edges.forEach((edge) => {
    const pts = edge.map((p) => {
      const [x, y] = toGU(p);
      return new THREE.Vector3(x, y, 0);
    });
    let seg: THREE.Vector3[];
    if (pts.length > 2) {
      const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal");
      seg = curve.getPoints(pts.length * 6);
    } else {
      seg = pts;
    }
    seg.forEach((v, i) => {
      if (out.length && i === 0) return; // shared corner with previous edge
      out.push(new THREE.Vector2(v.x, v.y));
    });
  });
  // Last point repeats the first one.
  if (out.length > 1 && out[0].distanceTo(out[out.length - 1]) < 1e-4) out.pop();
  return out;
}

/* ------------------------------------------------------------------ */
/* Rigs                                                                */
/* ------------------------------------------------------------------ */

type PieceRig = {
  group: THREE.Group;
  mesh: THREE.Mesh;
  mat: THREE.ShaderMaterial;
  shadowMat: THREE.MeshBasicMaterial;
  shadow: THREE.Mesh;
  outlineMat: THREE.ShaderMaterial;
  c: THREE.Vector2; // centroid, GU
  marker: THREE.Vector2; // offset, GU
  markerRot: number;
  front: boolean;
  delay: number;
};

type SeamRig = {
  mat: THREE.ShaderMaterial;
  curve: THREE.CatmullRomCurve3;
  a: number;
  b: number;
};

type GarmentRig = {
  def: GarmentDef;
  group: THREE.Group;
  pieces: PieceRig[];
  seams: SeamRig[];
  needle: THREE.Group;
  panelC: THREE.Vector2; // GU
  panelS: THREE.Vector2; // GU
};

function buildGarment(def: GarmentDef): GarmentRig {
  const group = new THREE.Group();
  const panelC = new THREE.Vector2(...toGU([def.panel.cx, def.panel.cy]));
  const panelS = new THREE.Vector2(def.panel.w / PX_PER_GU, def.panel.h / PX_PER_GU);

  const pieces: PieceRig[] = def.pieces.map((pd, i) => {
    const pts = outlinePoints(pd.edges);
    const box = new THREE.Box2().setFromPoints(pts);
    const c = box.getCenter(new THREE.Vector2());
    const local = pts.map((p) => p.clone().sub(c));
    const shape = new THREE.Shape(local);
    const geo = new THREE.ShapeGeometry(shape, 1);

    const mat = clothMaterial(def.color);
    mat.uniforms.uAmp.value = 0;
    // Keep the knit where it was on the uncut fabric (texture travels with the piece).
    const marker = new THREE.Vector2(pd.marker.dx / PX_PER_GU, -pd.marker.dy / PX_PER_GU);
    mat.uniforms.uKnitOffset.value.copy(c.clone().add(marker).sub(panelC));
    mat.uniforms.uKnitRot.value = pd.marker.rot;
    const mesh = new THREE.Mesh(geo, mat);
    mesh.renderOrder = pd.front ? 6 : 5;

    const shadowMat = new THREE.MeshBasicMaterial({ color: 0x2a1a12, transparent: true, opacity: 0, depthWrite: false });
    const shadow = new THREE.Mesh(geo, shadowMat);
    shadow.renderOrder = 4;

    const ring = local.map((p) => new THREE.Vector3(p.x, p.y, 0.004));
    const oc = new THREE.CatmullRomCurve3(ring, true, "catmullrom", 0);
    const olen = oc.getLength();
    const outlineMat = threadMaterial(COLORS.terracotta, olen * 26);
    const outline = new THREE.Mesh(new THREE.TubeGeometry(oc, Math.max(64, ring.length * 2), 0.007, 4, true), outlineMat);
    outline.renderOrder = 7;

    const g = new THREE.Group();
    g.add(shadow, mesh, outline);
    group.add(g);
    return {
      group: g,
      mesh,
      mat,
      shadowMat,
      shadow,
      outlineMat,
      c,
      marker,
      markerRot: pd.marker.rot,
      front: !!pd.front,
      delay: i / def.pieces.length,
    };
  });

  // Seams, in stitching order; each one's share of the stitch time matches its length.
  const curves = def.seams.map((s) => {
    const pts = s.pts.map((p) => {
      const [x, y] = toGU(p);
      return new THREE.Vector3(x, y, 0.03);
    });
    return new THREE.CatmullRomCurve3(pts, false, "centripetal");
  });
  const lens = curves.map((c) => c.getLength());
  const total = lens.reduce((a, b) => a + b, 0);
  let acc = 0;
  const seams: SeamRig[] = def.seams.map((s, i) => {
    const piping = s.kind === "piping";
    const mat = threadMaterial(piping ? COLORS.ivory : COLORS.terracotta, piping ? 0 : lens[i] * 30);
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curves[i], 96, piping ? 0.012 : 0.008, 5, false), mat);
    mesh.renderOrder = 8;
    group.add(mesh);
    const a = acc / total;
    acc += lens[i];
    return { mat, curve: curves[i], a, b: acc / total };
  });

  // Needle: a slim steel shaft with a sharp tip, plus a short tail of thread.
  const needle = new THREE.Group();
  const steel = new THREE.MeshBasicMaterial({ color: 0xbdb8b0 });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.26, 8), steel);
  shaft.rotation.z = Math.PI / 2;
  shaft.position.x = -0.13;
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.011, 0.07, 8), steel);
  tip.rotation.z = -Math.PI / 2;
  tip.position.x = 0.035;
  needle.add(shaft, tip);
  needle.renderOrder = 9;
  needle.visible = false;
  group.add(needle);

  return { def, group, pieces, seams, needle, panelC, panelS };
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

type Mode = "none" | "hero" | "cut" | "split";

export class StoryScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  private sheets: { mesh: THREE.Mesh; mat: THREE.ShaderMaterial }[];
  private garments: GarmentRig[] = [];
  private canvas: HTMLCanvasElement;
  private w = 0;
  private h = 0;
  private cardRects: { x: number; y: number; w: number; h: number }[] = [];
  private lastMode: Mode = "none";
  private firstFrame = true;
  private readonly CZ = 8;
  private tmpV = new THREE.Vector3();
  private look = new THREE.Vector3();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setClearColor(0x000000, 0);
    // Shaders write sRGB values directly.
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

    const mobile = window.innerWidth < 768;
    const seg = mobile ? 110 : 170;
    this.sheets = [COLORS.aubergine, COLORS.olive].map((c, i) => {
      const mat = clothMaterial(c);
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, seg, seg), mat);
      mesh.renderOrder = i === 0 ? 2 : 1;
      this.scene.add(mesh);
      return { mesh, mat };
    });

    this.resize();
    // The cut & stitch pieces aren't needed for a few screens: build them when the
    // browser is idle so starting the 3D stays light.
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    const build = () => this.buildGarments();
    if (idle) idle(build, { timeout: 2000 });
    else window.setTimeout(build, 300);
  }

  private buildGarments() {
    if (this.garments.length) return;
    this.garments = GARMENTS.map(buildGarment);
    this.garments.forEach((g) => this.scene.add(g.group));
    this.measureCards();
  }

  resize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (!w || !h) return;
    this.w = w;
    this.h = h;
    const dprCap = w < 768 ? 1.35 : 1.6;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.measureCards();
  }

  /** Card positions inside the pinned (sticky) stage, i.e. where they sit while pinned. */
  measureCards() {
    this.cardRects = story.cards.map((el) => {
      if (!el) return { x: 0, y: 0, w: 0, h: 0 };
      const stage = el.closest("[data-stage]") as HTMLElement | null;
      const r = el.getBoundingClientRect();
      const s = stage ? stage.getBoundingClientRect() : { left: 0, top: 0 };
      return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2, w: r.width, h: r.height };
    });
  }

  private visH(z = this.CZ) {
    return 2 * z * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
  }

  private mode(): Mode {
    if (story.cut.active) return "cut";
    if (story.split.active) return "split";
    if (story.hero.active) return "hero";
    return "none";
  }

  render(tMs: number) {
    const mode = this.mode();
    if (mode === "none") {
      if (this.lastMode !== "none") this.canvas.style.visibility = "hidden";
      this.lastMode = mode;
      return;
    }
    if (this.lastMode === "none") this.canvas.style.visibility = "visible";
    if (mode === "cut" && !this.garments.length) this.buildGarments();
    if (mode === "cut" && this.lastMode !== "cut") this.measureCards();
    this.lastMode = mode;

    const t = tMs / 1000;
    this.sheets.forEach((s) => (s.mat.uniforms.uTime.value = t));

    if (mode === "hero") this.layoutHero(story.hero.p);
    else if (mode === "cut") this.layoutCut(story.cut.p);
    else this.layoutSplit(story.split.p);

    this.renderer.render(this.scene, this.camera);
    if (this.firstFrame) {
      this.firstFrame = false;
      story.glReady = true;
      document.documentElement.classList.add("gl-ready");
    }
  }

  /* ---------------- hero: a field of fabric, then a macro of the knit ---------------- */
  private layoutHero(p: number) {
    this.garments.forEach((g) => (g.group.visible = false));
    const [a, b] = this.sheets;
    const aspect = this.w / this.h;
    const push = ease(range(p, 0.08, 0.9));

    a.mesh.visible = true;
    b.mesh.visible = false;
    a.mat.uniforms.uSplit.value = 0;
    a.mesh.position.set(0, -1.6, 0);
    a.mesh.rotation.set(-1.08, 0, 0.12);
    a.mat.uniforms.uSize.value.set(Math.max(30, 22 * aspect), 30);
    a.mat.uniforms.uAmp.value = lerp(1.0, 0.45, push);
    a.mat.uniforms.uOpacity.value = 1;
    a.mat.uniforms.uKnitAmt.value = 1;
    a.mat.uniforms.uLight.value = 1;
    a.mat.uniforms.uKnitOffset.value.set(0, 0);
    a.mat.uniforms.uKnitRot.value = 0;

    b.mesh.position.set(4.5, 0.6, -9);
    b.mesh.rotation.set(-1.08, 0, -0.2);
    b.mat.uniforms.uSize.value.set(16, 9);
    b.mat.uniforms.uAmp.value = 1.15;
    b.mat.uniforms.uOpacity.value = 1;
    b.mat.uniforms.uKnitAmt.value = 1;
    b.mat.uniforms.uLight.value = 1;

    // Camera: wide view → close over the knit.
    const narrow = aspect < 0.8;
    const start = this.tmpV.set(0, narrow ? 1.6 : 1.1, narrow ? 11 : 8.5);
    const end = new THREE.Vector3(0.35, -0.55, 0.62);
    this.camera.position.lerpVectors(start, end, push);
    this.look.set(0, -1.5, -2.2).lerp(new THREE.Vector3(0.38, -1.7, -0.45), push);
    this.camera.lookAt(this.look);
  }

  /* ---------------- cut → stitch → photo ---------------- */
  private layoutCut(p: number) {
    this.camera.position.set(0, 0, this.CZ);
    this.camera.lookAt(0, 0, 0);
    const vh = this.visH();
    const vw = vh * (this.w / this.h);
    const k = vh / this.h; // world units per CSS px

    const flat = ease(range(p, ...CUT.flatten));
    const outline = range(p, ...CUT.outline);
    const lift = easeOut(range(p, ...CUT.lift));
    const glide = ease(range(p, ...CUT.glide));
    const stitch = range(p, ...CUT.stitch);
    const hide3D = p > CUT.photo[1] + 0.01;

    this.garments.forEach((g, gi) => {
      const r = this.cardRects[gi] || { x: 0, y: 0, w: 0, h: 0 };
      const s = r.h * k * (PX_PER_GU / 1250); // world units per GU
      const cx = (r.x - this.w / 2) * k;
      const cy = -(r.y - this.h / 2) * k;
      g.group.position.set(cx, cy, 0);
      g.group.scale.setScalar(s || 0.001);
      g.group.visible = !hide3D && flat > 0.98;

      // Sheet: from a hanging drape to a flat panel exactly behind this garment.
      const sheet = this.sheets[gi];
      sheet.mesh.visible = !hide3D && lift < 1;
      const panelW = g.panelS.x * s;
      const panelH = g.panelS.y * s;
      const px = cx + g.panelC.x * s;
      const py = cy + g.panelC.y * s;
      const side = gi === 0 ? -1 : 1;
      const dx = side * vw * 0.27;
      sheet.mesh.position.set(lerp(dx, px, flat), lerp(0.2, py, flat), lerp(-0.6, 0, flat));
      sheet.mesh.rotation.set(lerp(-0.42, 0, flat), lerp(side * 0.18, 0, flat), lerp(side * -0.06, 0, flat));
      sheet.mat.uniforms.uSize.value.set(lerp(vw * 0.62, panelW, flat), lerp(vh * 1.35, panelH, flat));
      sheet.mat.uniforms.uAmp.value = lerp(0.55, 0, flat);
      sheet.mat.uniforms.uOpacity.value = 1 - lift;
      sheet.mat.uniforms.uKnitAmt.value = 1;
      sheet.mat.uniforms.uLight.value = 1;
      sheet.mat.uniforms.uKnitOffset.value.set(0, 0);
      sheet.mat.uniforms.uKnitRot.value = 0;
      sheet.mat.depthWrite = lift === 0;
      sheet.mat.uniforms.uKnitMul.value = 1;
      sheet.mat.uniforms.uSplit.value = 0;

      // Pieces: cut lines are drawn on the fabric, the pieces lift off, then glide together.
      g.pieces.forEach((pc) => {
        const o = range(outline, pc.delay * 0.5, pc.delay * 0.5 + 0.5);
        pc.outlineMat.uniforms.uProgress.value = o;
        pc.outlineMat.uniforms.uOpacity.value = 1 - range(glide, 0.2, 0.7);
        pc.mesh.visible = lift > 0;
        pc.mat.uniforms.uKnitMul.value = s;
        pc.mat.uniforms.uLight.value = 1;
        const settle = range(glide, 0.75, 1);
        const z = 0.01 + lift * 0.12 * (1 - settle) + (pc.front ? 0.006 : 0);
        pc.group.position.set(pc.c.x + pc.marker.x * (1 - glide), pc.c.y + pc.marker.y * (1 - glide), z);
        pc.group.rotation.z = pc.markerRot * (1 - glide);
        pc.shadowMat.opacity = 0.22 * lift * (1 - settle * 0.85);
        pc.shadow.position.set(0.035 * (1 - settle), -0.05 * (1 - settle), -0.008);
      });

      // Stitching, with the needle riding the seam being sewn.
      let needleSet = false;
      g.seams.forEach((sm) => {
        const sp = range(stitch, sm.a, sm.b);
        sm.mat.uniforms.uProgress.value = sp;
        if (!needleSet && sp > 0 && sp < 1) {
          needleSet = true;
          const pt = sm.curve.getPointAt(sp);
          const tan = sm.curve.getTangentAt(sp);
          g.needle.position.set(pt.x, pt.y, 0.06);
          g.needle.rotation.set(0, -0.35, Math.atan2(tan.y, tan.x));
        }
      });
      g.needle.visible = needleSet;
    });
  }

  /* ---------------- her | him: two fabrics side by side ---------------- */
  private layoutSplit(p: number) {
    this.garments.forEach((g) => (g.group.visible = false));
    this.camera.position.set(0, 0, this.CZ);
    this.camera.lookAt(0, 0, 0);
    const vh = this.visH();
    const vw = vh * (this.w / this.h);
    const narrow = this.w / this.h < 0.8;
    const [a, b] = this.sheets;
    b.mesh.visible = false;
    a.mesh.visible = true;
    // One cloth, aubergine | olive. The colour line sits on x = 0 (or y = 0 on phones),
    // which projects onto the column divider whatever the waves do.
    a.mesh.position.set(0, (p - 0.5) * 0.6, 0);
    a.mesh.rotation.set(narrow ? -0.18 : -0.3, 0, 0);
    a.mat.uniforms.uSize.value.set(vw * 1.7, vh * 1.9);
    a.mat.uniforms.uColor2.value.copy(b.mat.uniforms.uColor.value);
    a.mat.uniforms.uSplit.value = 1;
    a.mat.uniforms.uSplitDir.value.set(narrow ? 0 : 1, narrow ? -1 : 0);
    a.mat.uniforms.uAmp.value = 0.7;
    a.mat.uniforms.uOpacity.value = 1;
    a.mat.uniforms.uKnitAmt.value = 1;
    a.mat.uniforms.uLight.value = 0.95;
    a.mat.uniforms.uKnitOffset.value.set(0, 0);
    a.mat.uniforms.uKnitRot.value = 0;
    a.mat.uniforms.uKnitMul.value = 1;
    a.mat.depthWrite = true;
  }

  dispose() {
    this.renderer.dispose();
  }
}
