import { useState } from 'react';
import '../scss/pages/Preregister.scss'

function Preregister() {
	const [step, setStep] = useState(null);
	const [email, setEmail] = useState('');
	const submit = () => {
		setStep('loading')
		fetch('/app/preregister', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
			.then((response) => response.json())
			.then(data => {
				if (data.status === 'ok') {
					setStep('success');
				} else {
					setStep('error');
				}
			})
			.catch((error) => {
				console.log(error);
				setStep('error');
			})
	}
	return (
		<div className="preregister">
			<div className="text__gradient subheader">
				Preregister
			</div>
			<div className="text__muted text__center font__16">
				Enter your email and get access to the the full products.
			</div>
			<div className="preregister__input">
				<lottie-player src="https://assets7.lottiefiles.com/packages/lf20_5p7c7ico.json" background="transparent" speed="1" style={{ width: '100%', height: '80%', margin: 'auto' }} loop autoplay></lottie-player>
				<div className="preregister__form">
					{step === null &&
						<>
							<input type="email" placeholder='Type here...' value={email} onChange={(e) => setEmail(e.target.value)} />
							<div className="btn btn__primary send" onClick={submit} disabled={!email}>
								<span className='material-icons font__30'>
									send
								</span>
							</div>
						</>
					}
					{step === 'error' &&
						<h4 className="text__danger">An error occured. Please try again later, or with another email.</h4>
					}
					{step === 'success' &&
						<div className="text__center">
							<lottie-player src="https://assets9.lottiefiles.com/packages/lf20_UcplubY94d.json" background="transparent" speed="1" style={{ width: '150px', height: '150px', margin: 'auto' }} loop autoplay></lottie-player>
							<h4>Congrats! We will notify you shortly with a link to the full version of the platform.</h4>
						</div>
					}
				</div>
			</div>
			{step === null &&
				<div className="preregister__cards">
					<div className="preregister__cards-inner">
						<div className="card card__secondary preregister__card">
							<h4>Unlimited</h4>
							<div className="mtop--20">
								You will have unlimited access to all of the features.
								This will be a pay as you go service. Flat fees without any hidden costs.
							</div>
						</div>
						<div className="card card__secondary preregister__card">
							<h4>Queues</h4>
							<div className="mtop--20">
								No need to wait for each report to come out.
								Just create your queue with all of your candidates and we will notify you when the report is ready.
							</div>
						</div>
						<div className="card card__secondary preregister__card">
							<h4>Rankings</h4>
							<div className="mtop--20">
								Want to rank your jobs or your candidates automatically?
								Just insert your queue and we will rank them for you so that you can contact the best ones!
							</div>
						</div>
					</div>
					<div className="text__center">
						<h3>You will get these features and more.</h3>
						<h5 className="mtop--20">Contact me at <a>contact@marioruci.com</a> for more</h5>
					</div>
				</div>
			}
		</div>
	);
}

export default Preregister;
