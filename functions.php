<?

$labels = array();

// a recursive function that returns a multidimensional array of files/folders in local directory; 
// adapted from user-submitted code on https://www.php.net/manual/en/function.scandir.php
function findAllFiles($dir = "libraries") { 
	global $labels;
	$result = array(); // initialize empty array
	$cdir = scandir($dir); // scan submitted directory
	foreach ($cdir as $key => $value) { // look line by line at directory scan
		if ( !in_array( $value, array(".", "..", "registry.php") ) ) {
			 if ( is_dir($dir . DIRECTORY_SEPARATOR . $value) ) {
				 $path = $dir . DIRECTORY_SEPARATOR . $value;
				 if ( file_exists("$path/registry.php") ) include "$path/registry.php";
				 $result[$value] = findAllFiles($path);
			 } else $result[] = $value;
		}
	}
	return $result;
}


// a recursive function to build a hierarchical <ul> menu of files from the array produced in findAllFiles();
function buildFileMenu($arr = null, $path = "", $depth = 0) {
	$result = "";
	if ($depth > 0) $result = "<ul>";
	if (!is_null($arr)) {
		foreach($arr as $key => $value) {
			if ( is_numeric($key) ) {
				$result .=	"<li><a onclick='loadCode(\"" . $path . $value . "\")'>" . menuLabel($value) . "</a></li>\n";
			} else {
				$result .=	"<li class='is" . $key . " hasSub'><a>/" . menuLabel($key) . "</a>";
				$result .= buildFileMenu($value, ($path . $key . DIRECTORY_SEPARATOR), ($depth+1) );
				$result .= 	"</li>\n";
			}
		}
	}
	if ($depth > 0) $result .= "</ul>";
	return $result;
}


// given an array from findAllFiles, match the sequence found in libraries/registry.php
function matchSequence($arr) {
	global $menuSequence, $mergeRemainder;
	$newArr = [];
	foreach ($menuSequence as $s) {
		$newArr[$s] = $arr[$s];
		unset($arr[$s]);
	}
	if ($mergeRemainder) return array_merge($newArr, $arr);
	else return $newArr;
}


// return custom menu label, if any, from libraries/registry.php
function menuLabel($item) {
	global $labels;
	if ($labels[$item]) 
		return $labels[$item];
	else return $item;
}
