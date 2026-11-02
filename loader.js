async function loadSketches() {
  const response = await fetch("sketches.json");
  const manifest = await response.text();
  if (!manifest.trim()) return;

  const sketchPaths = JSON.parse(manifest);
  if (sketchPaths.length === 0) return;

  const sketchSelect = document.getElementById("sketch-select");
  const requestedPath = new URLSearchParams(window.location.search).get("sketch");
  const selectedPath = sketchPaths.includes(requestedPath)
    ? requestedPath
    : sketchPaths[0];

  for (const path of sketchPaths) {
    sketchSelect.add(new Option(path, path));
  }
  sketchSelect.value = selectedPath;
  sketchSelect.addEventListener("change", () => {
    const url = new URL(window.location.href);
    url.searchParams.set("sketch", sketchSelect.value);
    window.location.assign(url);
  });

  const previousButton = document.getElementById("previous-sketch");
  const nextButton = document.getElementById("next-sketch");
  previousButton.disabled = sketchSelect.selectedIndex === 0;
  nextButton.disabled = sketchSelect.selectedIndex === sketchPaths.length - 1;

  const sketchScript = document.createElement("script");
  sketchScript.src = selectedPath;
  sketchScript.onload = () => new p5();
  document.body.append(sketchScript);
}

loadSketches();