import '../scss/pages/Footer.scss'
import logo from '../images/logo.png'

const getToday = () => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	return currentYear;
}
function Footer() {
	return (
		<div className="card card__secondary footer">
			<div className="footer__header">
				<div className="footer__header-item">
					<img src={logo} width="150"></img>
					<div className="mtop--10 text__muted">
						The purpose of this platform is to make the job searching experience as quick and easy as it can be.
						Both sides of the job finding industry (job seekers & job posters) need to filter through tons of information,
						which in many cases is irrelevant and further impairs the experience of both parties.
						<br />
						<br />
						The tools demonstrated in this website are for demo purposes. To get the full capabilities of the platform, you will need
						to preregister.
						<br /><br />
						Also this platform uses A.I to generate it's results and response accuracy depends on the creative and general thinking of the A.I.
					</div>
				</div>
				<div className="footer__header-item">
					<h4>Features</h4>
					<div className="mtop--20">
						<label className="text__bold">Profile Summarizer</label>
						<div className="text__muted font__12">
							Get the summary of a candidates profile. No need to read through everything. Just skim through the most important and relative info.
						</div>
					</div>
					<div className="mtop--20">
						<label className="text__bold">Job Summarizer</label>
						<div className="text__muted font__12">
							Get the summary of a job description.
							No candidate wants to read "a superhero/jedi master needed" 100 times. Just skim through the most important and relative info.
						</div>
					</div>
					<div className="mtop--20">
						<label className="text__bold">Job Matcher</label>
						<div className="text__muted font__12">
							Instantly check whether a candidate is the right fit for a role and vice-versa.
						</div>
					</div>
				</div>
				<div className="footer__header-item">
					<h4>Creator</h4>
					<div className="mtop--20">
						<a className="btn btn__secondary btn__circle" href="https://www.linkedin.com/in/mario-ruci-a03689151/" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M3.54 1.71a1.33 1.33 0 0 1-1.3 1.34A1.36 1.36 0 0 1 .93 1.71A1.34 1.34 0 0 1 2.24.43a1.33 1.33 0 0 1 1.3 1.28ZM1.07 5.43c0-.77.49-.65 1.17-.65s1.16-.12 1.16.65v7.5c0 .78-.49.62-1.16.62s-1.17.16-1.17-.62Zm4.35 0c0-.43.16-.59.41-.64s1.11 0 1.41 0s.42.49.41.86a2.51 2.51 0 0 1 2.24-1a3 3 0 0 1 3.18 3.13v5.12c0 .78-.48.62-1.16.62s-1.16.16-1.16-.62v-4a1.44 1.44 0 0 0-1.52-1.56a1.45 1.45 0 0 0-1.48 1.59v4c0 .78-.49.62-1.17.62s-1.16.16-1.16-.62Z"></path></svg>
						</a>
						<a className="btn btn__secondary btn__circle" href="https://marioruci.com/" target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="7" r="6.5"></circle><path d="M.5 7h13m-4 0A11.22 11.22 0 0 1 7 13.5A11.22 11.22 0 0 1 4.5 7A11.22 11.22 0 0 1 7 .5A11.22 11.22 0 0 1 9.5 7Z"></path></g></svg>
						</a>
					</div>
				</div>
			</div>
			<div className="mtop--20 text__center">
				Copyright © havenojob.me <span>{getToday()}</span>
			</div>
		</div>
	);
}

export default Footer;
