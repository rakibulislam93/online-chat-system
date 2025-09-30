const textarea = document.getElementById("messageBox");

textarea.addEventListener("input", () => {
  // Auto height
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";

  // Max height for textarea
  const maxHeight = 120; // px
  if (textarea.scrollHeight > maxHeight) {
    textarea.style.height = maxHeight + "px";
    textarea.style.overflowY = "auto";
  } else {
    textarea.style.overflowY = "hidden";
  }

  // Rounded change
  if (textarea.scrollHeight > 40) {
    // যদি দুই লাইন বা বেশি হয়
    textarea.classList.remove("rounded-full");
    textarea.classList.add("rounded-md");
  } else {
    textarea.classList.remove("rounded-md");
    textarea.classList.add("rounded-full");
  }
});

// user can sent value using enter button
textarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    getChatInputValue()
  }

});
