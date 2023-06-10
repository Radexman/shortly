const linkForm = document.getElementById('link-form');

const getAPI = async (url) => {
	const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
	const data = await res.json();

	console.log();
	console.log(data.result);

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

linkForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const inputValue = e.target.firstElementChild.value;
	if (inputValue === '') {
		console.log('Please enter valid url');
	} else {
		getAPI(inputValue);
	}
});
