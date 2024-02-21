const jwt = require('jsonwebtoken');

// Hardcoded public and private keys
const publicKey = `-----BEGIN CERTIFICATE-----
MIIDcjCCAloCAQEwDQYJKoZIhvcNAQELBQAwgasxCzAJBgNVBAYTAklOMRQwEgYD
VQQIDAtNYWhhcmFzaHRyYTEPMA0GA1UEBwwGTXVtYmFpMRIwEAYDVQQKDAlBeGlz
IEJhbmsxETAPBgNVBAsMCEFQSSBUZWFtMSUwIwYDVQQDDBxVQVQgSW50ZXJtZWRp
YXRlIENlcnRpZmljYXRlMScwJQYJKoZIhvcNAQkBFhhhcGkuY29ubmVjdEBheGlz
YmFuay5jb20wHhcNMjQwMjE0MDcxMzM5WhcNMjUwMjAxMDcxMzM5WjBSMQswCQYD
VQQGEwJJTjEPMA0GA1UECAwGUHVuamFiMQ8wDQYDVQQHDAZNb2hhbGkxITAfBgNV
BAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDCCASIwDQYJKoZIhvcNAQEBBQAD
ggEPADCCAQoCggEBALgwx0l2lfZ4sYL6tOI8L5er67PsCMiw/XadTL8COwCqtB2C
mEvVM/+jWfh94f3/A2ijvfLxd4jR5zj3gRwgWCq8a++QFOnlkBuqWVZFhImIaMk7
q+PLy7ObF7hQ0dMCBW8BS80t0qpnS9+4GIx0yPTo133jE31YH6Dxl4jH37Wy2Qf8
8hz6XxzW2gPXSi5vkI/gRbWhoWe9ZOoSPA+vcYzj4OqA9aqGAZUqh4MJNA+YPYeC
8p+k6XJonI5CIazWYry3Tgsp7gw5fXAEht5LeoGMDhxEgrRyS9a8UKCfRoTb880O
TF36/XBvS7qTzfoTBzh0iC+VK7kmH6xBya0fzo0CAwEAATANBgkqhkiG9w0BAQsF
AAOCAQEAdwUhgwVv33XkgOZLzTNeslxT/ncA8xxB28LrfTnnkMlIzLSDav/ogS6+
HKat+7rsR6DtsLL5mRt1nexZHiGg9q3WotPFnRSYuJmJ3NUHSTo79Y0M/yWD140z
B+zzzG5ugXM7lJyyEu5Ls6Bb8iO9YOgw+x7HuJUoY3caUoJbmAh1Z3mXCW5w2qUr
tOedvcjpanHQiGL09pQvDeSQmPeKd5/QtF7mzPsnL0aCponabJG5cR6o4Q0NA4Rk
LWeZ7Dy137QGWo0hbTQD5EIqB69q9Dyo9Z3viOu5sPky5NDdSxN0tYtgpZpZsk9b
LOApv0snQKSfgLk1KewycNZKxk4HBA==
-----END CERTIFICATE-----`;

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4MMdJdpX2eLGC
+rTiPC+Xq+uz7AjIsP12nUy/AjsAqrQdgphL1TP/o1n4feH9/wNoo73y8XeI0ec4
94EcIFgqvGvvkBTp5ZAbqllWRYSJiGjJO6vjy8uzmxe4UNHTAgVvAUvNLdKqZ0vf
uBiMdMj06Nd94xN9WB+g8ZeIx9+1stkH/PIc+l8c1toD10oub5CP4EW1oaFnvWTq
EjwPr3GM4+DqgPWqhgGVKoeDCTQPmD2HgvKfpOlyaJyOQiGs1mK8t04LKe4MOX1w
BIbeS3qBjA4cRIK0ckvWvFCgn0aE2/PNDkxd+v1wb0u6k836Ewc4dIgvlSu5Jh+s
QcmtH86NAgMBAAECggEAWQk7TIfGdh5hsK8AQVxWpTq19YNju5/S5kOjlbG+U9Qw
vRMkC4REXo7YLwaq990OCMceSxHudnUBEMiT4MTB2ea7RlKfyXDu+HCgPtPb/Z+z
B5OQw8z/6xJNpQtsYlPXzJET01sTOsw0ITEcrMjHW5wyjuf1w+GVaHdgiP4VZf78
EmwQMUMsGab58UcxLFuAHM6rwaFfCcVRaRQNhSZSlVr12etNdZDFpD0410qXp7Bv
hSTBoHwtHmykrTxvF3gsb6qCY4n+5IpNgco9TegKhXrjDw/9GwaUkYP8eQnbu98w
zj018RlpBeEHFxpNtpWtC9PL4dnnmMkISDnn46PhAQKBgQDnGz6e8P4/5raRUObr
Cj5xrRvfHbjGH8Mz4tphKqSElHuMLvw8rTl3boLpB3rvW4nHO+dHnqq6gk9qc558
+ksA1TfCOTqVnOBFPcMaVvjYUAi41xFfydrEWLvohAEI5obEBu1PxioZy0lNFNI5
pf75hPS64jRrdhZ5ltfpllmoSwKBgQDMB9RIl2ZsCX7En8tfwlgQ+/04bvJrOTPl
JW23hfs3/sNDPQ+GCoBLqXnfewLFEqIvhutB+cEvPXdLwOalkima/Qi1mPIrlQca
GkYV9z9NAmgc0XU8bWgVAKXJ4ZwBECbMHB/rJvLPvV/QKmZCepSKlgN9OWuJCDpO
iss7Y7zNhwKBgQDE4+czzikuE8bSgtRYxj9w5YRrT40N7h2F5O0b/xJuiXnAcn8e
yo28/H+3PFI1/gyhmp1t3PWjNEWocZxC6ZJgwUZhyBPrRt2i3/2KQTJ8R6NGpqP8
saIZyWc9rsia5ptGAojHgBJ6K0Dl1KlNx+g0eFtvpCv4qYB4UlTcguUbhQKBgDWx
jcU4ysR9zzWxk9T0kTaPCjmywOtE14pjSjd09ALtcbedNxugYdkHlcIhXj48xB/b
0se/EX78Hwv5jPlfuMFH++XGhVzA0GinJ3Caa7c5feqvmLm5VR3J2NeDHwoMlRk8
AY5h5p6TCMcAkX7HQZYjGnH3DXy3hJis4AUWH1a7AoGBALqj0uSJtcJaQM11VsfM
gRXx+NnztlScO1xl3qfj7P0+E3OaWS2Zd3u3aEFNaIDu/fGmSDp3fx4Dnv6dElTr
uUVdCObQXR1Si9/eGlRGTBZkoCK5+uLR6plD8i44lCjJRyQ7IAJr728IJhOyI5LE
Zc2Iv71CjPzaJR5WcM8EPL2H
-----END PRIVATE KEY-----`;

// Data to be encoded
const data = {
    "Data": {
        "userName": "admin",
        "password": "Axis@1234"
    },
    "Risk": {}
};

// Encoding options
const signOptions = {
    algorithm: 'RS256', // Changed from HS256 to RS256
    header: {
        typ: 'JWT'
    },
    expiresIn: '1h',
    keyid: '123456', // Just a sample key ID, you may customize as needed
};

// Manually creating the header with the desired length by padding it with spaces
const header = Buffer.from(JSON.stringify(signOptions.header)).toString('base64').padEnd(20);

// Encoding function
function encodeData(data, publicKey, privateKey, signOptions, header) {
    const encryptedData = jwt.sign(data, privateKey, {
        ...signOptions,
        header: {
            ...signOptions.header,
            alg: 'RS256', // Ensure it uses RS256 algorithm for signing
            enc: 'RS256' // Use RSA encryption
        }
    });
    const signedToken = jwt.sign({ data: encryptedData }, privateKey, {
        ...signOptions,
        algorithm: 'RS256', // Changed from HS256 to RS256
        header: {
            ...signOptions.header
        }
    });
    const encodedToken = `${header}.${signedToken}`;
    return encodedToken;
}


// Encode the data
const encodedData = encodeData(data, publicKey, privateKey, signOptions, header);
console.log(encodedData);
