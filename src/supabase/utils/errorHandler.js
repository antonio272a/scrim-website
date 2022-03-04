const errorClasses = ["border", "border-danger", "border-3"];

const makeErrorBorder = (element) => {
  errorClasses.forEach((cl) => {
    element.classList.add(cl);
  });
};

export const resetErrors = () => {
  const nameElement = document.getElementById("team-name");
  const nameErrorSpan = document.getElementById("name-duplicate-error");
  const acronymElement = document.getElementById("team-acronym");
  const acronymErrorSpan = document.getElementById("acronym-duplicate-error");
  [nameElement, acronymElement].forEach((el) => {
    errorClasses.forEach((cl) => {
      el.classList.remove(cl);
    });
  });

  [nameErrorSpan, acronymErrorSpan].forEach((span) => {
    span.style.display = "none";
  });
};

export const handleDuplicateError = (error) => {
  const { message } = error;
  const isName = message.indexOf("name_key") > 0;
  const errorSpanId = isName
    ? "name-duplicate-error"
    : "acronym-duplicate-error";
  const inputId = isName ? "team-name" : "team-acronym";
  const errorSpan = document.getElementById(errorSpanId);
  const inputElement = document.getElementById(inputId);
  makeErrorBorder(inputElement);
  errorSpan.style.display = "inline";
};