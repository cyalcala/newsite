from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import shutil

root = Path(__file__).resolve().parents[1]
source = root / 'src/pages.cjs'
text = source.read_text(encoding='utf-8')
text = text.replace("'01 / WEB &amp; PRODUCT','A better starting point", "'01 / VA FREELANCE HUB','A better starting point")
text = text.replace("${textlink('/services/#websites','Build something with me')}</div>", "${textlink('/services/#websites','Build something with me')}${textlink('/work/','Explore related work')}</div>")
text = text.replace("image('/showreel-poster.webp','A frame from Cyrus’s AI video showreel')", "image('/use-04.webp','AI-generated beverage advertising concept with citrus and water')")
text = text.replace("'/work/video/','/showreel-poster.webp','AI video showreel poster'", "'/work/video/','/use-04.webp','AI-generated beverage advertising concept'")
source.write_text(text, encoding='utf-8')

# Consolidate identical font subset definitions, preserving variable weight ranges.
import re
fontfile=root/'src/fonts.css'
seen=set(); rules=[]
for match in re.finditer(r'@font-face\s*\{[^}]+\}',fontfile.read_text(encoding='utf-8')):
    rule=match.group()
    key=re.search(r'src:\s*([^;]+)',rule).group(1)
    if key in seen: continue
    seen.add(key)
    rule=re.sub(r'font-weight:\s*[^;]+;', 'font-weight: 100 900;',rule)
    rules.append(rule)
fontfile.write_text('\n'.join(rules),encoding='utf-8')

# A share card built from the supplied portrait and the website's real identity.
card = Image.new('RGB', (1200,630), '#f7f3ec')
d = ImageDraw.Draw(card)
fontdir = Path('C:/Windows/Fonts')
display = ImageFont.truetype(str(fontdir/'georgia.ttf'),72)
body = ImageFont.truetype(str(fontdir/'arial.ttf'),24)
label = ImageFont.truetype(str(fontdir/'arialbd.ttf'),20)
d.text((64,50),'CYRUS ALCALA',font=label,fill='#1c1917')
d.line((64,105,1136,105),fill='#c9c1b4',width=2)
d.text((60,165),'Websites with',font=display,fill='#1c1917')
d.text((60,252),'something to say.',font=display,fill='#1c1917')
d.text((64,410),'Websites · Content · Practical AI',font=body,fill='#645b4f')
d.text((64,525),'cyrusalcala.com',font=label,fill='#3f43ea')
portrait = Image.open(root/'assets/headshot-dark.webp').convert('RGB')
from PIL import ImageOps
portrait = ImageOps.fit(portrait,(240,330),centering=(.5,.25))
card.paste(portrait,(896,165))
card.save(root/'build/assets/social-card.png',optimize=True)

# Preserve inputs and remove only redundant task-generated extraction images.
archive = root/'docs/overhaul/archive'
archive.mkdir(parents=True,exist_ok=True)
shutil.copy2('C:/Users/admin/.codex/attachments/629fd72a-114d-46af-a92c-6be054eb623e/pasted-text.txt',archive/'user-brief.txt')
shutil.copy2('C:/Users/admin/Downloads/designloop.pdf',archive/'designloop.pdf')
for n in range(4):
    p=root/f'designloop-page-{n}.png'
    if p.exists():p.unlink()
print('Share card, source archive and flagship label ready.')
