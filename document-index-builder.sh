#!/bin/bash

## Start of the html
HTML="<!DOCTYPE html> <!-- This has to come before any comments (or anything else). Otherwise it kills IE -->
<!-- Copyright 2013 Tauran Wood -->

<!--  This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
    
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
-->

<!-- For info about changing the website (fixing bugs, etc.) see https://github.com/thirstyice/abe-site -->

<html>
	<head>
		<meta charset=\"UTF-8\"/>
		<title>Document Index</title>
		<link rel=\"stylesheet\" type=\"text/css\" href=\"/b829/aberhart/universal/main.css\"/>
		<script src=\"/b829/aberhart/universal/jquery-1.11.0.min.js\"></script>
		<script src=\"/b829/aberhart/universal/js-cookie.js\"></script>
		<script src=\"/b829/aberhart/universal/menu-importer.js\"></script>
	</head>
	<body>
		<div id=\"border\">
			<div id=\"cbe-header\"></div>
			<div id=\"topmenu-import\"></div>
			<div id=\"content\">
				<h2>Alphabetical Index of Documents</h2>"
## Get a list of all pdf files
FILES=$(find . | grep \\.pdf)
FILES=${FILES//' '/}
## Get a list of all top-level folders
FOLDERS=$(find b829 -type d -mindepth 2 -maxdepth 2)
## Map folders to array
arr=$(echo $FOLDERS | tr " " "\n")
## For each folder, do
for x in $arr
do
	## Get folder name
	FOLDERNAME=${x//b829\/aberhart\//}
	## If folder contains pdf files
	if [[ $(echo "$FILES" | grep $x) != "" ]]; then
	## Add folder header to html
	HTML="$HTML
				<h3>$FOLDERNAME</h3>"
	## Get subfolders
	SUBFOLDERS=$(find $x -type d -mindepth 1 -maxdepth 1 | tr "\n" "\n")
	## For each subfolder, do
	for z in $SUBFOLDERS
	do
		## If subfolder contains pdf files
		if [[ $(echo "$FILES" | grep $z) != "" ]]; then
			## Get files in folder
			PDFS=$(echo "$FILES" | grep $z | tr "\n" "\n")
			## Add subfolder header to html and open the ul
			HTML="$HTML
				<h4>${z//b829\/aberhart\//}</h4>
				<ul>"
			## For each individual pdf file
			for y in $PDFS
			do
				## Add link to pdf as a list element
				NAME=${y//.*\//}
				HTML="$HTML
					${y//\.\/b829/<li><a href=\"/b829}\">$NAME</a></li>"
			done
			## Close the ul
			HTML="$HTML
				</ul>"
		fi
		done
	fi
done
## Finish the html
HTML="$HTML
			</div>
			<div id=\"leftside\">
				<div id=\"areamenu\"></div>
			</div>
			<div id=\"rightside\"></div>
			<div id=\"footers\"></div>
		</div>
	</body>
</html>"
## Write to file
echo "$HTML">document-index.html
## Done!
