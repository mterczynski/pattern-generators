# 1. Build
npm run build;
# 2. Copy build to ../mterczynski.github.io
rm -rf ../mterczynski.github.io/pattern-generators/
cp -r ./dist ../mterczynski.github.io/pattern-generators/
cd ../mterczynski.github.io/pattern-generators/
# 3. Commit in ../mterczynski.github.io
git add .
git commit -m "Update pattern-generators build: $(git log -1 --pretty=format:"%s")"
git diff HEAD~1
git status
# 4. Do manually: push in ../mterczynski.github.io
# git push
