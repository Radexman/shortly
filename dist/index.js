// Fetching API URL
const getAPI = async (url) => {
	const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
	const data = await res.json();

	// Appending Data To Div
	const linkContainer = document.createElement('div');
	linkContainer.classList.add('link-container');

	// Creating Original Link Text
	const linkText = document.createElement('p');
	linkText.classList.add('link-text');
	linkText.appendChild(document.createTextNode(data.result.original_link));

	// Creating Wrapper Div For Short Link & Copy Button
	const shortLinkWrapper = document.createElement('div');
	shortLinkWrapper.classList.add('short-link-wrapper');

	// Short Link
	const shortLink = document.createElement('div');
	shortLink.classList.add('short-link');
	shortLink.appendChild(document.createTextNode(data.result.short_link));

	// Copy Button
	const copyButton = document.createElement('button');
	copyButton.classList.add('copy-button');
	copyButton.appendChild(document.createTextNode('Copy'));

	// Appending Short Link Wrapper
	shortLinkWrapper.appendChild(shortLink);
	shortLinkWrapper.appendChild(copyButton);

	linkContainer.appendChild(linkText);
	linkContainer.appendChild(shortLinkWrapper);

	// Appending Output Div
	document.getElementById('output').appendChild(linkContainer);
};

// Form Validation
const getShortLink = (e) => {
	e.preventDefault();

	const inputValue = e.target.firstElementChild.value;
	const err = document.getElementById('err-msg');

	if (inputValue === '') {
		err.textContent = 'Please enter valid url';
		e.target.firstElementChild.classList.add('border-red');
		return;
	}

	err.textContent = '';
	getAPI(inputValue);
};

document.getElementById('link-form').addEventListener('submit', getShortLink);
