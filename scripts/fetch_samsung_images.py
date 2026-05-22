import re
import urllib.request

PAGES = [
    ("xr", "https://www.samsung.com/us/xr/galaxy-xr/galaxy-xr/"),
    ("s26", "https://www.samsung.com/us/smartphones/galaxy-s26-ultra/"),
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}

pattern = re.compile(r'https://[^"\']+\.(?:jpg|jpeg|png|webp)(?:\?[^"\']*)?', re.I)

for label, page in PAGES:
    print(f"=== {label}: {page}")
    req = urllib.request.Request(page, headers=headers)
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", errors="ignore")
    imgs = pattern.findall(html)
    seen: set[str] = set()
    for img in imgs:
        key = img.lower()
        if any(k in key for k in ("galaxy", "xr", "s26", "image-us", "dam/samsung")):
            if img not in seen:
                seen.add(img)
                print(img)
    print(f"count: {len(seen)}\n")
