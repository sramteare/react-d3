# react-ds3 exercise

# Task
From the data provided draw a line chart of Percent Value vs Category.
The chart should have horizontal and vertical line that pinpoints the data location on the chart with a
circle.
The chart should support sticky pinpoint (Horizontal and Vertical line must pinpoint on a single and
closest data point) when mouse moves around the chart area.
# Extra Task
There should be a summary line chart (a small line chart without axis) at the bottom of the chart.
This summary line chart, should filter the original chart using a range selection using mouse drag. The
selected range are greyed and the above chart are filtered on y and x axis.
# Axes Definition
Category axis are to be sorted in ascending order. Two users having the same category are to be merged
and their names should be displayed with comma ',').
Percent Value axis ranges from 0-100% and it is based on the proportion from the total value for all
category.
# Data
```json
[
    {
        "user": "Rm6vnmNPRvz",
        "value": 11,
        "category": 7
    },
    {
        "user": "cB0hC",
        "value": 9,
        "category": 7
    },
    {
        "user": "xFapEXx9",
        "value": 12,
        "category": 9
    },
    {
        "user": "stHdo1TV",
        "value": 6,
        "category": 10
    },
    {
        "user": "NlUafWkpjduC3",
        "value": 10,
        "category": 7
    },
    {
        "user": "e7DwVrmJ",
        "value": 7,
        "category": 6
    },
    {
        "user": "uEOJsO",
        "value": 6,
        "category": 14
    },
    {
        "user": "zlTNlewuDKcRl",
        "value": 13,
        "category": 8
    },
    {
        "user": "BQlhXiIHXUo42I",
        "value": 12,
        "category": 14
    },
    {
        "user": "SO6lM",
        "value": 5,
        "category": 5
    },
    {
        "user": "kn3LTrlFv6",
        "value": 5,
        "category": 11
    },
    {
        "user": "rFKwr3vSxco3K7",
        "value": 7,
        "category": 9
    },
    {
        "user": "1gzvu",
        "value": 11,
        "category": 14
    },
    {
        "user": "BL ymOGU",
        "value": 13,
        "category": 10
    },
    {
        "user": "vwEH33kh8 Bhny",
        "value": 6,
        "category": 5
    }
];
```
