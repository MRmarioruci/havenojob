import {useState, useRef} from 'react';
import Chart from 'chart.js/auto';
import '../scss/pages/JobMatcher.scss'

function JobMatcher() {
	const chartRef = useRef(null);
	const [step, setStep] = useState(null);
	const [candidate_job_title, setCandidate_job_title] = useState('');
	const [candidate_profile, setCandidate_profile] = useState('');
	const [job_title, setJob_title] = useState('');
	const [job_description, setJob_description] = useState('');
	const [result, setResult] = useState({percentageHigh: 80, percentageLow: 45});
	const getChartColor = () => {
		if( result?.percentageLow <= 40 ){
			return '249, 116, 118'
		} else 	if( (result?.percentageLow >= 41) && (result?.percentageLow <= 64) ){
			return '253, 196, 72'
		} else if( (result?.percentageLow >= 65) && (result?.percentageLow <= 74) ){
			return '179, 160, 207'
		}else if( (result?.percentageLow >= 75) && (result?.percentageLow <= 100) ){
			return '56, 193, 114'
		}
	}
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
	const generateChart = () => {
		const chartOptions = {
			responsive: true,
			maintainAspectRatio: false
		};
		const chartColor = getChartColor();
		const chartData = {
			labels: [
			],
			datasets: [{
				label: 'Maximum',
				data: [result.percentageHigh, 100 - result.percentageHigh],
				backgroundColor: [
					`rgba(${chartColor}, 1)`,
					'rgba(255, 255, 255, 0.0)',
				],
				hoverOffset: 4
			},
			{
				label: 'Minimum',
				data: [result.percentageLow, 100 - result.percentageLow],
				backgroundColor: [
					`rgba(${chartColor}, 0.7)`,
					'rgba(255, 255, 255, 0.0)',
				],
				hoverOffset: 4
			}
			]
		};
		if(chartRef.current){
			new Chart(chartRef.current, {
				type: 'doughnut',
				data: chartData,
				options: chartOptions
			});
		}
	}
	const submit = () => {
		setStep('success')
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
			if(data.status === 'ok'){
				//setStep('success');
				/* setResult(data.data);
				setTimeout(() => {
					generateChart();
				}, 250) */
			}else{
				setStep('error');
			}
		})
		.catch((error) => {
			console.log(error);
			setStep('error');
		})
	}
	const canSubmit = () => {
		return candidate_job_title && candidate_profile && job_title && job_description;
	}
	return (
		<div className="card card__secondary jobmatcher">
			<div className="page__section-title">
				Job Matcher
			</div>
			<div className="text__muted text__center font__16">
				With job matcher you can instatly check if you or the candidate is a good match for a job description.
				No more wasting time on reading through pages of job descriptions and trying to figure out whether you should take the next step.
				Add your data quickly and get the match range.
			</div>
			<div className="jobmatcher__content mtop--30">
				<div className="jobmatcher__actions">
					<div className="card">
						<div className="btn btn__success btn__rounded font__20 text__bold jobmatcher__counter">
							1
						</div>
						<div className="mtop--20">
							<h4>Candidate Profile</h4>
							<div className="form__group">
								<label>Current Job Title</label>
								<div className="input__wrap">
									<input type="text" placeholder="Eg. Frontent Software Engineer" value={candidate_job_title} onChange={(e) => setCandidate_job_title(e.target.value)} />
									<span className="focus"></span>
								</div>
							</div>
							<div className="form__group">
								<label>Copy & Paste the candidate's cv.</label>
								<div className="input__wrap">
									<textarea placeholder="The more structured the input you provide the better the result." value={candidate_profile} onChange={(e) => setCandidate_profile(e.target.value)}></textarea>
									<span className="focus"></span>
								</div>
							</div>
						</div>
					</div>
					<div className="card">
						<div className="btn btn__success btn__rounded font__20 text__bold jobmatcher__counter">
							2
						</div>
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
					<div className="btn btn__success text__secondary btn__100 btn__rounded" disabled={!canSubmit()} onClick={submit}>
						Check the match
					</div>
				</div>
				<div className="jobmatcher__result">
					{ step === null && 
						<div className='text__center'>
							<lottie-player src="https://assets8.lottiefiles.com/packages/lf20_wyopauto.json" background="transparent" speed="1" style={{ width: '80%', height: '80%', margin: 'auto' }} loop autoplay></lottie-player>
							<h4>Fill in your details quickly and hit Check the match</h4>
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
						<div className='jobmatcher__result-success'>
							<div className="jobmatcher__result-successItem">
								<canvas ref={chartRef} />
							</div>
							<div className="jobmatcher__result-successItem">
								<h4>The verdict is out</h4>
								<div className="font__30">
									There is a <b>{result?.percentageLow}</b>-<b>{result?.percentageHigh}</b>% Match!
								</div>	
							</div>
						</div>
					}
				</div>
			</div>
		</div>
	);
}

export default JobMatcher;
