Coding for the website
===
##What's what
####Headers
All the pages must include the cbe header. The main page also has a rotating image header
####Top menu
The top menu is for navigating between areas of the site.
####Left side
The left area is for navigating within an area of a website; For instance, clicking on the topmenu link to "Departments"
would take you to the main Departments page, then you would be able to navigate different sections/courses using the
left menu. You would return to the main Departments page by clicking the top menu item, which sould be orange.
This area will be different for each area of the website,and will follow a template

The left area also includes the rss feed
####Main area
The content area is for content. if you are loading a pdf document use the pdf importer outlined in the
pdf-import-template.html.
####Right side
The right area is for external links. i.e. links to the main cbe website, d2l, homelogic, etc. There will also be a link
to the crisis help page and links to social media. ALL EXTERNAL LINKS GO HERE OR IN CONTENT, NOT IN THE OTHER MENUS.
(if you must put them somewhere else, mark them with the label “(External)”
####Footer
The footer is for the short copyright info, with a link to the full explanation, along with the cbe slogan.
##Modifying the website
When making a commit, the commit message should be brief but informative. Github reccommends less than 50 characters, any more than 80 and the message will be cut off. If more information is neccesary, running `git commit` without `-m` will open a text editor where the first line is the main message, and all subsequent lines are the extended description.  
For example:  
`Completed minor fixes for issue #42. Refactored files for fees and transit to their own folder in response to issue #52.` is too long. (on a side note, this should have been two commits, one for #42 and one for #52)  
On the other hand:  
`Fixed issue #29` is too short; It doesnt say what was actually changed.  
`Updared registration guide, issue #20`, despite the spelling mistake, is an example of a good commit message, both referencing the issue and giving a brief description of what actually happened.

When you drastically change a file, you can add your name to the copyright header of that file
##Standard colors
The standard orange is #f28726; the standard dark grey is #666, the standars cyan is #00adda.

##More
If you have any questions, feel free to post an issue with the 'question' label


More info and guidelines can be found on the wiki

