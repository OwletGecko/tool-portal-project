(function () {
  var MIN_ROWS = 2;
  var form = document.getElementById("sp-form");
  var rows = document.getElementById("rows");
  var out = document.getElementById("result");

  function show(message, isError) {
    out.hidden = false;
    out.className = "result" + (isError ? " error" : "");
    out.innerHTML = message;
  }

  function fmt(n) {
    return String(parseFloat(n.toPrecision(6)));
  }

  function renumber() {
    var items = rows.querySelectorAll(".row");
    items.forEach(function (row, idx) {
      row.querySelector("label").firstChild.textContent = "Resistor " + (idx + 1) + " (Ω)";
      row.querySelector(".remove").hidden = items.length <= MIN_ROWS;
    });
  }

  function addRow() {
    var row = document.createElement("div");
    row.className = "row";
    row.innerHTML =
      '<label>R<input type="number" inputmode="decimal" step="any" placeholder="ohms"></label>' +
      '<button class="remove" type="button">Remove</button>';
    row.querySelector(".remove").addEventListener("click", function () {
      row.remove();
      renumber();
    });
    rows.appendChild(row);
    renumber();
  }

  for (var i = 0; i < MIN_ROWS; i++) addRow();

  document.getElementById("add").addEventListener("click", addRow);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var values = [];
    var inputs = rows.querySelectorAll("input");
    for (var k = 0; k < inputs.length; k++) {
      if (inputs[k].value.trim() !== "") values.push(Number(inputs[k].value));
    }

    if (values.some(function (x) { return !isFinite(x); })) {
      return show("Please enter valid numbers.", true);
    }
    if (values.some(function (x) { return x <= 0; })) {
      return show("Each resistance must be greater than zero.", true);
    }
    if (values.length < 2) {
      return show("Please enter at least two resistor values.", true);
    }

    var mode = form.elements.mode.value;
    var total;
    if (mode === "series") {
      total = values.reduce(function (a, b) { return a + b; }, 0);
    } else {
      total = 1 / values.reduce(function (a, b) { return a + 1 / b; }, 0);
    }
    show(
      "<strong>" + (mode === "series" ? "Series" : "Parallel") + " total:</strong> " +
      fmt(total) + " &Omega; <span class=\"muted\">(" + values.length + " resistors)</span>"
    );
  });

  document.getElementById("clear").addEventListener("click", function () {
    rows.innerHTML = "";
    for (var j = 0; j < MIN_ROWS; j++) addRow();
    form.elements.mode.value = "series";
    out.hidden = true;
  });
})();
