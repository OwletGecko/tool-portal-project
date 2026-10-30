(function () {
  var form = document.getElementById("rc-form");
  var out = document.getElementById("result");
  var resistance = document.getElementById("resistance");
  var capacitance = document.getElementById("capacitance");
  var rUnit = document.getElementById("r-unit");
  var cUnit = document.getElementById("c-unit");

  // Time to reach a fraction of full charge is -ln(1 - fraction) time constants.
  var LEVELS = [
    { label: "63%", taus: 1 },
    { label: "90%", taus: -Math.log(1 - 0.9) },
    { label: "99%", taus: -Math.log(1 - 0.99) }
  ];

  function show(message, isError) {
    out.hidden = false;
    out.className = "result" + (isError ? " error" : "");
    out.innerHTML = message;
  }

  function num(n) {
    return String(parseFloat(n.toPrecision(4)));
  }

  function time(seconds) {
    if (seconds >= 1) return num(seconds) + " s";
    if (seconds >= 1e-3) return num(seconds * 1e3) + " ms";
    if (seconds >= 1e-6) return num(seconds * 1e6) + " &micro;s";
    return num(seconds * 1e9) + " ns";
  }

  function read(el) {
    return el.value.trim() === "" ? null : Number(el.value);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var r = read(resistance), c = read(capacitance);

    if (r === null || c === null) {
      return show("Please fill in both resistance and capacitance.", true);
    }
    if (!isFinite(r) || !isFinite(c)) {
      return show("Please enter valid numbers.", true);
    }
    if (r <= 0 || c <= 0) {
      return show("Resistance and capacitance must be greater than zero.", true);
    }

    var tau = r * Number(rUnit.value) * c * Number(cUnit.value);
    var html = "<strong>Time constant (&tau;):</strong> " + time(tau) + "<br>";
    LEVELS.forEach(function (level) {
      html += "<strong>Charged to " + level.label + ":</strong> " + time(tau * level.taus) + "<br>";
    });
    show(html.replace(/<br>$/, ""));
  });

  document.getElementById("clear").addEventListener("click", function () {
    form.reset();
    out.hidden = true;
  });
})();
