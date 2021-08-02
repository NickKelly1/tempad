import { Page } from "../types";

const closing: Set<string> = new Set();
const open: Set<string> = new Set();

export const pageController = {
  /**
   * Open a page
   *
   * @param page
   * @param args
   * @returns
   */
  async open<P extends Page<unknown, unknown>>(page: P, ...args: Parameters<P['open']>) {
    console.log(`Opening page "${page.id}"...`);
    if (closing.has(page.id)) {
      console.warn(`WARNING: cannot open: page is closing: "${page.id}"`)
    }
    if (open.has(page.id)) {
      console.warn(`WARNING cannot open: page is already open: "${page.id}"`);
      return;
    }
    open.add(page.id);
    await page.open.apply(null, args);
    console.log(`...Finished opening page "${page.id}"`);
  },

  /**
   * Close a page
   *
   * @param page
   * @param args
   * @returns
   */
  async close<P extends Page<any, any>>(page: P, ...args: Parameters<P['close']>) {
    console.log(`Closing page "${page.id}"...`);
    if (closing.has(page.id)) {
      // already closing
      console.warn(`WARNING: cannot close: page is already closing: "${page.id}"`);
      return;
    }
    if (!open.has(page.id)) {
      // not open
      console.warn(`WARNING: cannot close: page is not open: "${page.id}"`);
      return;
    }
    closing.add(page.id);
    await page.close.apply(null, args);
    open.delete(page.id);
    closing.delete(page.id);
    console.log(`...Finished closing page "${page.id}"`);
  },
};
