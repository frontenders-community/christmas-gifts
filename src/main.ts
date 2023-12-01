import { setupGenerator } from "./generator";
import { hobbies } from "./data";
import "./style.css";

const generateHobbiesChips = () => {
  document.querySelector<HTMLDivElement>("#hobbies")!.innerHTML = hobbies
    .map(
      (hobby: string) => `
    <label for="${hobby}">${hobby}</label>
    <input
      type="checkbox"
      value="${hobby}"
      name="hobby[]"
      id="${hobby}"
    />
    `
    )
    .join("");
};

generateHobbiesChips();
setupGenerator(document.querySelector<HTMLFormElement>("#gift-form")!);
