import json
import re
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parent
sketch_folders = sorted(
    (
        folder
        for folder in PROJECT_ROOT.iterdir()
        if folder.is_dir() and re.match(r"^\d+-", folder.name)
    ),
    key=lambda folder: (int(folder.name.split("-", 1)[0]), folder.name),
)
sketch_paths = [
    path.relative_to(PROJECT_ROOT).as_posix()
    for folder in sketch_folders
    for path in sorted(folder.rglob("*.js"))
]

manifest_path = PROJECT_ROOT / "sketches.json"
manifest_path.write_text(
    json.dumps(sketch_paths, indent=2) + "\n",
    encoding="utf-8",
)
print(f"Wrote {len(sketch_paths)} sketches to {manifest_path.name}")