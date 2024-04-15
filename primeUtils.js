function isPrime(start, end) {
    let primes = [];
    let sieve = new Array(end + 1).fill(true);
    sieve[0] = sieve[1] = false;

    // Mark multiples of primes starting from 2
    for (let p = 2; p * p <= end; p++) {
        if (sieve[p]) {
            for (let i = p * p; i <= end; i += p) {
                sieve[i] = false;
            }
        }
    }

    // Collect primes within the range
    for (let i = start; i <= end; i++) {
        if (sieve[i]) {
            primes.push(i);
        }
    }

   
    return primes;
}

module.exports = {isPrime};
