# Open Graph image

`static/og.png` (1200×630) is the social-share card referenced by
`src/lib/components/Seo.svelte`. To regenerate it after changing the template:

```sh
google-chrome --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=2 --virtual-time-budget=15000 \
  --window-size=1200,630 --screenshot=/tmp/og@2x.png \
  "file://$PWD/tools/og/template.html"

ffmpeg -y -i /tmp/og@2x.png -vf "scale=1200:630:flags=lanczos" static/og.png
```

Rendering at 2× and downsampling keeps the serif headline crisp.
The template pulls Instrument Serif and JetBrains Mono from Google Fonts, so it
needs network access at render time.
