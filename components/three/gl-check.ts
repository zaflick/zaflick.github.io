/** True when WebGL is missing or runs in software (SwiftShader, llvmpipe): the 3D would stall the page there. */
export function softwareGL(): boolean {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl") || c.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return true;
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const name = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return /swiftshader|llvmpipe|softpipe|software/i.test(name);
  } catch {
    return true;
  }
}

let cached: boolean | null = null;
/** No 3D at all: reduced motion, ?still=1, or no hardware WebGL. Checked once per page. */
export function noMotion3D(): boolean {
  if (cached !== null) return cached;
  cached =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
    /[?&]still=1/.test(location.search) ||
    softwareGL();
  return cached;
}
