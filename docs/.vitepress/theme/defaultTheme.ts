const script = (defultTheme: ThemeTypeProps, themeKey: string)=>{
    const theme = localStorage.getItem(themeKey) || defultTheme
    localStorage.setItem(themeKey, theme)
    document.documentElement.setAttribute('class', theme)
};