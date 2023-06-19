import {useState} from 'react';
import { getRandomLoadingMessage } from '../utils/misc';
import '../scss/pages/JobMatcher.scss'
import ChartComponent from './ChartComponent';

function JobMatcher() {
	const [step, setStep] = useState(null);
	const [candidate_job_title, setCandidate_job_title] = useState('');
	const [candidate_profile, setCandidate_profile] = useState('');
	const [summarize_profile, setSummarize_profile] = useState(false);
	const [job_title, setJob_title] = useState('');
	const [job_description, setJob_description] = useState('');
	const [summarize_job, setSummarize_job] = useState(false);
	const [result, setResult] = useState(null);
	const [retriesRemaining, setRetriesRemaining] = useState(localStorage.getItem('jobmatcher__retries') || 5)

	const submit = () => {
		setStep('loading')
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
				summarize_profile: summarize_profile,
				summarize_job: summarize_job
			})
		})
		.then((response) => response.json())
		.then(data => {
			if(data.status === 'ok'){
				setStep('success');
				setResult(data.data);
				localStorage.setItem('jobmatcher__retries', retriesRemaining-1);
				setRetriesRemaining(retriesRemaining-1);
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
		return candidate_job_title && candidate_profile && job_title && job_description && (retriesRemaining > 0);
	}
	return (
		<div className="jobmatcher">
			<div className="text__gradient subheader">
				Job Matcher
			</div>
			<div className="text__muted text__center font__16">
				Instantly check whether a candidate is the right fit for a role and vice-versa.
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
							<div className="form__group">
								<input value={summarize_profile} onChange={e => setSummarize_profile(e.target.checked)} type="checkbox" />
								<label>Generate a structured profile summary?</label>
								<div className="text__muted font__12 mleft--25">
									This will take longer to generate but will produce better results
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
							<div className="form__group">
								<input value={summarize_job} onChange={e => setSummarize_job(e.target.checked)} type="checkbox" />
								<label>Generate a structured job summary?</label>
								<div className="text__muted font__12 mleft--25">
									This will take longer to generate but will produce better results
								</div>
							</div>
						</div>
					</div>
					{retriesRemaining > 0 ?
						<>
							<div className="btn btn__success text__secondary btn__100 btn__rounded" disabled={!canSubmit()} onClick={submit}>
								Check the match
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
								<div className="jobmatcher__result-successItem">
									<ChartComponent result={result} />
								</div>
								<h4>The verdict is out</h4>
								<div className="font__30">
									There is a <b>{result?.percentageLow}</b>-<b>{result?.percentageHigh}</b>% Match!
								</div>	
							</div>
							<div className="flex flex--row flex--wrap">
								<div className="btn btn__sm" style={{ background: 'rgb(249, 116, 118)'}}>No match</div>
								<div className="btn btn__sm" style={{ background: 'rgb(253, 196, 72)'}}>Low match</div>
								<div className="btn btn__sm" style={{ background: 'rgb(179, 160, 207)'}}>Medium match</div>
								<div className="btn btn__sm" style={{ background: 'rgb(56, 193, 114)'}}>Great match</div>
							</div>
						</div>
					}
				</div>
			</div>
		</div>
	);
}

export default JobMatcher;
