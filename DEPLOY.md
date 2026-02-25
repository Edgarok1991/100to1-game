# 🚀 Деплой приложения "100 к 1"

## Быстрый деплой на Vercel (Рекомендуется)

### Вариант 1: Через веб-интерфейс Vercel (самый простой)

1. **Зарегистрируйтесь на Vercel:**
   - Перейдите на https://vercel.com
   - Войдите через GitHub (или создайте аккаунт)

2. **Загрузите проект на GitHub:**
   ```bash
   # Инициализируйте git (если еще не сделали)
   git init
   git add .
   git commit -m "Initial commit: 100 к 1 игра"
   
   # Создайте репозиторий на GitHub и подключите его
   git remote add origin https://github.com/ваш-username/100to1.git
   git branch -M main
   git push -u origin main
   ```

3. **Импортируйте проект в Vercel:**
   - Нажмите "Add New..." → "Project"
   - Выберите ваш GitHub репозиторий
   - Vercel автоматически определит настройки
   - Нажмите "Deploy"

4. **Готово!** 🎉
   - Через 1-2 минуты получите ссылку вида: `https://100to1-xxx.vercel.app`

### Вариант 2: Через Vercel CLI

1. **Установите Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Войдите в аккаунт:**
   ```bash
   vercel login
   ```

3. **Задеплойте проект:**
   ```bash
   vercel --prod
   ```

4. **Следуйте инструкциям** в терминале

---

## Альтернатива: Netlify

1. **Создайте production build:**
   ```bash
   npm run build
   ```

2. **Перейдите на https://app.netlify.com**

3. **Drag & Drop:**
   - Перетащите папку `dist` в Netlify Drop

4. **Готово!** Получите ссылку вида `https://xxx.netlify.app`

### Через Netlify CLI:

```bash
# Установите CLI
npm install -g netlify-cli

# Войдите
netlify login

# Задеплойте
netlify deploy --prod --dir=dist
```

---

## Альтернатива: GitHub Pages

1. **Установите gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Добавьте в package.json:**
   ```json
   {
     "homepage": "https://ваш-username.github.io/100to1",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Обновите vite.config.js:**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/100to1/',
     // ...
   })
   ```

4. **Задеплойте:**
   ```bash
   npm run deploy
   ```

---

## Проверка перед деплоем

**Локальный тест production build:**
```bash
# Создайте build
npm run build

# Запустите превью
npm run preview
```

Откройте http://localhost:4173 и проверьте работу приложения.

---

## Настройки проекта

### ✅ Уже настроено:
- `vercel.json` - конфигурация для Vercel
- `vite.config.js` - настройки сборки
- `.gitignore` - исключения для git
- Production-ready код

### 🔧 Возможные проблемы:

**Проблема:** Белый экран после деплоя  
**Решение:** Проверьте `base` в `vite.config.js`

**Проблема:** 404 при переходе по страницам  
**Решение:** Убедитесь, что есть `vercel.json` с правилом rewrite

**Проблема:** Ошибки сборки  
**Решение:** Запустите `npm run build` локально и проверьте ошибки

---

## 🎯 Рекомендации

1. **Используйте Vercel** - автоматический деплой при каждом push в GitHub
2. **Добавьте свой домен** (опционально) - можно подключить в настройках Vercel
3. **Включите HTTPS** - автоматически включено на Vercel/Netlify
4. **Следите за аналитикой** - Vercel предоставляет статистику посещений

---

## 📱 После деплоя

Ваше приложение будет доступно по адресу:
- Vercel: `https://ваш-проект.vercel.app`
- Netlify: `https://ваш-проект.netlify.app`
- GitHub Pages: `https://username.github.io/100to1`

**Поделитесь ссылкой** и начинайте играть! 🎮🎉

---

## 🔄 Обновление приложения

### Vercel (с GitHub):
```bash
git add .
git commit -m "Обновление игры"
git push
# Vercel автоматически задеплоит изменения
```

### Vercel CLI:
```bash
vercel --prod
```

### Netlify:
```bash
npm run build
netlify deploy --prod --dir=dist
```

Удачного деплоя! 🚀
