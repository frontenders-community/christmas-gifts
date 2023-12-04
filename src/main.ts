import { setupGenerator } from "./generator";
import { hobbies } from "./data";
import "./style.css";

const generateHobbiesChips = () => {
  document.querySelector<HTMLDivElement>("#hobbies")!.innerHTML = hobbies
    .map(
      (hobby: string) => `
    <input
      type="checkbox"
      value="${hobby}"
      name="hobby[]"
      id="${hobby}"
    />
    <label class="checkbox-label" for="${hobby}">${hobby}</label>
    `
    )
    .join("");
};

generateHobbiesChips();
setupGenerator(document.querySelector<HTMLFormElement>("#gift-form")!);
