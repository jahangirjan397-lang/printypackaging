---
order: 9
title: Admin login setup (ek dafa ka kaam)
---
Admin panel mein **GitHub se login** hota hai. Iske liye ek dafa GitHub mein ek "OAuth App" banana hai aur us ki 2 keys Vercel mein daalni hain. Takreeban 10 minute ka kaam hai.

## Step 1 – GitHub OAuth App banayein

1. github.com par login karein (wahi account jo repo ka owner hai).
2. Ye link kholein: **github.com/settings/developers**, phir **OAuth Apps**, phir **New OAuth App**.
3. Ye bharein:

| Khana | Kya likhein |
|---|---|
| Application name | `Printy Packaging Admin` |
| Homepage URL | `https://printypackaging.com` |
| Authorization callback URL | `https://printypackaging.com/api/decap/callback` |

4. **Register application** dabayein.
5. Agle page par **Client ID** nazar aayega. Copy kar lein.
6. **Generate a new client secret** dabayein aur secret copy kar lein. **Ye sirf ek dafa dikhta hai.** Kisi ko na dein, WhatsApp ya email par na bhejein.

## Step 2 – Keys Vercel mein daalein

1. vercel.com, phir apna project, phir **Settings**, phir **Environment Variables**.
2. Do variables add karein (Environment: **Production**, Preview aur Development teeno):

| Name | Value |
|---|---|
| `DECAP_GITHUB_CLIENT_ID` | Client ID |
| `DECAP_GITHUB_CLIENT_SECRET` | Client secret |

3. **Save**, phir **Deployments**, phir sab se upar wali entry par **⋯**, phir **Redeploy**.

## Step 3 – Test

1. **https://printypackaging.com/admin** kholein.
2. **Login with GitHub**, phir GitHub par **Authorize** dabayein.
3. Admin panel khul jayega.

## Kisi aur ko admin access dena

Admin wahi chala sakta hai jisko GitHub repo ka access ho. Kisi ko dena ho to **Ownership & security** guide dekhein (GitHub, phir Collaborators). Hatana ho to GitHub se Remove karein, admin bhi foran band ho jayega.

## Secret chori hone ka shak ho

GitHub mein OAuth App kholein, purana secret **Delete** karein, naya banayein, Vercel mein update karein, phir Redeploy.
