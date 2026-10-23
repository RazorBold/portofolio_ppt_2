#!/bin/bash
# Generator mockup karya PPT tambahan (batch 2) — sequential + retry
set -u
DIR="/home/z/my-project/public/images"
cd /home/z/my-project

gen() {
  local name="$1"; local size="$2"; local prompt="$3"
  if [ -f "$DIR/$name.png" ] && [ $(stat -c%s "$DIR/$name.png") -gt 50000 ]; then
    echo "[SKIP] $name"
    return 0
  fi
  for attempt in 1 2 3; do
    bun run scripts/gen-one.mjs "$prompt" "$DIR/$name.png" "$size" && { echo "[OK] $name"; return 0; }
    echo "[RETRY $attempt] $name"; sleep 2
  done
  echo "[FAIL] $name"
}

gen "work-fnb" "1344x768" "3D render mockup of restaurant brand pitch deck slides floating in dark moody studio, warm orange and charcoal palette, appetizing food photography cards with noodle dishes and coffee cups, bold typography cards, layered floating presentation slides, dramatic spotlight, premium octane render, high detail, no logos" &

wait
gen "work-property" "1344x768" "3D render mockup of elegant real estate presentation deck, beige cream and gold palette, minimalist architectural building render cards, modern villa and apartment tower visuals, luxury typography, floating paper slides on soft beige studio background, soft shadows, premium octane render, high detail, no logos" &
wait
gen "work-fintech" "1344x768" "3D render mockup of fintech app pitch deck slides floating in dark studio, black slides with acid lime green accents, floating smartphone mockup with payment app interface, chart cards with growth numbers, glossy coins floating around, dramatic rim lighting, premium octane render, high detail, no logos" &
wait
gen "work-fashion" "864x1152" "3D render of fashion lookbook presentation slides, editorial magazine style, black and white photography cards with elegant model silhouettes, vivid orange accent typography cards, tall portrait composition of floating layered papers in cream studio, soft dramatic shadows, premium octane render, high detail, no logos" &
wait
gen "work-health" "1344x768" "3D render mockup of healthcare clinic presentation deck, clean cream and sage green palette, friendly rounded shapes, medical icon cards, floating stethoscope 3d element, bright airy studio background, layered floating slides, soft lighting, premium octane render, high detail, no logos" &
wait
gen "work-travel" "1344x768" "3D render mockup of travel agency presentation deck, warm sunset orange and sand tones, mountain and tropical beach photography cards, small airplane silhouette 3d element, floating layered paper slides in warm studio light, dust particles, premium octane render, high detail, no logos" &
wait
gen "work-ngo" "1344x768" "3D render mockup of environmental campaign presentation deck, deep forest green and cream palette, tree planting photography cards, paper leaf 3d elements floating in air, hopeful warm lighting, layered floating slides, premium octane render, high detail, no logos" &
wait
gen "work-saas" "864x1152" "3D render mockup of SaaS product sales deck, dark charcoal slides with vivid orange dashboard interface cards, floating analytics widgets and bar charts made of glossy candy material, tall portrait composition, floating cards in dark studio, rim lighting, premium octane render, high detail, no logos" &
wait
echo "=== DONE ==="
ls "$DIR"
