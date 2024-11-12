1.1 Successful risk score calculation based                         |
on valid data should return status code 200                         |
--------------------------------------------------------------------|
1.2 Risk score return for Low Risk loanPeriod                       |
should be 12, 18, 24, 30 or 36 months                               |
--------------------------------------------------------------------|
1.3 Risk score return for Medium Risk loanPeriod                    |
should be 6, 9 or 12 months                                         |
--------------------------------------------------------------------|
1.4 Risk score return for High Risk loanPeriod                      |
should be 3 or 6 months                                             |
--------------------------------------------------------------------|
1.5 Unsuccessful risk score calculation with                        |
empty request body should return status code 400                    |
--------------------------------------------------------------------|
1.6 Unsuccessful risk score calculation with                        |
negative debt value in request body should return status code 400   |
--------------------------------------------------------------------|
1.7 Unsuccessful risk score calculation with                        |
invalid income  value in request body should return status code 400 |
--------------------------------------------------------------------|
1.8 Unsuccessful risk score calculation with                        |
invalid аge  value in request body should return status code 400    |
--------------------------------------------------------------------|