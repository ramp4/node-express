document.querySelectorAll(".card-price").forEach(node => {
  console.log(node);
  node.textContent = new Intl.NumberFormat("ru-RU", {
    currency: "rub",
    style: "currency"
  }).format(node.textContent);
});
