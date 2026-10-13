---
order: 6
title: Troubleshooting – masle aur hal
---
Pehle masla dhoondhein, phir us ke neeche diye steps tarteeb se karein.

---

## 1. Publish kiya lekin website par tabdeeli nahi aayi

1. **3-5 minute** intezar karein.
2. **Ctrl + F5** dabayein, ya phone par check karein.
3. **vercel.com** mein login karein, project kholein aur **Deployments** dekhein:
   - Sab se upar wali entry **Building** ho to intezar karein.
   - **Ready** ho to website update ho chuki hai, browser ka cache saaf karein.
   - **Error** ho to agla masla (#2) dekhein.

## 2. Vercel mein "Error" / build failed

Iska matlab hai ke aakhri tabdeeli mein koi ghalti hai. **Live website pichle theek version par chalti rehti hai**, is liye ghabrayein nahi.

1. Vercel mein Error wali entry kholein, **Build Logs** mein laal (red) line dekhein.
2. Aam wajah: kisi blog ya image mein ghalat cheez, jaise image ka link toota ho ya slug mein space ho.
3. **Aasaan hal:** admin mein wahi cheez kholein jo aakhri baar badli thi, ghalti theek karein, aur dobara Publish karein.
4. **Pakka hal (tabdeeli wapas lena):**
   - github.com par apna repo kholein (`jahangirjan397-lang/printypackaging`), phir **Commits**.
   - Sab se upar wala commit (jo "Admin: ..." se shuru ho) kholein.
   - Kaunsi file badli thi, wo dekhein, aur admin mein wahi cheez pehle jaisi kar dein.
5. Phir bhi na bane to Build Log ki laal line copy karein aur **Get help from any AI** guide ka **Prompt 3** use karein.

## 3. Website bilkul nahi khul rahi

1. Doosre phone ya internet par check karein.
2. **downforeveryoneorjustme.com** par `printypackaging.com` daalein.
3. Sab ke liye band ho to:
   - **Vercel**: Deployments mein sab se upar "Ready" hai? Nahi to #2 dekhein.
   - **Hostinger** (domain): login karein aur check karein ke domain expire to nahi hua, auto-renew on ho.
   - Hostinger mein DNS records na badlein, jab tak pata na ho kya kar rahe hain.
4. Domain expire ho gaya ho to foran renew karein. Website khud wapas aa jayegi.

## 4. Quote form ki lead Google Sheet mein nahi aayi

1. Website par apne naam se ek test quote bhejein.
2. "Thank you" page khula? Nahi khula to form mein error message dekhein.
3. Email aayi lekin Sheet mein nahi aayi:
   - Sheet mein **Extensions, phir Apps Script** kholein.
   - Upar **Deploy, phir Manage deployments**: dono deployments ka version sab se naya ho.
   - Vercel mein **Settings, phir Environment Variables**: `GOOGLE_SHEETS_WEBHOOK_URL` aur `GOOGLE_SHEETS_SECRET` maujood hon, aur secret Apps Script ke `SECRET_KEY` se bilkul mile (shuru mein `=` ya space na ho).
4. Environment variable badla ho to Vercel mein **Redeploy** karein.

## 5. Quote ki email nahi aa rahi

1. **Spam / Junk** folder dekhein.
2. Hostinger Mail mein check karein ke mailbox bhar to nahi gaya.
3. Vercel ke Environment Variables mein email wali settings (SMTP) theek hon. Hostinger ka email password badla ho to yahan bhi badlein, phir Redeploy.

## 6. Admin mein login nahi ho raha

1. Admin sirf **https://printypackaging.com/admin** se kholein (www ya vercel.app wale link se nahi).
2. Popup block to nahi? Browser ke address bar mein popup ki ijazat dein.
3. GitHub mein login hain, aur aap ke account ko repo ka access hai?
4. "Admin login is not set up" aaye to **Admin login setup** guide dekhein.

## 7. Galti se blog ya image delete ho gayi

GitHub mein har cheez ka purana version mehfooz hai:
1. github.com, repo, phir **Commits**, aur "Admin: delete ..." wala commit kholein.
2. Wahan purani file ka text ya image mil jayegi. Copy karein aur admin mein dobara bana dein.

## 8. Website slow hai

Aam wajah bari images hoti hain. Nayi images **1 MB se kam** aur WebP rakhein (Images guide).

---

**Sunehri usool:** Vercel mein Error ka matlab website band hona nahi. Live site pichle theek version par chalti rehti hai jab tak aap ghalti theek na kar dein.
