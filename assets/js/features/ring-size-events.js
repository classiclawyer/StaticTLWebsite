

function bindRingSizeEvents() {
  const sizeDialog = document.getElementById("ring-size-dialog");
  const closeSizeGuide = () => {
    if (!sizeDialog?.open || sizeDialog.classList.contains("is-closing")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sizeDialog.close();
      return;
    }
    sizeDialog.classList.add("is-closing");
    setTimeout(() => {
      sizeDialog.close();
      sizeDialog.classList.remove("is-closing");
    }, 160);
  };
  document.querySelectorAll("[data-size-guide]").forEach((button) => {
    button.onclick = () => sizeDialog?.showModal();
  });
  document.querySelectorAll("[data-close-size-guide]").forEach((button) => {
    button.onclick = closeSizeGuide;
  });
  if (sizeDialog) {
    sizeDialog.oncancel = (event) => {
      event.preventDefault();
      closeSizeGuide();
    };
    sizeDialog.onclick = (event) => {
      const rect = sizeDialog.getBoundingClientRect();
      if (event.target === sizeDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeSizeGuide();
    };
  }

}

export { bindRingSizeEvents };
