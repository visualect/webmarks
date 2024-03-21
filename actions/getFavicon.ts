// TODO: Make my own implementation for getFavicon function

export default function getFavicon(url: string) {
  try {
    let domain = new URL(url).hostname;
    const iconUrl = `https://icon.horse/icon/${domain}`;
    return iconUrl;
  } catch (err) {
    return "/images/temp-favicon.png";
  }
}
