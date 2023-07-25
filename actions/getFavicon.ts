export default function getFavicon(url: string) {
  const domain = new URL(url).hostname;
  const iconUrl = `https://icon.horse/icon/${domain}`;
  return iconUrl;
}
