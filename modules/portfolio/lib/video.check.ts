// Self-check for getYouTubeId. Run: npx tsx modules/portfolio/lib/video.check.ts
import assert from "node:assert/strict";
import { getYouTubeId } from "./video";

const id = "30pGhGDbKdo";
assert.equal(getYouTubeId(`https://youtu.be/${id}`), id);
assert.equal(getYouTubeId(`https://youtu.be/${id}?si=abc`), id);
assert.equal(getYouTubeId(`https://www.youtube.com/watch?v=${id}&t=10`), id);
assert.equal(getYouTubeId(`https://m.youtube.com/watch?v=${id}`), id);
assert.equal(getYouTubeId(`https://www.youtube.com/embed/${id}`), id);
assert.equal(getYouTubeId(`https://youtube.com/shorts/${id}`), id);
assert.equal(getYouTubeId("https://vimeo.com/123"), null);
assert.equal(getYouTubeId("not a url"), null);
console.log("getYouTubeId: ok");
