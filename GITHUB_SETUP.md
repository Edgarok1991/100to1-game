# 🚀 Загрузка на GitHub

## Быстрая инструкция

### 1. Создайте репозиторий на GitHub
- Перейдите: https://github.com/new
- Название: `100to1-game`
- Описание: `Игра "100 к 1" - интерактивное приложение`
- НЕ добавляйте README, .gitignore, license (они уже есть!)

### 2. Выполните команды (замените YOUR_USERNAME на ваш GitHub username):

```bash
# Подключите удалённый репозиторий
git remote add origin https://github.com/YOUR_USERNAME/100to1-game.git

# Проверьте что всё правильно
git remote -v

# Отправьте код на GitHub
git branch -M main
git push -u origin main
```

### 3. Готово! 🎉
Ваш проект теперь на GitHub!

---

## Автоматический деплой на Vercel

После загрузки на GitHub:

1. Откройте https://vercel.com
2. Войдите через GitHub
3. Нажмите "Add New..." → "Project"
4. Выберите репозиторий `100to1-game`
5. Нажмите "Deploy"

Готово! Ваше приложение будет доступно по адресу:
`https://100to1-game-xxx.vercel.app`

---

## Обновление кода

После изменений в коде:

```bash
git add .
git commit -m "Описание изменений"
git push
```

Vercel автоматически задеплоит обновления!
