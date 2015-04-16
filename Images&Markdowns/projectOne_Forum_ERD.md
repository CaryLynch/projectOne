# ProjectOne Forum ERD
---

## Table : Topics

```
ID    |      Title      |      Body      |    Vote    |    Author

```
### ID : Integer ; Primary Key AutoIncrement
---
### Title : Varchar
---
### Body : Text
---
### Vote : Integer
---
### Author : Varchar

---

## Table : Comments

```
BODY    |    LOCATION    |   TOPIC_ID
```

### Body : Text
---
### Location : Varchar
---
### Topic_ID : Integer ; Foreign Key (Topic_ID) References Topics (ID)
