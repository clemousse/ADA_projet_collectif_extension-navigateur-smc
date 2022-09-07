let spectacles = document.getElementById("evenements");

spectacles.addEventListener("click", async () => {
  chrome.tabs.create({
    active: true,
    url: "evenements.html",
  });
});
