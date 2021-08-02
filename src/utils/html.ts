export interface ParsedHtml {
  (params?: Record<string, number | string>): string,
}

export function html(
  strings: TemplateStringsArray,
  ...tags: string[]
): ParsedHtml {
  return (params) => {
    let str = strings[0];
    if (params) {
      tags.forEach((tag, i) => {
        const param = params[tag];
        if (!param) return void console.warn(`WARNING: missing tag "${tag}"`);
        else str += `${param}${strings[i + 1]}`;
      });
      // for debug - notify extra keys
      const extra = Object
        .keys(params)
        .filter((param) => !tags.includes(param));
      if (extra.length) {
        console.warn(`WARNING: unexpected tag${extra.length > 1 && 's'}: "${extra.join('", "')}"`)
        console.warn({ extra, tags, params });
      }
    } else if (tags.length > 0) {
      console.warn(`WARNING: no tags given. Missing tags: "${tags.join('", "')}"`);
    }
    return str;
  }
}
