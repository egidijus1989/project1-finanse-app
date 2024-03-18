import { useSelector } from "react-redux";

export default function ThemeProviders({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-slate-900 dark:text-white dark:bg-slate-950">
        {children}
      </div>
    </div>
  );
}
