#!/bin/sh
# Builds the live site and publishes out/ to the gh-pages branch, which GitHub Pages serves.
# Usage: npm run deploy   (from a clean, committed main branch)
set -e
cd "$(dirname "$0")/.."
REMOTE=$(git remote get-url origin)
REV=$(git rev-parse --short HEAD)
NAME=$(git config user.name)
EMAIL=$(git config user.email)

npm run build:live
touch out/.nojekyll   # keeps GitHub from dropping the _next/ folder

cd out
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$NAME" -c user.email="$EMAIL" commit -q -m "Deploy $REV"
git push -q -f "$REMOTE" gh-pages
rm -rf .git
echo "Published $REV to gh-pages."
