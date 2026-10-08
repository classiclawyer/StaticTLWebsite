import { imageDimensions } from "../content/images.js";

function prepareImages(html) {
  return html.replace(/<img\b[^>]*>/g, tag => {
    const source = tag.match(/\bsrc="([^"]+)"/)?.[1];
    const dimensions = imageDimensions[source];
    const attributes = [];
    if (dimensions && !/\bwidth=/.test(tag)) attributes.push(`width="${dimensions.width}" height="${dimensions.height}"`);
    if (!/\bdecoding=/.test(tag)) attributes.push('decoding="async"');
    if (/loading="eager"/.test(tag) || /id="detail-main"/.test(tag)) attributes.push('fetchpriority="high"');
    return tag.replace(/\s*\/?>$/, ` ${attributes.join(" ")}>`);
  });
}
export { prepareImages };
