import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const RichTextEditor = ({ value, onChange }) => {
	const quillRef = useRef(null);

	useEffect(() => {
		const quill = new Quill(quillRef.current, {
			theme: 'snow',
			modules: {
				toolbar: [
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					['bold', 'italic', 'underline', 'strike'],
					[{ color: [] }, { background: [] }],
					[{ align: [] }],
					['link'],
					['clean']
				]
			}
		});

		quill.on('text-change', () => {
			const editorValue = quill.root.innerHTML;
			onChange(editorValue);
		});

		// Set initial content
		quill.clipboard.dangerouslyPasteHTML(value);
		console.log(value);
		//quill.root.innerHTML = value;
		//console.log(value);

		return () => {
			//quill.off('text-change');
			//quill.container.remove();
			//quillRef.current = null;
		};
	}, []);

	return <div ref={quillRef} />;
};

export default RichTextEditor;
