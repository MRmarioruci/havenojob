import { useState, useRef } from 'react';
import { getRandomLoadingMessage } from '../utils/misc';
import '../scss/pages/CoverLetter.scss'
import RichTextEditor from './RichTextEditor';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function CoverLetter() {
	const [step, setStep] = useState(null);
	const [result, setResult] = useState();
	const [company, setCompany] = useState('');
	const [jobTitle, setJobTitle] = useState('');
	const [candidateProfile, setCandidateProfile] = useState('');
	const [extraInstructions, setExtraInstructions] = useState('');
	const [retriesRemaining, setRetriesRemaining] = useState(localStorage.getItem('coverLetter__retries') || 5)
	const [pdfModal, setPdfModal] = useState(false);
	const resultRef = useRef(null);
	const printRef = useRef();

	const submit = () => {
		setStep('loading')
		fetch('/app/generateCoverLetter', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				company: company,
				job_title: jobTitle,
				candidate_profile: candidateProfile,
				extraInstructions: extraInstructions
			})
		})
			.then((response) => response.json())
			.then(data => {
				if (data.status === 'ok') {
					setResult(data.data);
					setStep('success');
					localStorage.setItem('coverLetter__retries', retriesRemaining - 1);
					setRetriesRemaining(retriesRemaining - 1);
					setTimeout(() => {
						if (resultRef.current) resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
					}, 150);
				} else {
					setStep('error');
				}
			})
			.catch((error) => {
				console.log(error);
				setStep('error');
			})
	}
	const canSubmit = () => {
		return jobTitle && company && (retriesRemaining > 0);
	}
	const handleEditorChange = (value) => {
		setResult(value);
	};
	const handleDownloadPdf = async () => {
		const element = printRef.current;
		const canvas = await html2canvas(element);
		const data = canvas.toDataURL('image/png');

		const pdf = new jsPDF();
		pdf.setFontSize(26); // Set the desired font size here
		const imgProperties = pdf.getImageProperties(data);
		const pdfWidth = pdf.internal.pageSize.getWidth();
		
		const pdfHeight =
			((imgProperties.height * pdfWidth) / (imgProperties.width));
		
		pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
		pdf.save('print.pdf');
	};
	return (
		<div className="card card__secondary coverLetter">
			<div className="text__gradient subheader">
				Cover Letter Generator
			</div>
			<div className="text__muted text__center font__16">
				Generate a relevant hear felt cover letter instantly
			</div>
			<div className="coverLetter__content mtop--30">
				<div className="coverLetter__actions">
					<div className="mtop--20">
						<div className="form__group">
							<label>Job Title</label>
							<div className="input__wrap">
								<input type="text" placeholder="Eg. Frontend Software Engineer" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
								<span className="focus"></span>
							</div>
						</div>
					</div>
					<div className="mtop--20">
						<div className="form__group">
							<label>Company Name</label>
							<div className="input__wrap">
								<input type="text" placeholder="Eg. Frontend Software Engineer" value={company} onChange={(e) => setCompany(e.target.value)} />
								<span className="focus"></span>
							</div>
						</div>
					</div>
					<div className="mtop--20">
						<label>Copy & Paste your cv. (optional)</label>
						<div className="form__group">
							<div className="input__wrap">
								<textarea placeholder="The more structured the input you provide the better the result." value={candidateProfile} onChange={(e) => setCandidateProfile(e.target.value)}></textarea>
								<span className="focus"></span>
							</div>
						</div>
					</div>
					{/* <div className="mtop--20">
						<label>Extra Instructions(optional)</label>
						<div className="form__group">
							<div className="input__wrap">
								<textarea placeholder="Do not provide any personal information." value={extraInstructions} onChange={(e) => setExtraInstructions(e.target.value)}></textarea>
								<span className="focus"></span>
							</div>
						</div>
					</div> */}
					{retriesRemaining > 0 ?
						<>
							<div className="btn btn__success text__secondary btn__100 btn__rounded" disabled={!canSubmit()} onClick={submit}>
								Generate
							</div>
							<div className="text__warning text__center">
								<b>{retriesRemaining}</b> tries remaining.
							</div>
						</>
						:
						<>
							<div className="text__warning text__center">
								You have used all of your demo tokens
							</div>
							<a className='btn btn__primary text__secondary btn__100 btn__rounded' href='#preregister'>
								Preregister for more. This is just a demo!
							</a>
						</>
					}
				</div>
				<div className="coverLetter__result">
					{step === null &&
						<div className="text__center">
							<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_hXbbjCPqVz.json" background="transparent" speed="1" style={{ width: '80%', height: '80%', margin: 'auto' }} loop autoplay></lottie-player>
							<h4>Fill in the details and let us work our magic.</h4>
						</div>
					}
					{step === 'loading' &&
						<div className='text__center'>
							<lottie-player src="https://assets4.lottiefiles.com/packages/lf20_i1GiktPw9N.json" background="transparent" speed="1" style={{ width: '50%', height: '50%', margin: 'auto' }} loop autoplay></lottie-player>
							<h4>{getRandomLoadingMessage()}</h4>
						</div>
					}
					{step === 'error' &&
						<div className='text__center'>
							<lottie-player src="https://assets6.lottiefiles.com/packages/lf20_pNx6yH.json" background="transparent" speed="1" style={{ width: '50%', height: '50%', margin: 'auto' }} loop autoplay></lottie-player>
							<h4>It seems like we had an error. Please try again later, or reduce the input content of the job description and candidate cv section.</h4>
						</div>
					}
					{step === 'success' &&
						<div className='coverLetter__result-success'>
							<div className="coverLetter__result" ref={resultRef}></div>
							{/* <button className="btn btn__primary-soft coverLetter__result-successCopy" onClick={() => { setPdfModal(true) }}>
								<span className="material-icons">download</span>
								PDF
							</button> */}
							<RichTextEditor value={result} onChange={handleEditorChange} />
						</div>
					}
				</div>
			</div>
			{pdfModal &&
				<div className="modal__overlay active">
					<div className="modal active animate__animated animate__fadeIn modal__lg">
						<div className="modal__header">
							<div className="modal__header-title">
								<h2>Download PDF</h2>
							</div>
							<div className="close-modal modal--x" onClick={() => { setPdfModal(false) }}>
								<svg viewBox="0 0 20 20">
									<path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
								</svg>
							</div>
						</div>
						<div className="modal__content">
							<div className="modal__body" style={{ background: '#fff', color: '#000', padding: '20px' }} ref={printRef}>
								<div dangerouslySetInnerHTML={{ __html: result }} >
								</div>
								<div className="btn btn__primary" onClick={handleDownloadPdf}>
									Download
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	);
}

export default CoverLetter;
