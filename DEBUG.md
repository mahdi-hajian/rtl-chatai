# راهنمای Debugging

## روش 1: استفاده از `debugger;` statement

در کد `content.js` می‌توانید `debugger;` اضافه کنید. وقتی DevTools باز باشد، کد در آن نقطه متوقف می‌شود.

مثال:
```javascript
function applyRTLStyles() {
  debugger; // کد اینجا متوقف می‌شود
  const elements = document.querySelectorAll('[dir="auto"]');
  // ...
}
```

## روش 2: استفاده از Chrome DevTools

### گام‌های دقیق:

1. **باز کردن DevTools:**
   - راست‌کلیک روی صفحه → "Inspect"
   - یا کلید `F12` یا `Ctrl+Shift+I`

2. **پیدا کردن Content Script:**
   - در DevTools به تب **Sources** بروید
   - در پنل سمت چپ، به دنبال **Extensions** یا **Content scripts** بگردید
   - نام اکستنشن شما را پیدا کنید: `chrome-extension://[ID]/content.js`
   - یا در قسمت بالا، روی آیکون **>>** کلیک کنید و **Extensions** را انتخاب کنید

3. **گذاشتن Breakpoint:**
   - روی شماره خط مورد نظر کلیک کنید
   - یک نقطه آبی ظاهر می‌شود (breakpoint)

4. **Reload صفحه:**
   - صفحه را رفرش کنید (`F5` یا `Ctrl+R`)
   - کد در breakpoint متوقف می‌شود

## روش 3: استفاده از Console

می‌توانید `console.log()` اضافه کنید تا مقادیر را ببینید:

```javascript
function applyRTLStyles() {
  const elements = document.querySelectorAll('[dir="auto"]');
  console.log('Found elements:', elements.length);
  console.log('Elements:', elements);
  // ...
}
```

## نکات مهم:

- **DevTools باید باز باشد** قبل از اینکه صفحه لود شود
- اگر breakpoint کار نمی‌کند، مطمئن شوید که اکستنشن reload شده است
- برای reload اکستنشن: به `chrome://extensions/` بروید و روی آیکون refresh کلیک کنید
- می‌توانید از **Console** برای تست دستورات استفاده کنید

## دستورات مفید در Console:

```javascript
// چک کردن وضعیت storage
chrome.storage.sync.get(['rtlEnabled'], console.log);

// پیدا کردن عناصر
document.querySelectorAll('[dir="auto"]');

// تست دستی
applyRTLStyles();
```

