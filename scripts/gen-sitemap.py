#!/usr/bin/env python3
"""Generate dist/sitemap.xml from dist/ HTML files (static routes only).

Canonical policy (must match live 200 URLs, not 308 redirect sources):
- Directory indexes: always trailing slash (…/zh/, …/setup/, …).
- Never emit bare /zh (308 → /zh/), /zh/es/, or /zh/ja/.
- EN 404 is /404 (no slash); zh 404 is /zh/404/ — both stay out of the sitemap.
"""
import os
import sys
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
      "/zh/about/": "0.4",
      "/zh/sonic-models/": "0.7", "/zh/gr00t-overview/": "0.7", "/zh/vla-workflow/": "0.7",
      "/zh/teleoperation/": "0.7", "/zh/motion-representation/": "0.6", "/zh/troubleshooting/": "0.7",
      "/zh/installation-deploy/": "0.7", "/zh/new-embodiments/": "0.6",
      "/zh/data-collection/": "0.6", "/zh/sonic-vs-motionbricks/": "0.7",
      "/zh/community-issues/": "0.6", "/zh/verified-setup/": "0.6"}
# New GR00T-stack pages (EN) get explicit priorities too
NEW_EN = {"/sonic-models/": "0.8", "/gr00t-overview/": "0.8", "/vla-workflow/": "0.8",
          "/teleoperation/": "0.8", "/motion-representation/": "0.7", "/troubleshooting/": "0.8",
          "/installation-deploy/": "0.8", "/new-embodiments/": "0.7",
          "/data-collection/": "0.7", "/sonic-vs-motionbricks/": "0.8",
          "/community-issues/": "0.7", "/verified-setup/": "0.7"}

FORBIDDEN = {"/zh", "/zh/es/", "/zh/ja/", "/zh/es", "/zh/ja"}


def canon_loc(path: str) -> str:
    """Normalize to the trailing-slash final URL that returns 200."""
    if path in ("/404", "/404/"):
        raise ValueError(f"404 pages must not enter sitemap: {path}")
    # Always trailing slash — bare /zh becomes /zh/ (the 200 canonical).
    if not path.endswith("/"):
        path = path + "/"
    if path in ("/zh/es/", "/zh/ja/"):
        raise ValueError(f"forbidden sitemap path: {path}")
    return path


urls = []
for dirpath, dirnames, filenames in os.walk(DIST):
    if "index.html" not in filenames:
        continue
    rel = os.path.relpath(dirpath, DIST).replace("\\", "/")
    path = "/" if rel == "." else "/" + rel.strip("/") + "/"
    if path in ("/404/", "/zh/404/"):
        continue
    urls.append(canon_loc(path))

# Guarantee zh home (200 canonical) is present whenever the zh tree exists.
if os.path.isdir(os.path.join(DIST, "zh")) and "/zh/" not in urls:
    urls.append("/zh/")

urls = sorted(set(urls))

bad = [u for u in urls if u in FORBIDDEN or u == "/zh" or u.startswith("/zh/es") or u.startswith("/zh/ja")]
if bad:
    print("ERROR: sitemap would emit redirect/404 URLs:", bad, file=sys.stderr)
    sys.exit(1)
if "/zh/" not in urls and os.path.isdir(os.path.join(DIST, "zh")):
    print("ERROR: missing /zh/ (200 canonical) in sitemap", file=sys.stderr)
    sys.exit(1)

lines = ['<?xml version="1.0" encoding="UTF-8"?>',
         '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for p in urls:
    prio = PRIORITY.get(p) or NEW_EN.get(p) or ZH.get(p) or ("0.5" if p.startswith("/blog/") or p.startswith("/zh/blog/") else "0.4")
    freq = "weekly" if ("/news" in p or "/blog" in p) else "monthly"
    lines.append(f"  <url><loc>{SITE}{p}</loc><lastmod>{TODAY}</lastmod><changefreq>{freq}</changefreq><priority>{prio}</priority></url>")
lines.append("</urlset>\n")

out = os.path.join(DIST, "sitemap.xml")
open(out, "w", encoding="utf-8").write("\n".join(lines))
print(f"sitemap.xml: {len(urls)} URLs -> {out}")
print(f"zh canonical loc: {SITE}/zh/")
