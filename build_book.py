
from pathlib import Path
from html import escape
import re

website = Path.home() / "THE-BOOK-OF-ZEE"
chapters_folder = website / "THE-UNSEEN"
page_file = website / "unseen.html"

chapter_html = []

for number in range(1, 11):
    filename = chapters_folder / f"Chapter-{number:02d}.txt"

    text = filename.read_text(encoding="utf-8")
    lines = [line.strip() for line in text.splitlines()]

    lines = [
        line for line in lines
        if line and line != "THE UNSEEN"
        and line != "By John Timbenao"
    ]

    heading = f"Chapter {number}"
    if lines and lines[0].startswith(heading):
        chapter_title = lines.pop(0)
    else:
        chapter_title = heading

    chapter_html.append(
        f"<h3>{escape(chapter_title)}</h3>"
    )

    paragraph = []

    for line in lines:
        paragraph.append(line)

    if paragraph:
        story = "\n".join(paragraph)
        chapter_html.append(
            f"<p>{escape(story)}</p>"
        )

new_section = (
    '<section id="reading">\n'
    '<h2>THE STORY</h2>\n'
    + "\n".join(chapter_html)
    + "\n</section>"
)

html = page_file.read_text(encoding="utf-8")

html = re.sub(
    r'<section id="reading">.*?</section>',
    lambda match: new_section,
    html,
    count=1,
    flags=re.DOTALL
)

page_file.write_text(html, encoding="utf-8")

print("SUCCESS! All 10 chapters have been added to THE UNSEEN.")

