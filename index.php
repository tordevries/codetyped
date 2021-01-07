<?

/* 
Codetyped v0.1 
*/

require "libraries/registry.php";
require "functions.php";

$filemenu = buildFileMenu( matchSequence( findAllFiles() ) );

?><!DOCTYPE html>
<html>
<head>

<!-- meta tags and title -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>codetyped</title>

<!-- external and internal CSS -->
<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="codetyped-styles.css" media="all">

<!-- external and internal JavaScript -->
<script src="codetyped-scripts.js" defer></script>

</head>
<body>
	
	<div id="nav">
		<ul>
			<li><a href="."><b>codetyped</b></a></li>
			<?= $filemenu; ?>
		</ul>
		<a id="aboutLink" href="https://tordevries.github.io/codetyped/">about</a>
	</div>

	<div id="origCode"><pre>Select code from the menu above.</pre></div>

	<div id="newCode">
		<textarea id="typeCode" placeholder="In this panel, retype the code you see in the left panel. Precisely match the spelling, capitalization, line breaks, spaces, tabbed indents, and specific character formatting.

Depending on the code, you may have to scroll vertically or horizontally to see the entire text.

The timer (below) will start when you begin typing. As you type, accuracy stats will be shown below. Once you have retyped all of the code shown with 100% accuracy, the text box will be locked and your words per minute (WPM) stat will be shown.

Codetyped v0.1 by Tor de Vries (tor.devries@wsu.edu)."></textarea>

		<div id="stats">
			<b>TIME:</b> <span id="clock">00:00</span>
			<span id="statPercentages">
				<b>ACCURACY:</b>
				<b>Ongoing:</b> <span class="stat" id="ongoingStat">0%</span> / 
				<b>Total:</b> <span class="stat" id="totalStat">0%</span>
			</span>
		</div>
	</div>
	
	<div id="origStats"><b>FILE:</b> <span id="origFile"></span></div>

</body>
</html>

