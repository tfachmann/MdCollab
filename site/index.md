# MdCollab

---
**An Open-Source-Project to realize online markdown collaboration**

*By Timo Bachmann, David Nelles, Julius Sieg and Clemens Schlesinger*

---
Type your markdown here!

If you don't know how to write markdown, here's a little guide.

---
## Enumerations
```
- Item 1
- Item 2
- Item 3

1. Item 1
2. Item 2
3. Item 3
```
#### Result:
- Item 1
- Item 2
- Item 3

1. Item 1
2. Item 2
3. Item 3
---
## Tables
You can add tables like this:

```
| Column1 | Column2 |
|---------|---------|
| Entry 1 | Entry 2 |
```
#### Result:

| Column1 | Column2 |
|---------|---------|
| Entry 1 | Entry 2 |

---
## Code
You can add code like this:

```
    ```
    | Column1 | Column2 |
    |---------|---------|
    | Entry 1 | Entry 2 |
    ```
```
#### Result:
```
| Column1 | Column2 |
|---------|---------|
| Entry 1 | Entry 2 |
```

Inline codings can be added like this: 
```
This is an `inline coding`
```
#### Result:

This is an `inline coding`

---
## Images
You can add images like this:
```
![description](images/ducky.png)
```
#### Result:

![description](images/ducky.png)

---
## HTML
You can add html code to your markdown file like this:
```
<p>Dieses Wort ist <b>fett</b>.</p>
```
#### Result
<p>This word is <b>bold</b>.</p>

## Formatting
Standard formatting is also implemented like this:
```
*italian* **bold** ***both*** ~~crossed~~ 
```
#### Result:

*italian* **bold** ***both*** ~~crossed~~ 