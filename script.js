// Basic Calculator with Promises
function calculate(num1, num2, operation) {
  return new Promise((resolve, reject) => {
    if (isNaN(num1) || isNaN(num2)) {
      reject("Invalid numbers!");
    }

    switch (operation) {
      case "+":
        resolve(num1 + num2);
        break;
      case "-":
        resolve(num1 - num2);
        break;
      case "*":
        resolve(num1 * num2);
        break;
      case "/":
        if (num2 === 0) {
          reject("Division by zero is not allowed!");
        } else {
          resolve(num1 / num2);
        }
        break;
      default:
        reject("Invalid operation! Please use +, -, *, or /.");
    }
  });
}

// Custom Iterator to square numbers in an array
function createSquareIterator(arr) {
  let index = 0;
  return {
    next() {
      while (index < arr.length && isNaN(arr[index])) {
        index++; // Skip invalid entries
      }
      if (index < arr.length) {
        let square = arr[index] ** 2;
        index++;
        return { value: square, done: false };
      } else {
        return { done: true };
      }
    },
  };
}

// Prime Number Generator using Generators
function* primeGenerator(limit) {
  function isPrime(num) {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
      if (num % i === 0) return false;
    }
    return num > 1;
  }

  for (let num = 2; num <= limit; num++) {
    if (isPrime(num)) {
      yield num;
    }
  }
}

// Event Listeners
document.getElementById("calculate").addEventListener("click", () => {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const operation = document.getElementById("operation").value;

  calculate(num1, num2, operation)
    .then(result => {
      document.getElementById("calc-result").innerText = `Result: ${result}`;
    })
    .catch(error => {
      document.getElementById("calc-result").innerText = `Error: ${error}`;
    });
});

document.getElementById("square-iterate").addEventListener("click", () => {
  const arrayInput = document.getElementById("array").value.trim();
  
  if (!arrayInput) {
    document.getElementById("square-result").innerText = "Please enter numbers.";
    return;
  }

  const numbers = arrayInput.split(',').map(Number);
  const squareIterator = createSquareIterator(numbers);
  let result = [];

  let current = squareIterator.next();
  while (!current.done) {
    if (current.value !== undefined) {
      result.push(current.value);
    }
    current = squareIterator.next();
  }

  if (result.length > 0) {
    document.getElementById("square-result").innerText = `Squares: ${result.join(', ')}`;
  } else {
    document.getElementById("square-result").innerText = "No valid numbers found.";
  }
});

document.getElementById("generate-primes").addEventListener("click", () => {
  const limit = parseInt(document.getElementById("limit").value);
  
  if (isNaN(limit) || limit <= 1) {
    document.getElementById("prime-result").innerText = "Please enter a valid limit greater than 1.";
    return;
  }

  const primeGen = primeGenerator(limit);
  let primes = [];

  for (let prime of primeGen) {
    primes.push(prime);
  }

  document.getElementById("prime-result").innerText = `Primes up to ${limit}: ${primes.join(', ')}`;
});
