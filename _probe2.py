import io, re

for f, name in [("dist/about/index.html", "about"), ("dist/ja/index.html", "ja"), ("dist/setup/index.html", "setup")]:
    h = io.open(f, encoding="utf-8").read()
    print(f"===== {name} =====")
    for m in re.finditer(r"(?<![0-9,])5,?000\s*FPS|(?<![0-9,])5000\s*FPS", h):
        ctx = h[max(0, m.start()-200):m.end()+80].replace("\n", " ")
        print("  5K ctx:", ctx[:220])
    if name == "setup":
        for m in re.finditer(r"git lfs pull[^<\n]{0,60}", h):
            print("  LFS line:", repr(m.group(0)[:80]))
        print("  &quot; count:", h.count("&quot;"), "| raw quote in lfs:", 'lfs pull --include="motionbricks/out' in h)
