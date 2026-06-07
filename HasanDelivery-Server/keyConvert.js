const fs = require('fs');
const key = fs.readFileSync('./hasvery--firebase-adminsdk.json', 'utf8')
const base64 = Buffer.from(key).toString('base64')
console.log(base64)

git init
git commit -m "first commit with"
git branch -M main
git remote add origin https://github.com/tanzed2004036/git-practice.git
git push -u origin main
