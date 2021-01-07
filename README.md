# codetyped
A simple web tool to help beginner coders practice typing code with accuracy by copying code snippets.

Code snippets are organized in the /libraries folder and read from there dynamically. You can add/organize your own snippets by making new folders and populating them with readable files.

The library/registry.php file allows you to customize the menu sequence. Individual code snippet folders can optionally have their own registry.php files populated with menu label adjustments.

Near-term goals:
- A lot more code snippets for practice
- Better management of the snippet file menu structure and labels
- Sequencing: an option to run through all of the code snippets of a type
- Better UI, especially around the stats
- Synchronized scrolling between the panels

Long-range ideas:
- Probably ought to use contentEditable instead of textarea
- Add user accounts with database support for tracking progress over time
- Custom sequencing with shareable links for quizzes/challenges
- Badges and leaderboards for achievements
- Include method to indicate text snippets that should be word-wrapped, not just preformatted code
- Code formatting options — e.g. are indents 1 tab or 2 spaces?
- Rotate display for horizontal panels instead of vertical
- Code syntax coloring?
