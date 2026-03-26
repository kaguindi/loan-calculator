const ratesDiv = document.getElementById("rates");

// Add rate fields dynamically
function addRate() {
  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Interest rate for a year (%)";
  input.className = "rate-input";
  ratesDiv.appendChild(input);
}

// Main calculation
function calculateLoan() {
  let amount = parseFloat(document.getElementById("amount").value);
  let years = parseInt(document.getElementById("years").value);
  let insurance = parseFloat(document.getElementById("insurance").value) || 0;
  let insuranceType = document.getElementById("insuranceType").value;

  let rateInputs = document.querySelectorAll(".rate-input");

  if (rateInputs.length === 0) {
    alert("Please add at least one interest rate");
    return;
  }

  let principal = amount;

  // Apply insurance once
  if (insuranceType === "once") {
    principal -= insurance;
  }

  // Compound interest year by year
  for (let i = 0; i < years; i++) {
    let rate = rateInputs[i] ? rateInputs[i].value : rateInputs[rateInputs.length - 1].value;
    rate = parseFloat(rate) / 100;

    principal = principal * (1 + rate);
  }

  let totalMonths = years * 12;

  // Monthly payment
  let monthly = principal / totalMonths;

  // Add monthly insurance
  if (insuranceType === "monthly") {
    monthly += insurance;
  }

  // Display result
  document.getElementById("result").innerHTML = `
    <p><strong>Total repayment:</strong> ${principal.toFixed(2)}</p>
    <p><strong>Monthly payment:</strong> ${monthly.toFixed(2)}</p>
  `;
}