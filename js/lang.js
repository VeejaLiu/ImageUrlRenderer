const text = {
    "en": {
        "imageURL": "Image URL:",
        "renderButton": "Render",
        "placeholder": "Enter Image URL"
    },
    "zh": {
        "imageURL": "图片链接:",
        "renderButton": "生成",
        "placeholder": "输入图片链接"
    }
}


function loadLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = text[lang][key];
    });
}

// 默认加载英语
loadLanguage('zh');

// 根据用户浏览器语言加载语言
const userLang = navigator.language.split('-')[0]; // 获取浏览器语言的第一部分
console.log('userLang:', userLang);
loadLanguage(userLang);