import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "public" / "works"

DOWNLOADS = [
    (
        "one-ui-xr.png",
        "https://image-us.samsung.com/us/xr/galaxy-xr/galaxy-xr/images/galaxy-xr-kv.jpg?imbypass=true",
    ),
    (
        "one-ui-8.png",
        "https://image-us.samsung.com/us/smartphones/galaxy-s26-ultra/images/galaxy-s26-ultra-features-kv.jpg?imbypass=true",
    ),
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Referer": "https://www.samsung.com/",
}

for filename, url in DOWNLOADS:
    dest = ROOT / filename
    req = urllib.request.Request(url, headers=headers)
    data = urllib.request.urlopen(req, timeout=30).read()
    dest.write_bytes(data)
    print(f"saved {dest} ({len(data)} bytes)")
