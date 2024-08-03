import axios from "axios";
import { isValidURL } from "./validateURL";

const serverURL = "https://localhost:8000/api";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#url-form input");
  const btn = document.getElementById("submit-button");
  const feedback = document.querySelector(".input-feedback");

  input.addEventListener("change", handleInvalidURL(btn, input, feedback));
});

const handleInvalidURL = (btn, input, feedback) => {
  const isValid = isValidURL(input.value);
  if (input.value.length === 0) {
    feedback.innerHTML = "";
    return;
  }
  btn.disabled = !isValid;
  if (!isValid) {
    feedback.innerHTML = "Please enter a valid URL";
  }
};

const setLoading = (show) => {
  const loader = document.querySelector(".loader");

  loader.style.visibility = show ? "visible" : "hidden";
};

const handleError = (show, msg) => {
  const error = document.querySelector(".error-wrapper");

  error.innerHTML = `<p>${msg}</p>`;
  error.style.display = show ? "block" : "none";
};

const renderResponse = (data) => {
  const results = document.getElementById("results");

  if (!data) {
    handleError(true, "Interal server error");
    return;
  }

  if (data?.error) {
    handleError(true, data.error);
    return;
  }

  results.innerHTML = `
    <p class="result-part">Score: <span>${data.score_tag}</span></p>
    <p class="result-part">Agreement: <span>${data.agreement}</span></p>
    <p class="result-part">Subjectivity: <span>${data.subjectivity}</span></p>
    <p class="result-part">Confidence: <span>${data.confidence}</span></p>
    <p class="result-part">Irony: <span>${data.irony}</span></p>
  `;
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const input = document.querySelector("#url-form input");
  handleError(false, "");
  setLoading(true);
  try {
    const response = await axios.post("http://localhost:8000/", {
      url: input.value,
    });
    renderResponse(response.data);
  } catch (error) {
  } finally {
    setLoading(false);
  }
};

// Function to send data to the server

// Export the handleSubmit function
export { handleSubmit };
