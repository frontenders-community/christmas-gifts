import { Filters, Gift } from "./types";
import { gifts } from "./data";

export function setupGenerator(element: HTMLFormElement) {
  const getFilters = (): Filters => {
    const data = new FormData(element);
    const filter: Filters = { hobby: [], age: 0, relation: "" };
    for (const [name, value] of data) {
      if (name === "hobby[]") {
        filter.hobby.push(value as string);
      } else {
        filter[name] = value;
      }
    }
    return filter;
  };

  const getFilteredGifts = (filters: Filters): Array<Gift> => {
    return gifts.filter((gift) => {
      return (
        gift.relation.includes(filters.relation) &&
        filters.hobby.includes(gift.hobby) &&
        filters.age >= gift.minAge &&
        (filters.age <= gift.maxAge || gift.maxAge === Infinity)
      );
    });
  };

  const getRandomInteger = (max: number): number => {
    return Math.floor(Math.random() * (max + 1));
  };

  const showGift = (gift: Gift) => {
    document.querySelector<HTMLDivElement>("#result")!.innerHTML = `
      <p>${gift.name}<p>
    `;
  };

  const showError = (errorMessage: string) => {
    document.querySelector<HTMLDivElement>("#result")!.innerHTML = `
      <p>${errorMessage}<p>
    `;
  };

  const generateGift = (event: Event) => {
    event.preventDefault();
    const filters = getFilters();
    const filteredGifst = getFilteredGifts(filters);
    console.log(filteredGifst);

    if (filteredGifst.length > 0) {
      showGift(filteredGifst[getRandomInteger(filteredGifst.length - 1)]);
    } else {
      showError("Nessuna corrispondenza trovata");
    }
  };

  element.addEventListener("submit", generateGift);
}
