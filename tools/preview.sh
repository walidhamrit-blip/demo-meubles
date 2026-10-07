#!/usr/bin/env bash
# =============================================================================
# tools/preview.sh — relance l'aperçu local du site
# -----------------------------------------------------------------------------
# L'environnement de développement est recréé entre deux sessions : le serveur
# s'arrête et le dossier .git est re-cloné sur la base du dépôt. Ce script fait
# donc les deux gestes d'un coup :
#
#   1. récupère la branche de travail (arena/9be86f87-demo-meubles) et aligne
#      l'arbre sur le dernier commit poussé ;
#   2. sert le site généré sur le port 8080, accessible depuis l'extérieur du
#      sandbox (adresse 0.0.0.0, exigée par l'aperçu).
#
# Usage : bash tools/preview.sh        (Ctrl+C pour arrêter)
# =============================================================================
set -uo pipefail

cd "$(dirname "$0")/.." || exit 1

BRANCHE='arena/9be86f87-demo-meubles'
PORT=8080

if git rev-parse --git-dir >/dev/null 2>&1; then
    if git fetch -q origin "$BRANCHE" 2>/dev/null; then
        git reset -q --mixed FETCH_HEAD || true
        echo "  ✓ branche alignée : $(git rev-parse --short HEAD) — $(git log -1 --format=%s)"
    else
        echo "  ! dépôt distant injoignable — service de l'arbre de travail local"
    fi
fi

echo "  ✓ aperçu servi sur http://localhost:${PORT} (arabe à la racine, anglais sous /en/)"
exec python3 -m http.server "$PORT" --bind 0.0.0.0 --directory "$PWD"
