(function () {
  class ImageSlot extends HTMLElement {
    connectedCallback() {
      const placeholder = this.getAttribute("placeholder") || "O";
      const shape = this.getAttribute("shape") || "circle";
      const radius = this.getAttribute("radius") || "16";

      this.style.display = this.style.display || "grid";
      this.style.placeItems = "center";
      this.style.overflow = "hidden";
      this.style.background = "var(--accent)";
      this.style.color = "var(--bg)";
      this.style.fontFamily = "\"Instrument Serif\", serif";
      this.style.fontStyle = "italic";
      this.style.fontSize = shape === "circle" ? "18px" : "22px";
      this.style.borderRadius = shape === "circle" ? "999px" : `${radius}px`;

      if (!this.textContent.trim()) {
        this.textContent = placeholder.length <= 3 ? placeholder : "O";
      }
    }
  }

  if (!customElements.get("image-slot")) {
    customElements.define("image-slot", ImageSlot);
  }
})();
