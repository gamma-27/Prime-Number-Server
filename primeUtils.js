// primeUtils.js
function isPrime(start, end) {
    let primes = [];

    // Function to check if a number is prime
    function checkPrime(num) {
        if (num <= 1) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) return false;
        }
        return true;
    }

    // Find primes within the range
    for (let i = start; i <= end; i++) {
        if (checkPrime(i)) {
            primes.push(i);
        }
    }
    console.log("Prime is ", primes);
    return primes;
    
}

module.exports = { isPrime };
