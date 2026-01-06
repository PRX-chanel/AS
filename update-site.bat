@echo off
echo =====================================
echo 🔄 Updating and Deploying Site...
echo =====================================

:: مرحله ۱: افزودن همه تغییرات
git add .

:: مرحله ۲: ایجاد commit با توضیح خودکار
git commit -m "auto update and deploy"

:: مرحله ۳: ارسال به GitHub
git push -u origin main

:: مرحله ۴: ساخت نسخه جدید (build)
npm run build

:: مرحله ۵: انتشار (deploy)
npm run deploy

echo =====================================
echo ✅ Site updated and deployed successfully!
echo 🌐 https://prx-chanel.github.io/AS/
echo =====================================

pause
