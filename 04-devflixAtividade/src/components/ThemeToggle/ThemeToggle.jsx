import { useEffect, useRef, useState } from "react";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = ({
	title,
	languageLabel,
	themeLabel,
	language,
	theme,
	languageOptions,
	themeOptions,
	onChangeLanguage,
	onChangeTheme,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const wrapperRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.wrapper} ref={wrapperRef}>
			<button
				type="button"
				className={styles.menuButton}
				onClick={() => setIsOpen((prev) => !prev)}
				aria-expanded={isOpen}
				aria-haspopup="true"
				aria-label={title}
			>
				<span className={styles.hamburgerIcon} aria-hidden="true">
					<span className={styles.bar}></span>
					<span className={styles.bar}></span>
					<span className={styles.bar}></span>
				</span>
			</button>

			{isOpen && (
				<div className={styles.dropdown}>
					<label htmlFor="languageSelect">🌐 {languageLabel}</label>
					<select
						id="languageSelect"
						value={language}
						onChange={(event) => onChangeLanguage(event.target.value)}
					>
						<option value="en">🇺🇸 {languageOptions.en}</option>
						<option value="pt">🇧🇷 {languageOptions.pt}</option>
						<option value="es">🇪🇸 {languageOptions.es}</option>
					</select>

					<label htmlFor="themeSelect">🎨 {themeLabel}</label>
					<select id="themeSelect" value={theme} onChange={(event) => onChangeTheme(event.target.value)}>
						<option value="light">☀️ {themeOptions.light}</option>
						<option value="dark">🌙 {themeOptions.dark}</option>
					</select>
				</div>
			)}
		</div>
	);
};

export default ThemeToggle;
