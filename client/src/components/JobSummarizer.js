import { useState, useRef } from 'react';
import { getRandomLoadingMessage } from '../utils/misc';
import '../scss/pages/JobSummarizer.scss'
import CopyToClipboard from 'react-copy-to-clipboard';

function JobSummarizer() {
	const [step, setStep] = useState(null);
	const [result, setResult] = useState();
	const [resultText, setResultText] = useState('');
	const [job_title, setJob_title] = useState('');
	const [job_description, setJob_description] = useState('');
	const [retriesRemaining, setRetriesRemaining] = useState(localStorage.getItem('jobsummarizer__retries') || 5)
	const [copied, setCopied] = useState(null);
	const resultRef = useRef(null);

	const submit = () => {
		setStep('loading')
		fetch('/app/getJobSummary', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				job_title: job_title,
				job_description: job_description,
			})
		})
		.then((response) => response.json())
		.then(data => {
			if (data.status === 'ok') {
				setResult(data.data);
				setResultText(
					data.data.replace(/<style[^>]*>.*<\/style>/gm, '')
					.replace(/<script[^>]*>.*<\/script>/gm, '')
					.replace(/<[^>]+>/gm, '')
					.replace(/([\r\n]+ +)+/gm, '')
				)
				setStep('success');
				localStorage.setItem('jobsummarizer__retries', retriesRemaining - 1);
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
		return job_title && job_description && (retriesRemaining > 0);
	}
	return (
		<div className="card card__secondary jobsummarizer">
			<div className="text__gradient subheader">
				Job Summarizer
			</div>
			<div className="text__muted text__center font__16">
				Get the summary of a job description.
				<br />
				No candidate wants to read "a superhero/jedi master needed" 100 times. Just skim through the most important and relative info.
			</div>
			<div className="jobsummarizer__content mtop--30">
				<div className="jobsummarizer__result">
					{step === null &&
						<div className='text__center'>
							<lottie-player src="https://assets7.lottiefiles.com/packages/lf20_lqge6px5.json" background="transparent" speed="1" style={{ width: '50%', height: '50%', margin: 'auto' }} loop autoplay></lottie-player>
							<h4>Fill in your details quickly and hit Summarize</h4>
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
						<div className='jobsummarizer__result-success'>
							<div className="job-summarizer__result" ref={resultRef}></div>
							<CopyToClipboard text={resultText} onCopy={() => setCopied(true)}>
								<button className="btn btn__primary-soft jobsummarizer__result-successCopy">
									{ copied ?
										<>
											<span className="material-icons font--20">
												check
											</span>
											Copied
										</>
										:
										<>
											<span className="material-icons font--20">
												copy_all
											</span>
											Copy
										</>
									}
								</button>
							</CopyToClipboard>
							<div  dangerouslySetInnerHTML={{ __html: result }}>
							</div>
						</div>
					}
				</div>
				<div className="jobsummarizer__actions">
					<div className="card">
						<div className="btn btn__success btn__rounded font__20 text__bold jobsummarizer__counter">
							1
						</div>
						<div className="mtop--20">
							<h4>Job Description</h4>
							<div className="form__group">
								<label>Job Title</label>
								<div className="input__wrap">
									<input type="text" placeholder="Eg. Fullstack Software Engineer" value={job_title} onChange={(e) => setJob_title(e.target.value)} />
									<span className="focus"></span>
								</div>
							</div>
							<div className="form__group">
								<label>Copy & Paste the job description.</label>
								<div className="input__wrap">
									<textarea placeholder="The more structured the input you provide the better the result." value={job_description} onChange={(e) => setJob_description(e.target.value)}>
									</textarea>
									<span className="focus"></span>
								</div>
							</div>
						</div>
					</div>
					{retriesRemaining > 0 ?
						<>
							<div className="btn btn__success text__secondary btn__100 btn__rounded" disabled={!canSubmit()} onClick={submit}>
								Summarize
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
			</div>
		</div>
	);
}

export default JobSummarizer;
