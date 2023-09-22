import isValidUrl from "@/utils/isValidUrl";

export default function getFavicon(url: string) {
  const isUrlValid = isValidUrl(url);
  console.log(isUrlValid);
  let domain;
  if (isUrlValid) {
    domain = new URL(url).hostname;
  } else {
    domain = "webmarks-visualect.vercel.app";
  }
  const iconUrl = `https://icon.horse/icon/${domain}`;
  return iconUrl;
}
