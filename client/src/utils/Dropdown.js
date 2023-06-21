import React, { useRef, useEffect } from 'react';

function Dropdown(props) {
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current.getElementsByClassName('dropdown-trigger')[0];
		if (el) el.addEventListener('click', (e) => {
			e.stopPropagation();
			if (ref.current.classList.contains('active')) {
				ref.current.className = getDropdownCSS();
			} else {
				ref.current.className = getDropdownCSS() + ' active';
				if (props.onClickCallback) props.onClickCallback(true)
			}
		});
	}, [])
	window.addEventListener("click", (e) => {
		if (!ref.current) return;

		if (ref.current.classList.contains('active')) {
			ref.current.className = getDropdownCSS();
		}
	});
	const getDropdownCSS = () => {
		let c = 'dropdown vm--align';
		if (props.dropup) c += ' is-up';
		if (props.isRight) c += ' is-right';
		return c;
	}
	return (
		<div className={getDropdownCSS()} ref={ref}>
			{props.children}
		</div>
	)
}

export default Dropdown
