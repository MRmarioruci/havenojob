import { useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../scss/pages/JobSummarizer.scss'

function JobSummarizer() {
	const chartRef = useRef(null);
	const [step, setStep] = useState(null);
	const [result, setResult] = useState();
	const [job_title, setJob_title] = useState('');
	const [job_description, setJob_description] = useState('');

	const loadingMessages = [
		"Processing your request while I consult the AI overlords. They're quite opinionated!",
		"Loading... The AI robots are busy calculating the meaning of life. It's a complex algorithm.",
		"Please wait while our AI assistant puts on its thinking cap and summons the knowledge you seek.",
		"Loading... The AI is currently taking a crash course in quantum physics to better understand your query.",
		"Hold tight! The AI is deep in meditation, contemplating the mysteries of the universe.",
		"Analyzing your request using the power of AI and a sprinkle of digital magic. Results coming soon!",
		"Loading... The AI is deciphering ancient hieroglyphics to decode the secrets hidden within your question.",
		"Please be patient. The AI is attending a crash course in comedy to craft the perfect witty response.",
		"Loading... The AI is searching the archives of the internet, uncovering ancient memes for your amusement.",
		"Processing your request with the assistance of AI supercomputers. They're fueled by pixels and a dash of imagination."
	];

	const getRandomLoadingMessage = () => {
		const randomIndex = Math.floor(Math.random() * loadingMessages.length);
		return loadingMessages[randomIndex];
	}
	const submit = () => {
		/* setStep('success')
		setTimeout(() => {
			generateChart();
		}, 250)
		fetch('/app/getJobMatch', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				candidate_job_title: candidate_job_title,
				candidate_profile: candidate_profile,
				job_title: job_title,
				job_description: job_description,
			})
		})
			.then((response) => response.json())
			.then(data => {
				if (data.status === 'ok') {
					
					setResult(data.data);
					setTimeout(() => {
						generateChart();
					}, 250)
				} else {
					setStep('error');
				}
			})
			.catch((error) => {
				console.log(error);
				setStep('error');
			}) */
	}
	const canSubmit = () => {
		return job_title && job_description;
	}
	return (
		<div className="card card__secondary jobsummarizer">
			<div className="page__section-title">
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
							<div className="jobsummarizer__result-successItem">
								<canvas ref={chartRef} />
							</div>
							<div className="jobsummarizer__result-successItem">
								<h4>The verdict is out</h4>
								<div className="font__30">
									There is a <b>{result?.percentageLow}</b>-<b>{result?.percentageHigh}</b>% Match!
								</div>
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
					<div className="btn btn__success text__secondary btn__100 btn__rounded" disabled={!canSubmit()} onClick={submit}>
						Summarize
					</div>
				</div>
			</div>
		</div>
	);
}

export default JobSummarizer;
