---
layout: post
title: Iterate over CSV rows in Python
date: 2020-08-26 19:53:19
excerpt: How to read a CSV file and loop through the rows in Python.
categories: python csv pandas
---

Given CSV file `file.csv`:

```
column1,column2
foo,bar
baz,qux
```

You can loop through the rows in [Python](https://www.python.org/) using library [csv](https://docs.python.org/3/library/csv.html) or [pandas](https://pandas.pydata.org/).

## csv

Using [`csv.reader`](https://docs.python.org/3/library/csv.html#csv.reader):

```py
import csv

filename = 'file.csv'

with open(filename, 'r') as csvfile:
    datareader = csv.reader(csvfile)
    for row in datareader:
        print(row)
```

Output:

```
['column1', 'column2']
['foo', 'bar']
['baz', 'qux']
```

[Repl.it](https://replit.com/@remarkablemark/csvreader) demo:

<iframe height="500px" width="100%" src="https://replit.com/@remarkablemark/csvreader?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

## pandas

Install [pandas](https://pypi.org/project/pandas/):

```sh
pip install pandas
```

Using [`pandas.read_csv`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_csv.html#pandas-read-csv) and [`pandas.DataFrame.iterrows`](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.iterrows.html#pandas-dataframe-iterrows):

```py
import pandas as pd

filename = 'file.csv'
df = pd.read_csv(filename)

for index, row in df.iterrows():
    print(row)
```

Output:

```
column1    foo
column2    bar
Name: 0, dtype: object
column1    baz
column2    qux
Name: 1, dtype: object
```

[Repl.it](https://replit.com/@remarkablemark/pandasreadcsv) demo:

<iframe height="500px" width="100%" src="https://replit.com/@remarkablemark/pandasreadcsv?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
