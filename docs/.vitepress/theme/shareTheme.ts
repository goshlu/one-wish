const NextLocalStorage = ({
    defaultTheme,
    children,
    nonce,
    scriptContent
    themeKey = THEME }: LocalstorageProviderProps
) => {
    const [theme, setTheme] = useState<ThemeTypeProps | undefind>(defaultTheme);
    const setThemeState = useCallback(
        (value: ThemeTypeProps) => {
            setTheme(value);
            // 然后修改 localstorage 的信息
            saveToLS(themeKey, value);
        },
        [themeKey],
    );
    useEffect(() => {
        // 后续 theme 变化，更新 html class 对应的主题样式
        if (!theme) return;
        document.documentElement.classList = '';
        document.documentElement.classList.add(theme as ThemeTypeProps);
    }, [theme]);
    // 共享当前主题色和修改主题的方法给子组件用
    const providerValue = useMemo(
        () => ({
            theme,
            themeKey,
            setThemeState,
        }),
        [setThemeState, theme, themeKey],
    );
    return (
        <LocalstorageContext value= { providerValue } >
        {/* ThemeScript 组件就是注入 script 初始化主题的组件 */ }
        < ThemeScript />
        { children }
        </LocalstorageContext>
    );
}