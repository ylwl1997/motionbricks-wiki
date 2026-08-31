#!/usr/bin/env python3
"""Generate public/sitemap.xml from dist/ HTML files (static routes only)."""
import os
from datetime import date

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DIST = os.path.join(ROOT, "dist")
SITE = "https://motionbricks.wiki"
TODAY = date.today().isoformat()

PRIORITY = {
    "/": "1.0", "/setup/": "0.9", "/nvidia/": "0.9", "/ue5/": "0.8",
    "/unity/": "0.8", "/g1-demo/": "0.8", "/architecture/": "0.7",
    "/training/": "0.7", "/styles/": "0.7", "/assets/": "0.6",
    "/gr00t-sonic/": "0.6", "/news/": "0.6", "/community/": "0.5",
    "/about/": "0.5", "/es/": "0.6", "/ja/": "0.6",
}
# Chinese mirrors get a slightly lower priority than the EN original.
ZH = {"/zh/": "0.9", "/zh/setup/": "0.8", "/zh/ue5/": "0.7", "/zh/unity/": "0.7",
      "/zh/g1-demo/": "0.7", "/zh/architecture/": "0.6", "/zh/training/": "0.6",
      "/zh/styles/": "0.6", "/zh/nvidia/": "0.7", "/zh/assets/": "0.5",
      "/zh/gr00t-sonic/": "0.5", "/zh/news/": "0.5", "/zh/community/": "0.4",
      "/zh/about/": "0.4"}

urls = []
for dirpath, dirnames, filenames in os.walk(DIST):
    if "index.html" not in filenames:
        continue
    rel = os.path.relpath(dirpath, DIST).replace("\\", "/")
    path = "/" if rel == "." else "/" + rel.strip("/") + "/"
    if path == "/404/":
        continue
    urls.append(path)
urls.sort()

lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for p in urls:
    prio = PRIORITY.get(p) or ZH.get(p) or ("0.5" if p.startswith("/blog/") or p.startswith("/zh/blog/") else "0.4")
    freq = "weekly" if ("/news" in p or "/blog" in p) else "monthly"
    lines.append(f"  <url><loc>{SITE}{p}</loc><lastmod>{TODAY}</lastmod><changefreq>{freq}</changefreq><priority>{prio}</priority></url>")
lines.append("</urlset>\n")

out = os.path.join(DIST, "sitemap.xml")
open(out, "w", encoding="utf-8").write("\n".join(lines))
print(f"sitemap.xml: {len(urls)} URLs -> {out}")
