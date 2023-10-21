const maxScreenWidth = 1920;
const topPadding = 160;
const botPadding = 91;
const LRpaddings = 48;
const cardMinWidth = 255;
const cardHeight = 88;
const cardGap = 10;

/**
 * Only for Desctop
 * @returns number of cards
 */
export default function getVolumeOfCards() {
  const currentWidth = Math.min(window.innerWidth, maxScreenWidth) - LRpaddings;
  const totalHeight = window.innerHeight - cardGap - topPadding - botPadding;

  const maxCardsH = Math.floor(totalHeight / (cardHeight + cardGap));
  //console.log("maxCardsH", totalHeight / (cardHeight + cardGap), maxCardsH);

  const preCardsW = Math.floor(currentWidth / cardMinWidth);
  const calcWidth = preCardsW * cardMinWidth + (preCardsW - 1) * cardGap;

  const maxCardsW = calcWidth <= currentWidth ? preCardsW : preCardsW - 1;
  //console.log("calcWidth", calcWidth, "currentWidth", currentWidth);
  //console.log("maxCardsW", currentWidth / cardMinWidth, maxCardsW);

  const maxCardsNumber = maxCardsH * maxCardsW;
  //console.log("totalHeight", totalHeight, "currentWidth", currentWidth);
  return maxCardsNumber;
}
