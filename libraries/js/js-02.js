function loadCode(filename) {

		// creating a new XMLHttpRequest object
		ajax = new XMLHttpRequest();

		// provides code to do something in response to the AJAX request
		ajax.onreadystatechange = function() {
			if ((this.readyState == 4) && (this.status == 200)) {
				updateCodeDisplay(this.responseText);
			}
		}

		queryURL = "fetch.php?filename=" + filename;
		ajax.open("GET", queryURL, true);

		// initiate request and wait for response
		ajax.send();
}