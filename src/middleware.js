import { NextResponse } from "next/server";

const idToSlugMap = {
  1: "fjallraven---foldsack-no-1-backpack-fits-15-laptops",
  2: "mens-casual-premium-slim-fit-t-shirts-",
  3: "mens-cotton-jacket",
  4: "mens-casual-slim-fit",
  5: "john-hardy-womens-legends-naga-gold-silver-dragon-station-chain-bracelet",
  6: "solid-gold-petite-micropave-",
  7: "white-gold-plated-princess",
  8: "pierced-owl-rose-gold-plated-stainless-steel-double",
  9: "wd-2tb-elements-portable-external-hard-drive---usb-30-",
  10: "sandisk-ssd-plus-1tb-internal-ssd---sata-iii-6-gbs",
  11: "silicon-power-256gb-ssd-3d-nand-a55-slc-cache-performance-boost-sata-iii-25",
  12: "wd-4tb-gaming-drive-works-with-playstation-4-portable-external-hard-drive",
  13: "acer-sb220q-bi-215-inches-full-hd-1920-x-1080-ips-ultra-thin",
  14: "samsung-49-inch-chg90-144hz-curved-gaming-monitor-lc49hg90dmnxza-super-ultrawide-screen-qled-",
  15: "biylaclesen-womens-3-in-1-snowboard-jacket-winter-coats",
  16: "lock-and-love-womens-removable-hooded-faux-leather-moto-biker-jacket",
  17: "rain-jacket-women-windbreaker-striped-climbing-raincoats",
  18: "mbj-womens-solid-short-sleeve-boat-neck-v-",
  19: "opna-womens-short-sleeve-moisture",
  20: "danvouy-womens-t-shirt-casual-cotton-short",
};

export function middleware(req) {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/products/")) {
    const id = pathname.split("/")[2];

    const slug = idToSlugMap[id];
    if (slug) {
      url.pathname = `/products/${slug}`;
      return NextResponse.redirect(url);
    }
  }
}
