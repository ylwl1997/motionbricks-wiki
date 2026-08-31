import io, re

h = io.open("dist/setup/index.html", encoding="utf-8").read()
print("exclude='' present:", '--exclude=""' in h or "--exclude=&quot;&quot;" in h)
# every lfs pull line
for m in re.finditer(r"git lfs pull[^<\n]{0,80}", h):
    print("  LFS:", m.group(0)[:90])

h2 = io.open("dist/index.html", encoding="utf-8").read()
print("\nindex '5,000 FPS' contexts:")
for m in re.finditer(r"5,000 FPS", h2):
    ctx = h2[max(0, m.start()-160):m.end()+60].replace("\n", " ")
    print("  ...", ctx[:180])

h3 = io.open("dist/nvidia/index.html", encoding="utf-8").read()
print("\nnvidia '5,000 FPS' contexts:")
for m in re.finditer(r"5,000 FPS", h3):
    ctx = h3[max(0, m.start()-160):m.end()+60].replace("\n", " ")
    print("  ...", ctx[:180])
