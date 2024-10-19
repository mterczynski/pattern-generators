# 1. Build
npm run build;
# 2. Copy build to ../mterczynski.github.io
rm -rf ../mterczynski.github.io/pattern-generators/
cp -r ./dist ../mterczynski.github.io/pattern-generators/
cd ../mterczynski.github.io/pattern-generators/
# 3. Commit in ../mterczynski.github.io
git add .
git commit -m "Update pattern-generators build: $(git log -1 --pretty=format:"%s")"
git status
# 4. Push in ../mterczynski.github.io
git push
