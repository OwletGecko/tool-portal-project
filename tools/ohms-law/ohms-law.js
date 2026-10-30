(function () {
  var form = document.getElementById("ohms-form");
  var out = document.getElementById("result");
  var fields = {
    voltage: document.getElementById("voltage"),
    current: document.getElementById("current"),
    resistance: document.getElementById("resistance")
  };

  function show(message, isError) {
    out.hidden = false;
    out.className = "result" + (isError ? " error" : "");
    out.innerHTML = message;
  }

  function fmt(n) {
    return String(parseFloat(n.toPrecision(6)));
  }

  function read(el) {
    return el.value.trim() === "" ? null : Number(el.value);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = read(fields.voltage), i = read(fields.current), r = read(fields.resistance);
    var filled = [v, i, r].filter(function (x) { return x !== null; });

    if (filled.length !== 2) {
      return show("Please fill in exactly two boxes and leave the third empty.", true);
    }
    if (filled.some(function (x) { return !isFinite(x); })) {
      return show("Please enter valid numbers.", true);
    }
    if ((i !== null && i < 0) || (r !== null && r < 0)) {
      return show("Current and resistance cannot be negative.", true);
    }

    if (v === null) {
      v = i * r;
    } else if (i === null) {
      if (r === 0) return show("Resistance cannot be zero when finding current.", true);
      i = v / r;
    } else {
      if (i === 0) return show("Current cannot be zero when finding resistance.", true);
      r = v / i;
      if (r < 0) return show("Voltage and current must have the same sign.", true);
    }

    var p = v * i;
    show(
      "<strong>Voltage:</strong> " + fmt(v) + " V<br>" +
      "<strong>Current:</strong> " + fmt(i) + " A<br>" +
      "<strong>Resistance:</strong> " + fmt(r) + " &Omega;<br>" +
      "<strong>Power:</strong> " + fmt(p) + " W"
    );
  });

  document.getElementById("clear").addEventListener("click", function () {
    form.reset();
    out.hidden = true;
  });
})();
