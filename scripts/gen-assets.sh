#!/bin/bash
# Asset generator — JAGO SLIDE portfolio (3D render style)
set -u
DIR="/home/z/my-project/public/images"
mkdir -p "$DIR"
cd "$DIR"

gen() {
  local name="$1"; local size="$2"; local prompt="$3"
  if [ -f "$DIR/$name.png" ] && [ $(stat -c%s "$DIR/$name.png") -gt 50000 ]; then
    echo "[SKIP] $name.png exists"
    return 0
  fi
  z-ai image -p "$prompt" -o "$DIR/$name.png" -s "$size" && echo "[OK] $name.png" || echo "[FAIL] $name.png"
}

gen "hero-3d" "1440x720" "Abstract 3D render, floating stack of glossy white presentation slides cards mid-air in dark charcoal black void, vivid orange neon accent glow, floating geometric shapes chrome torus and orange sphere, dramatic rim studio lighting, soft depth of field, octane render, premium minimal composition, lots of dark negative space, ultra high detail" &

gen "work-startup" "1344x768" "3D render mockup of a modern startup pitch deck presentation slides floating in dark studio, bold typography slides with orange and cream color palette, investor deck layout with charts, angled floating cards with depth, dramatic spotlight, premium octane render, high detail" &

gen "work-edu" "1344x768" "3D render of playful educational presentation slides floating in warm cream studio environment, friendly geometric shapes, colorful flat illustration style slides about science, cream and orange and lime green palette, soft shadows, floating layered cards, premium render, high detail" &

gen "work-corporate" "1344x768" "3D render of elegant corporate annual report presentation slides on dark reflective surface, luxury minimal design, deep charcoal slides with gold and cream accents, data charts and big numbers typography, moody studio lighting, floating angled cards, premium octane render, high detail" &

gen "work-launch" "1344x768" "3D render of a bold product launch keynote presentation slides, dark stage atmosphere with spotlight beam, vivid orange gradient slide with huge white typography, sneaker product silhouette, dramatic fog, floating glossy cards, cinematic premium render, high detail" &

gen "work-wedding" "1344x768" "3D render of romantic wedding invitation presentation slides floating in soft beige studio, elegant serif typography cards, blush pink and cream palette, delicate floral 3d elements, soft dreamy lighting, layered floating paper cards, premium render, high detail" &

gen "work-data" "1344x768" "3D render of data visualization presentation slides, floating glassmorphic dashboard cards with 3d bar charts and pie charts made of glossy candy material, dark background, orange lime and cream charts, floating grid of elements, dramatic studio lighting, premium octane render, high detail" &

gen "about-3d" "864x1152" "Abstract 3D sculpture of a chrome spiral staircase made of floating presentation slides, cream white and vivid orange materials, single dark charcoal background, museum gallery lighting, tall portrait composition, octane render, minimal premium, ultra high detail" &

gen "cta-3d" "1024x1024" "Single glossy vivid orange 3d arrow piercing through floating stack of cream white presentation slides, dark charcoal background, dramatic studio lighting, centered composition, octane render, premium minimal, ultra high detail, soft shadows" &

wait
echo "=== DONE ==="
ls -la "$DIR"
