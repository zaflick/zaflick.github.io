/**
 * Pattern pieces for the stitching scene, traced from the product photos
 * (p-active-legging-front.webp and p-active-tshirt-front.webp, both 1000×1250).
 *
 * Points are in photo pixels. toGU() converts them to "garment units" centred on
 * the photo, so that when the assembled flat-lay is scaled to a card showing that
 * photo, the 3D pieces sit exactly where the real garment is and the cross-fade
 * reads as one object.
 *
 * Each piece outline is a list of edges; each edge is smoothed on its own, so the
 * corners between edges stay sharp (like real cut pieces).
 */

export type P = [number, number];

export type PieceDef = {
  id: string;
  edges: P[][];
  /** Where the piece lies on the fabric before it is cut: offset (photo px, y down) and rotation. */
  marker: { dx: number; dy: number; rot: number };
  /** Drawn slightly in front of the others (pocket, collar). */
  front?: boolean;
};

export type SeamDef = {
  pts: P[];
  /** "seam" = dashed terracotta stitch, "piping" = solid ivory piping like the product. */
  kind: "seam" | "piping";
};

export type GarmentDef = {
  id: "legging" | "tee";
  color: string;
  pieces: PieceDef[];
  seams: SeamDef[];
  /** The fabric panel the pieces are cut from (photo px). */
  panel: { cx: number; cy: number; w: number; h: number };
};

export const PX_PER_GU = 365;
export const toGU = ([x, y]: P): P => [(x - 500) / PX_PER_GU, (625 - y) / PX_PER_GU];

const mirror = (pts: P[]): P[] => pts.map(([x, y]) => [1000 - x, y] as P);
const mirrorEdges = (edges: P[][]): P[][] => edges.map(mirror).reverse().map((e) => e.slice().reverse());

// ---------- Legging (aubergine) ----------
const legLeft: P[][] = [
  [[316, 150], [290, 240], [272, 360], [264, 480], [270, 600], [288, 720], [300, 820], [304, 920], [318, 1050], [332, 1186]],
  [[332, 1186], [420, 1190]],
  [[420, 1190], [414, 1060], [424, 930], [446, 800], [466, 680], [480, 570], [494, 472]],
  [[494, 472], [499, 320], [500, 152]],
  [[500, 152], [316, 150]],
];

export const LEGGING: GarmentDef = {
  id: "legging",
  color: "#4f2536",
  panel: { cx: 500, cy: 640, w: 930, h: 1330 },
  pieces: [
    { id: "leg-l", edges: legLeft, marker: { dx: -165, dy: 30, rot: 0.05 } },
    { id: "leg-r", edges: mirrorEdges(legLeft), marker: { dx: 15, dy: 25, rot: -0.04 } },
    {
      id: "waistband",
      edges: [
        [[318, 44], [500, 38], [682, 44]],
        [[682, 44], [686, 150]],
        [[686, 150], [500, 154], [314, 150]],
        [[314, 150], [318, 44]],
      ],
      marker: { dx: 335, dy: 330, rot: Math.PI / 2 },
    },
    {
      id: "pocket",
      edges: [
        [[652, 292], [716, 300]],
        [[716, 300], [722, 520]],
        [[722, 520], [664, 516]],
        [[664, 516], [652, 292]],
      ],
      marker: { dx: 190, dy: 640, rot: -0.2 },
      front: true,
    },
  ],
  seams: [
    { kind: "seam", pts: [[314, 150], [500, 154], [686, 150]] },
    { kind: "seam", pts: [[500, 156], [499, 320], [494, 470]] },
    { kind: "seam", pts: [[656, 296], [668, 512], [718, 516]] },
    { kind: "piping", pts: [[588, 140], [625, 300], [648, 450], [640, 560], [590, 650], [570, 740], [588, 880], [616, 1030], [640, 1180]] },
    { kind: "seam", pts: [[336, 1172], [418, 1176]] },
    { kind: "seam", pts: [[582, 1176], [664, 1172]] },
  ],
};

// ---------- Tee (olive) ----------
const sleeveLeft: P[][] = [
  [[215, 232], [160, 270], [128, 370], [106, 480], [100, 560]],
  [[100, 560], [170, 585], [236, 600]],
  [[236, 600], [236, 545]],
  [[236, 545], [226, 390], [215, 232]],
];

export const TEE: GarmentDef = {
  id: "tee",
  color: "#4b5140",
  panel: { cx: 510, cy: 660, w: 940, h: 1360 },
  pieces: [
    {
      id: "body",
      edges: [
        [[380, 150], [215, 232]],
        [[215, 232], [226, 390], [236, 545]],
        [[236, 545], [234, 800], [232, 1140]],
        [[232, 1140], [500, 1146], [768, 1140]],
        [[768, 1140], [766, 800], [764, 545]],
        [[764, 545], [774, 390], [785, 232]],
        [[785, 232], [620, 150]],
        [[620, 150], [566, 192], [500, 206], [434, 192], [380, 150]],
      ],
      marker: { dx: -115, dy: 10, rot: 0 },
    },
    { id: "sleeve-l", edges: sleeveLeft, marker: { dx: 630, dy: -60, rot: -0.3 } },
    { id: "sleeve-r", edges: mirrorEdges(sleeveLeft), marker: { dx: -40, dy: 360, rot: 0.25 } },
    {
      id: "collar",
      edges: [
        [[372, 146], [436, 132], [500, 128], [564, 132], [628, 146]],
        [[628, 146], [620, 158]],
        [[620, 158], [566, 200], [500, 216], [434, 200], [380, 158]],
        [[380, 158], [372, 146]],
      ],
      marker: { dx: 285, dy: 960, rot: 0.08 },
      front: true,
    },
  ],
  seams: [
    { kind: "seam", pts: [[380, 158], [434, 200], [500, 216], [566, 200], [620, 158]] },
    { kind: "seam", pts: [[215, 232], [226, 390], [236, 545]] },
    { kind: "seam", pts: [[785, 232], [774, 390], [764, 545]] },
    { kind: "piping", pts: [[258, 440], [290, 560], [312, 690], [310, 820], [292, 960], [270, 1120]] },
    { kind: "piping", pts: [[742, 440], [710, 560], [688, 690], [690, 820], [708, 960], [730, 1120]] },
    { kind: "seam", pts: [[108, 545], [172, 570], [232, 585]] },
    { kind: "seam", pts: [[892, 545], [828, 570], [768, 585]] },
    { kind: "seam", pts: [[240, 1122], [500, 1128], [760, 1122]] },
  ],
};

export const GARMENTS = [LEGGING, TEE];
