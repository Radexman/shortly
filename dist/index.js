// DOM Elements
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelectorAll('.nav-link');
const loadingScreen = document.querySelector('.loading-screen');

// Fetching API URL & Creating Output DOM Element
const getAPI = async (url) => {
	// Display Loading Screen
	loadingScreen.classList.remove('hidden');

	// Connect to API
	const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
	const data = await res.json();

	// Responses
	const originalLinkRes = data.result.original_link;
	const shortLinkRes = data.result.short_link;

	// Set Response To Session Storage
	sessionStorage.setItem('original-link', originalLinkRes);
	sessionStorage.setItem('short-link', shortLinkRes);

	// Hide Loading Screen
	loadingScreen.classList.add('hidden');

	// Appending Data To Div
	const linkContainer = document.createElement('div');
	linkContainer.classList.add('link-container');

	// Creating Original Link Text
	const linkText = document.createElement('p');
	linkText.classList.add('link-text');
	linkText.appendChild(document.createTextNode(sessionStorage.getItem('original-link')));

	// Creating Wrapper Div For Short Link & Copy Button
	const shortLinkWrapper = document.createElement('div');
	shortLinkWrapper.classList.add('short-link-wrapper');

	// Short Link
	const shortLink = document.createElement('div');
	shortLink.classList.add('short-link');
	shortLink.appendChild(document.createTextNode(sessionStorage.getItem('short-link')));

	// Copy Button
	const copyButton = document.createElement('button');
	copyButton.classList.add('copy-button');
	copyButton.appendChild(document.createTextNode('Copy'));
	copyButton.addEventListener('click', (e) => {
		const thisButton = e.target;
		navigator.clipboard.writeText(shortLinkRes);
		thisButton.textContent = 'Copied!';
		thisButton.classList.add('active');

		setTimeout(() => {
			thisButton.classList.remove('active');
			thisButton.textContent = 'Copy';
		}, 5000);
	});

	// Appending Short Link Wrapper
	shortLinkWrapper.appendChild(shortLink);
	shortLinkWrapper.appendChild(copyButton);

	linkContainer.appendChild(linkText);
	linkContainer.appendChild(shortLinkWrapper);

	// Appending Output Div
	document.getElementById('output').appendChild(linkContainer);
};

// Validate a URL
const validURL = (str) => {
	const pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
			'((\\d{1,3}\\.){3}\\d{1,3}))' +
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
			'(\\?[;&a-z\\d%_.~+=-]*)?' +
			'(\\#[-a-z\\d_]*)?$',
		'i'
	);
	return !!pattern.test(str);
};

// Form Validation
const getShortLink = (e) => {
	e.preventDefault();

	let inputValue = e.target.firstElementChild.value;
	const err = document.getElementById('err-msg');

	if (inputValue === '') {
		err.textContent = 'Please enter valid url';
		e.target.firstElementChild.classList.add('border-red');
		return;
	} else if (!validURL(inputValue)) {
		err.textContent = 'Please enter valid url';
		e.target.firstElementChild.classList.add('border-red');
		return;
	}

	getAPI(inputValue);
	err.textContent = '';
	e.target.firstElementChild.value = '';
};

// Mobile Menu, Hamburger Button & Nav Links Toggler
menuBtn.addEventListener('click', (e) => {
	e.currentTarget.classList.toggle('open');
	menu.classList.toggle('hidden');
});

navLinks.forEach((link) => {
	link.addEventListener('click', () => {
		menuBtn.classList.toggle('open');
		menu.classList.toggle('hidden');
	});
});

document.getElementById('link-form').addEventListener('submit', getShortLink);
