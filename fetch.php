<?

$f = $_GET["filename"];

if (stristr($f, "..")) die(); // any attempts to traverse the folder directory are denied

echo htmlspecialchars( file_get_contents("libraries/$f") );