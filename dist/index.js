// Fetching API URL
const getAPI = async (url) => {
	const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
	const data = await res.json();

	// Appending Data To Div
	const link = document.createElement('div');
	link.innerHTML = `
    				<div class="flex flex-col items-center justify-between w-full py-6 bg-white rounded-lg md:flex-row">
					<p class="font-bold text-center text-veryDarkViolet md:text-left">
						${data.result.original_link}
					</p>
					<div class="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
						<div class="font-bold text-cyan">
							${data.result.short_link}
						</div>
						<button class="p-2 px-8 text-white bg-cyan rounded-lg hover:opacity-70 focus:outline-none">Copy</button>
					</div>
				</div>`;

	document.getElementById('output').appendChild(link);
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
