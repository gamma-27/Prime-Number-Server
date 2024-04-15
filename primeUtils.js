function isPrime(end) {
    // Create an array to mark whether numbers are prime or not
    let sieve = [];
    for (let i = 0; i <= end; i++) {
        sieve.push(true); // Assume all numbers are prime initially
    }
    
    // Mark 0 and 1 as not prime
    sieve[0] = false;
    sieve[1] = false;

    // Iterate through the numbers starting from 2
    for (let i = 2; i <= Math.sqrt(end); i++) {
        if (sieve[i]) { // If i is prime
            // Mark all multiples of i as not prime
            for (let j = i * i; j <= end; j += i) {
                sieve[j] = false;
            }
        }
    }

    // Collect primes from the sieve
    let primes = [];
    for (let i = 2; i <= end; i++) {
        if (sieve[i]) {
            primes.push(i);
        }
    }

    return primes;
}

// Export the function
module.exports = { isPrime };
