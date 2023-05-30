import './scss/main.scss'
import JobMatcher from './components/JobMatcher';
import ProfileSummarizer from './components/ProfileSummarizer';
import JobSummarizer from './components/JobSummarizer';
import poggoImg from './images/poggo.png'
import logo from './images/logo.png'

function App() {
	return (
		<div className="page">
			<div className="page__header">
				<div className='page__header-menu'>
					<img src={logo} width="350"></img>
					<div className="float--right flex flex__row">
						<div className="btn btn__transparent">
							About
						</div>
						<div className="btn btn__transparent">
							Features
						</div>
						<button className="btn btn__inverted-outline btn-md btn__rounded page__header-menuItem">
							<span className="material-icons">arrow_downward</span>&nbsp;
							Check the demos
						</button>
						{/* <button className="btn btn__secondary btn-md btn__rounded page__header-menuItem">
							<span className="material-icons">how_to_reg</span>
							Register
						</button> */}
					</div>
				</div>
			</div>
			<div className="page__main">
				<div className="page__main-section">
					<div className="page__main-text">
						<h1 className="page__main-textHeader">
							HAVE NO JOB <span className="page__main-textHeaderUnderlined">.YOU?</span>
						</h1>
						<div className="font__20 mtop--20 text__semi-muted">
							We are here to make the job market easier.
							<br />
							A list of <b>AI</b> generative tools for helping both candidates and recruiters.
							<br />
							<small style={{ color: '#B3A0CF'}}>(Yes we said the magic word, AI, AI, AI....).</small>
							<br />
							Our goal is to make the job search as effortless and quick as we can.
							Take a look at our existing features. More to come...
						</div>
						<div className="mtop--20">
							<button className="btn btn__primary-outline btn-md btn__rounded page__header-menuItem">
								<span className="material-icons">arrow_downward</span>&nbsp;
								Try it out
							</button>
						</div>
					</div>
				</div>
				<div className="page__main-section">
					<div className="page__main-sectionRight">
						<div className="inner">
							<div className="page__main-sectionRightTitle">P.S. The closest thing we could find to Yoda 😂</div>
							<img src={poggoImg} width="350"></img>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="page__section">
				<div className="page__section-inner">
					<div className="btn btn__inverted-outline btn-md btn__rounded">
						High level summary
					</div>
					<div>
						Generate a summary of your/a candidates cv. Helpful for the jobmatcher feature as well for better results.
					</div>
					<div className="flex flex--row">
						<div>
							<div>
								Current Title
							</div>
							<div>
								Current CV
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div> */}
			<ProfileSummarizer />
			<JobMatcher />
			<JobSummarizer />
			{/* <div className="page__section">
				<div className="page__section-inner">
					<div className="page__section-title">
						JobCriteria
					</div>
					<div className="flex flex--row">
						<div>
							<div>
								Current Title
							</div>
							<div>
								Current CV
							</div>
						</div>
						<div></div>
					</div>
				</div>
			</div> */}
		</div>
	);
}

export default App;
