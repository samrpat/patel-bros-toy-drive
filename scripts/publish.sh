#!/bin/sh
# Builds the site and publishes it to the gh-pages branch, which GitHub Pages serves.
# Usage: npm run publish
set -e
cd "$(dirname "$0")/.."
npm run build
REMOTE=$(git remote get-url origin)
TMP=$(mktemp -d)
git clone --quiet --branch gh-pages --single-branch "$REMOTE" "$TMP"
# Replace the published files with the fresh build (keeps the branch history).
find "$TMP" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -r {} +
cp -R dist/. "$TMP/"
cd "$TMP"
git add -A
if git diff --cached --quiet; then echo "Nothing changed; site is already up to date."; exit 0; fi
git commit --quiet -m "Publish site $(date +%Y-%m-%d)"
git push --quiet origin gh-pages
echo "Published. The live site updates in a few minutes."
