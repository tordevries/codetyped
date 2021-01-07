<?

// a recursive function that returns a multidimensional array of files/folders in local directory; 
// adapted from user-submitted code on https://www.php.net/manual/en/function.scandir.php
function findAllFiles($dir = "libraries") { 
	$result = array(); // initialize empty array
	$cdir = scandir($dir); // scan submitted directory
	foreach ($cdir as $key => $value) { // look line by line at directory scan
		if ( !in_array( $value, array(".", "..") ) ) {
			 if ( is_dir($dir . DIRECTORY_SEPARATOR . $value) ) $result[$value] = findAllFiles( $dir . DIRECTORY_SEPARATOR . $value );
			 else $result[] = $value;
		}
	}
	return $result;
}


// a recursive function to build a hierarchical <ul> menu of files from the array produced in findAllFiles();
function buildFileMenu($arr = null, $path = "", $depth = 0) {
	if ($depth > 0) $result = "<ul>";
	if (!is_null($arr)) {
		foreach($arr as $key => $value) {
			if ( is_numeric($key) ) {
				$result .=	"<li><a onclick='loadCode(\"" . $path . $value . "\")'>" . $value . "</a></li>\n";
			} else {
				$result .=	"<li class='is" . $key . " hasSub'><a>/" . $key . "</a>";
				$result .= buildFileMenu($value, ($path . $key . DIRECTORY_SEPARATOR), ($depth+1) );
				$result .= 	"</li>\n";
			}
		}
	}
	if ($depth > 0) $result .= "</ul>";
	return $result;
}