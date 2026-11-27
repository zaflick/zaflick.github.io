"""
Makes smaller copies of the large photos so phones don't download desktop-sized images.

For every public/assets/img/*.webp 1000 px wide or more it writes <name>-800.webp, and for
anything 1400 px or wider also <name>-1200.webp. Names listed in SMALL also get <name>-400.webp. It records the original widths in
lib/content/img-widths.json, which the Img component uses to build srcSet.

Run again after adding or replacing photos:  python3 scripts/make-image-variants.py
"""
import json
import pathlib
import re

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG = ROOT / "public" / "assets" / "img"
OUT = ROOT / "lib" / "content" / "img-widths.json"
STEPS = [(1000, 800), (1400, 1200)]  # (only if original is wider than, variant width)
# Photos that are only ever shown small (the founders' pair is ~170-290 px wide) also get a 400 px copy.
SMALL = ("founders-",)

widths = {}
for path in sorted(IMG.glob("*.webp")):
    if re.search(r"-(400|800|1200)\.webp$", path.name):
        continue
    with Image.open(path) as im:
        w, h = im.size
        made = []
        steps = ([(600, 400)] if path.stem.startswith(SMALL) else []) + STEPS
        for over, target in steps:
            if w >= over:
                dst = path.with_name(f"{path.stem}-{target}.webp")
                im.resize((target, round(h * target / w)), Image.LANCZOS).save(dst, "WEBP", quality=78, method=6)
                made.append(target)
        if made:
            widths[path.stem] = {"w": w, "variants": made}

OUT.write_text(json.dumps(widths, indent=2) + "\n")
print(f"{len(widths)} images got smaller copies; widths written to {OUT.relative_to(ROOT)}")
