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

export const getRandomLoadingMessage = () => {
	const randomIndex = Math.floor(Math.random() * loadingMessages.length);
	return loadingMessages[randomIndex];
}