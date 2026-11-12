// The map on the home page. The diagram itself is plain SVG in index.html and
// works without this file (each node is a link); the script only adds hover
// notes and the travelling "events". Nothing else on the site needs JavaScript.
(() => {
  const svg = document.getElementById("map");
  if (!svg) return;

  const NS = "http://www.w3.org/2000/svg";
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const note = document.getElementById("map-note");
  const hint = note.innerHTML;
  const pulseLayer = svg.querySelector("#map-pulses");

  const nodes = new Map(
    [...svg.querySelectorAll(".node")].map((g) => [g.dataset.id, g]),
  );
  const edges = [...svg.querySelectorAll(".edge")].map((path) => ({
    path,
    from: path.dataset.from,
    to: path.dataset.to,
    length: path.getTotalLength(),
  }));

  // Everything reachable from a node, following the arrows.
  const downstream = (id) => {
    const seenNodes = new Set([id]);
    const seenEdges = new Set();
    const queue = [id];
    while (queue.length) {
      const current = queue.shift();
      for (const edge of edges) {
        if (edge.from !== current) continue;
        seenEdges.add(edge);
        if (!seenNodes.has(edge.to)) {
          seenNodes.add(edge.to);
          queue.push(edge.to);
        }
      }
    }
    return [seenNodes, seenEdges];
  };

  const highlight = (id) => {
    const [litNodes, litEdges] = id ? downstream(id) : [new Set(), new Set()];
    nodes.forEach((g, key) => g.classList.toggle("lit", litNodes.has(key)));
    edges.forEach((e) => e.path.classList.toggle("lit", litEdges.has(e)));
    if (id) note.textContent = nodes.get(id).dataset.note;
    else note.innerHTML = hint;
  };

  // An event leaves a node along every outgoing edge, then carries on.
  const pulses = [];
  const send = (id, hops = 0) => {
    if (still || hops > 6 || pulses.length > 40) return;
    for (const edge of edges) {
      if (edge.from !== id) continue;
      const dot = document.createElementNS(NS, "circle");
      const start = edge.path.getPointAtLength(0);
      dot.setAttribute("class", "pulse");
      dot.setAttribute("r", 4.2);
      dot.setAttribute("cx", start.x);
      dot.setAttribute("cy", start.y);
      pulseLayer.appendChild(dot);
      pulses.push({ edge, dot, hops, t: 0 });
    }
  };

  let last = performance.now();
  const frame = (now) => {
    const dt = Math.min(now - last, 50);
    last = now;
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += (dt * 0.19) / p.edge.length; // ~190 SVG units per second
      if (p.t >= 1) {
        p.dot.remove();
        pulses.splice(i, 1);
        send(p.edge.to, p.hops + 1);
        continue;
      }
      const at = p.edge.path.getPointAtLength(p.t * p.edge.length);
      p.dot.setAttribute("cx", at.x);
      p.dot.setAttribute("cy", at.y);
    }
    requestAnimationFrame(frame);
  };

  // Nodes are plain links to the matching work, so clicking needs no script.
  // Hovering or focusing one lights its downstream path and sends an event.
  nodes.forEach((g, id) => {
    const enter = () => {
      highlight(id);
      send(id);
    };
    g.addEventListener("pointerenter", enter);
    g.addEventListener("pointerleave", () => highlight(null));
    g.addEventListener("focus", enter);
    g.addEventListener("blur", () => highlight(null));
  });

  if (!still) {
    requestAnimationFrame(frame);
    const sources = ["intent", "code", "events"];
    let turn = 0;
    const drip = () => {
      if (!document.hidden) send(sources[turn++ % sources.length]);
    };
    setTimeout(drip, 700);
    setInterval(drip, 2800);
  }
})();
