# FPL Scout — Announcement Video

فيديو إعلان عمودي مدته 36 ثانية (1080×1920) مبني بـ Remotion وReact.

## التشغيل

```bash
npm install
npm start
```

يفتح Remotion Studio لمعاينة الفيديو.

## إخراج الفيديو

```bash
npm run build
```

ينشئ `out/fpl-scout-ad.mp4`.

## التخصيص

- المشاهد ومددها موجودة في `Video.tsx`، بمعدل 30 إطارًا في الثانية.
- أبعاد الفيديو ومعدل الإطارات موجودة في `Root.tsx`. يجب أن تطابق مدة التكوين مجموع مدد المشاهد.
- يمكن إضافة Outfit وInter إلى `public/fonts/` وتفعيل قواعد `@font-face` في `style.css`.
- يمكن إضافة التعليق الصوتي والمؤثرات في `public/audio/` واستخدام مكوّن `Audio` من Remotion.
