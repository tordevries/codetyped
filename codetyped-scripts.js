/*

JavaScript for Codetyped.

*/

clockie = null;
totalSeconds = 0;
done = false;
placeholderText = "";

window.onload = function() {
	
	codeEntry = document.getElementById('typeCode');
	
	placeholderText = document.getElementById("typeCode").getAttribute("placeholder");
	
	// trigger timer and allow tabs in textarea
	// adapted from https://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
	codeEntry.addEventListener('keydown', function(e) {
		
		if (clockie == null) {
			startTimer();
			document.getElementById("typeCode").setAttribute("placeholder", "");
			document.getElementById("typeCode").classList.add("codeWrap");
		}
		
		if (e.key == 'Tab') {
			e.preventDefault();
			var start = this.selectionStart;
			var end = this.selectionEnd;

			// set textarea value to: text before caret + tab + text after caret
			this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);

			// put caret at right position again
			this.selectionStart = this.selectionEnd = start + 1;
		}
	});
	
	// add trigger to generate accuracy stats as you go
	codeEntry.addEventListener('keyup', function(e) {
		compareTyping();
	});
	
};

function startTimer() {
	if (clockie == null) clockie = setInterval(updateTimer, 1000);
}

function stopTimer() {
	clearInterval(clockie);
	clockie = null;
}

// update the clock
function updateTimer() {
	totalSeconds++;
	
	currentMinutes = Math.floor(totalSeconds / 60);
	currentSeconds = totalSeconds - (currentMinutes * 60);
	
	displayMinutes = ("00" + currentMinutes).slice(-2);
	displaySeconds = ("00" + currentSeconds).slice(-2);
	
	displayCounter = displayMinutes + ":" + displaySeconds;
	document.getElementById("clock").innerHTML = displayCounter;
}





// compare two strings for similarity
// adapted from https://github.com/aceakash/string-similarity
function compareTwoStrings(first, second) {
	// first = first.replace(/\s+/g, '');
	// second = second.replace(/\s+/g, '');

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

		firstBigrams.set(bigram, count);
	}

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

// decode HTML entities
// adapted from https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it
function decodeHTML(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// compare original and attempted text
function compareTyping() {
	origText = decodeHTML( document.querySelector("#origCode pre").innerText );
	newText = document.getElementById("typeCode").value;
	
	// calculate attempted percentage accurate so far
	origTextSub = origText.substring(0, newText.length);
	comp = Math.round( compareTwoStrings(origTextSub, newText) * 1000 ) / 10;
	if (newText.length == 0) comp = 0;
	document.getElementById("ongoingStat").innerHTML = comp + "%";
	
	// calculate total percentage accurate
	comp = Math.round( compareTwoStrings(origText, newText) * 1000 ) / 10;
	document.getElementById("totalStat").innerHTML = comp + "%";
	
	if (comp == 100) {
		if (!done) {
			stopTimer();
			
			// calculate characters per second
			cps = Math.round(origText.length * 10 / totalSeconds) / 10;
			
			// calculate words per minute
			flatOrigText = origText.replace(/\s+/g,' ').trim();
			splitOrigText = flatOrigText.split(' ');
			wordCount = splitOrigText.length;
			wpm = Math.round( (wordCount / totalSeconds) * 600 ) / 10;
			
			document.getElementById("clock").innerHTML += " / " + wpm + " WPM"; // removed cps: + cps + " CPS" + " / "
			document.getElementById("stats").classList.add("doneColor");
			document.getElementById("typeCode").setAttribute("disabled", true);
			done = true;
		}
	}
}


function loadCode(filename) {
	
		// creating a new XMLHttpRequest object
		ajax = new XMLHttpRequest();

	// provides code to do something in response to the AJAX request
		ajax.onreadystatechange = function() {
			if ((this.readyState == 4) && (this.status == 200)) {
				updateCodeDisplay(this.responseText, filename);
			}
		}
		
		queryURL = "fetch.php?filename=" + filename;
		ajax.open("GET", queryURL, true);

		// initiate request and wait for response
		ajax.send();
}


function updateCodeDisplay(newCode, newFilename) {
	stopTimer();
	totalSeconds = 0;
	document.querySelector("#origFile").innerHTML = newFilename;
	document.querySelector("#origCode pre").innerHTML = newCode;
	document.getElementById("clock").innerHTML = "00:00";
	document.getElementById("ongoingStat").innerHTML = "0%";
	document.getElementById("totalStat").innerHTML = "0%";
	document.getElementById("typeCode").removeAttribute("disabled");
	document.getElementById("typeCode").value = "";
	document.getElementById("stats").classList.remove("doneColor");
	document.getElementById("typeCode").classList.remove("codeWrap");
	document.getElementById("typeCode").setAttribute("placeholder", placeholderText);
	done = false;
	document.getElementById("typeCode").focus();
}
