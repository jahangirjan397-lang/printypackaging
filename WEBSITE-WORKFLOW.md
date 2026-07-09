# Printy Packaging Website Workflow

## Main Rule

Never test new design directly on live production.

## Environments

- Local development: http://localhost:3000
- Staging / Preview: test link or staging domain
- Production: https://printypackaging.com

## Branch Rules

- main = live production branch
- feature branch = new changes
- staging/preview = testing before live

## Daily Start Commands

```bash
cd C:\Users\AKC\Desktop\pp
git checkout main
git pull origin main
npm run dev