import { useEffect, useState, useRef } from 'react';
import { getRandomLoadingMessage } from '../utils/misc';
import '../scss/pages/ProfileSummarizer.scss'
import { CopyToClipboard } from 'react-copy-to-clipboard';

function ProfileSummarizer() {
	const [copied, setCopied] = useState(null);
	const [step, setStep] = useState(null);
	const [result, setResult] = useState();
	const [resultText, setResultText] = useState('');
	const [candidate_job_title, setCandidate_job_title] = useState('');
	const [candidate_profile, setCandidate_profile] = useState('');
	const [retriesRemaining, setRetriesRemaining] = useState(localStorage.getItem('profilesummarizer__retries') || 5)
	const resultRef = useRef(null);

	const submit = () => {
		setStep('loading')
		fetch('/app/getProfileSummary', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				candidate_job_title: candidate_job_title,
				candidate_profile: candidate_profile
			})
		})
		.then((response) => response.json())
		.then(data => {
			if (data.status === 'ok') {
				setStep('success');
				setResult(data.data);
				setResultText(
					data.data.replace(/<style[^>]*>.*<\/style>/gm, '')
					.replace(/<script[^>]*>.*<\/script>/gm, '')
					.replace(/<[^>]+>/gm, '')
					.replace(/([\r\n]+ +)+/gm, '')
				)
				localStorage.setItem('profilesummarizer__retries', retriesRemaining - 1);
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
		return candidate_job_title && candidate_profile && (step !== 'loading') && (retriesRemaining > 0);
	}
	useEffect(() => {
		setTimeout(() => {
			setCopied(false);
		}, 2000)
	}, [copied])
	return (
		<div className="card card__secondary summarizer">
			<div className="text__gradient subheader">
				Profile Summarizer
			</div>
			<div className="text__muted text__center font__16">
				Get the summary of a candidates profile. No need to read through everything. Just skim through the most important and relative info.
			</div>
			<div className="summarizer__content mtop--30">
				<div className="summarizer__result">
					{step === null &&
						<div className='text__center'>
							<lottie-player src="https://assets1.lottiefiles.com/packages/lf20_vemp9xtz.json" background="transparent" speed="1" style={{ width: '80%', height: '80%', margin: 'auto' }} loop autoplay></lottie-player>
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
							<h4>It seems like we had an error. Please try again later, or reduce the input size.</h4>
						</div>
					}
					{step === 'success' &&
						<div className='summarizer__result-success'>
							<div className="profile-summarizer__result" ref={resultRef}></div>
							<CopyToClipboard text={resultText} onCopy={() => setCopied(true)}>
								<button className="btn btn__primary-soft summarizer__result-successCopy">
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
				<div className="summarizer__actions">
					<div className="card">
						<div className="btn btn__success btn__rounded font__20 text__bold summarizer__counter">
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

export default ProfileSummarizer;
