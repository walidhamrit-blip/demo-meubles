#!/usr/bin/env python3
"""
tools/build-brand-assets.py
---------------------------------------------------------------------------
Génère les déclinaisons raster de l'identité Maison Tripoli afin d'éviter
d'expédier des images surdimensionnées :

  assets/img/icon-192.png          192 × 192   (manifeste PWA / Android)
  assets/img/icon-512.png          512 × 512   (manifeste PWA / maskable)
  assets/img/apple-touch-icon.png  180 × 180   (iOS — écran d'accueil)
  assets/img/og-image.jpg         1200 × 630   (partage social Open Graph)

Le monogramme est tracé vectoriellement (aucune police requise pour les
icônes). La carte Open Graph compose la photographie
`og-image-base.jpg` avec la signature typographique de la Maison.

Dépendance : Pillow   →   pip install Pillow
Usage      :   python3 tools/build-brand-assets.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMG_DIR = ROOT / "assets" / "img"

ESPRESSO = (35, 31, 29)
BRONZE = (140, 115, 85)
SAND = (250, 248, 245)
SAND_300 = (217, 203, 187)
SAND_400 = (196, 177, 156)

SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def draw_tracked_text(draw, position, text, font, tracking, fill):
    """Dessine un texte avec interlettrage (approximation du letter-spacing CSS)."""
    x, y = position
    for char in text:
        draw.text((x, y), char, font=font, fill=fill)
        x += draw.textlength(char, font=font) + tracking
    return x


def tracked_width(draw, text, font, tracking):
    return sum(draw.textlength(c, font=font) + tracking for c in text) - tracking


def draw_monogram(size: int) -> Image.Image:
    """Icône carrée : fond espresso, filet bronze, monogramme « M » sablé."""
    scale = 4  # suréchantillonnage pour un anti-aliasing net
    canvas = Image.new("RGBA", (size * scale, size * scale), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    unit = size * scale / 64.0

    draw.rounded_rectangle(
        [(0, 0), (size * scale - 1, size * scale - 1)],
        radius=int(14 * unit),
        fill=ESPRESSO,
    )
    draw.rounded_rectangle(
        [(6.75 * unit, 6.75 * unit), (57.25 * unit, 57.25 * unit)],
        radius=int(9 * unit),
        outline=BRONZE,
        width=max(1, int(1 * unit)),
    )
    draw.line(
        [(18 * unit, 45 * unit), (18 * unit, 21 * unit), (32 * unit, 36 * unit),
         (46 * unit, 21 * unit), (46 * unit, 45 * unit)],
        fill=SAND_400,
        width=max(2, int(3.2 * unit)),
        joint="curve",
    )
    return canvas.resize((size, size), Image.LANCZOS)


def build_icons():
    for name, size in (
        ("apple-touch-icon.png", 180),
        ("icon-192.png", 192),
        ("icon-512.png", 512),
    ):
        icon = draw_monogram(size)
        icon.save(IMG_DIR / name, optimize=True)
        print(f"  ✓ {name} ({size}×{size})")


def build_og_image():
    """Carte de partage social 1200 × 630 au format Open Graph."""
    target = (1200, 630)
    base = IMG_DIR / "og-image-base.jpg"

    if not base.exists():
        # Source photographique non versionnée (voir .gitignore) : la carte
        # déjà générée reste en place, on n'écrase rien par erreur.
        print(f"  – {base.name} absent : og-image.jpg conservée telle quelle.")
        return

    source = Image.open(base).convert("RGB")

    # Recadrage « cover » centré puis redimensionnement exact
    ratio = max(target[0] / source.width, target[1] / source.height)
    resized = source.resize(
        (round(source.width * ratio), round(source.height * ratio)), Image.LANCZOS
    )
    left = (resized.width - target[0]) // 2
    top = int((resized.height - target[1]) * 0.28)  # léger décalage vers le haut
    canvas = resized.crop((left, top, left + target[0], top + target[1]))

    # Voile dégradé (lisibilité du texte sur la photographie) : montée
    # progressive depuis ~35 % de la hauteur pour garantir un contraste
    # suffisant sur la signature, quel que soit le cliché de fond.
    gradient = Image.new("RGBA", target, (0, 0, 0, 0))
    gradient_draw = ImageDraw.Draw(gradient)
    for y in range(target[1]):
        progress = max(0.0, (y - target[1] * 0.32) / (target[1] * 0.68))
        alpha = int(246 * min(1.0, progress) ** 1.15)
        gradient_draw.line([(0, y), (target[0], y)], fill=ESPRESSO + (alpha,))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), gradient).convert("RGB")

    draw = ImageDraw.Draw(canvas)
    margin = 72

    # Bandeau de localisation
    label_font = load_font(SANS, 17)
    draw_tracked_text(
        draw, (margin, 452), "ATELIER & SHOWROOM — TRIPOLI, LIBAN",
        label_font, 3.2, SAND_400,
    )

    # Signature de la Maison
    title_font = load_font(SERIF, 54)
    draw_tracked_text(draw, (margin, 480), "MAISON TRIPOLI", title_font, 9.0, SAND)

    # Filet bronze
    draw.rectangle([(margin, 560), (margin + 96, 562)], fill=BRONZE)

    # Accroche
    tagline_font = load_font(SERIF, 24)
    tagline = "Mobilier d’art & haute ébénisterie depuis 1948"
    draw_tracked_text(draw, (margin, 576), tagline, tagline_font, 0.8, SAND_300)

    # Adresse du site, aligné à droite
    url_font = load_font(SANS, 19)
    url = "maisontripoli.com"
    draw_tracked_text(
        draw,
        (target[0] - margin - tracked_width(draw, url, url_font, 2.4), 582),
        url, url_font, 2.4, SAND_400,
    )

    canvas.save(IMG_DIR / "og-image.jpg", quality=86, optimize=True, progressive=True)
    print("  ✓ og-image.jpg (1200×630)")


def build_placeholder():
    """Visuel d'attente de la fiche produit (évite un src vide)."""
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1250" width="1000" height="1250"
     role="img" aria-label="Sélectionnez une pièce pour afficher sa fiche détaillée">
  <rect width="1000" height="1250" fill="#E8DFD5"/>
  <rect x="40" y="40" width="920" height="1170" fill="none" stroke="#D9CBBB" stroke-width="2"/>
  <path d="M400 700V500l100 108 100-108v200" fill="none" stroke="#8C7355" stroke-width="14"
        stroke-linecap="square" stroke-linejoin="miter" opacity="0.55"/>
  <path d="M400 760h200" stroke="#C4B19C" stroke-width="6"/>
</svg>
"""
    (IMG_DIR / "placeholder-fiche-produit.svg").write_text(svg, encoding="utf-8")
    print("  ✓ placeholder-fiche-produit.svg")


if __name__ == "__main__":
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    print("Génération des ressources de marque Maison Tripoli…")
    build_icons()
    build_og_image()
    build_placeholder()
    print("Terminé.")
