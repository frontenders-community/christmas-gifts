import { Filters, Gift } from "./types";
import { gifts } from "./data";

export function setupGenerator(element: HTMLFormElement) {
  const lid = document.querySelector<HTMLImageElement>(".lid")!;
  const resultDiv = document.querySelector<HTMLDivElement>("#result")!;
  const errorDiv = document.querySelector<HTMLDivElement>("#error")!;

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
    lid.classList.add("move");
    document
      .querySelector<HTMLDivElement>(".gift-box")!
      .addEventListener("click", function () {
        resultDiv!.innerHTML = `<p>
        ${gift.name}</p>
      `;
        lid.classList.remove("move");
        lid.classList.add("open");
        resultDiv!.classList.remove("hidden");
      });
  };

  const showError = (errorMessage: string) => {
    errorDiv.innerHTML = errorMessage;
    errorDiv.classList.remove("hidden");
  };

  const generateGift = (event: Event) => {
    lid.classList.remove("open");
    resultDiv.classList.add("hidden");
    resultDiv.innerHTML = "";
    errorDiv.classList.add("hidden");
    errorDiv.innerHTML = "";

    event.preventDefault();
    const filters = getFilters();
    const filteredGifst = getFilteredGifts(filters);

    if (filteredGifst.length > 0) {
      showGift(filteredGifst[getRandomInteger(filteredGifst.length - 1)]);
    } else {
      showError("Nessuna corrispondenza trovata");
    }
  };

  element.addEventListener("submit", generateGift);
}
