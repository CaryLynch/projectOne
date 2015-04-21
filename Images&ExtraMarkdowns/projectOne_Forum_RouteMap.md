#ProjectOne Forum HTTP Route Architecture

### WELCOME PAGE  :  get("/")
---
  * General welcome message
  * Also provides a link, "Pick a Topic" that will take user to the FORUM TOPICS LIST PAGE : ("/topics")

### FORUM TOPICS LIST PAGE  :  get("/topics")
---
  * Topic list page that will contain links to each individual Single Topic Page : get ("/topics/:ID")

  * Also will provide a button to "Create a New Topic" : get ("/topics/new")

### FORUM TOPIC CREATION PAGE  :  get("/topics/new")
---
  * Form with 2 fields and a submit button : Topic Title, Topic Body, Submit Your Topic (button) : post("/topics/:ID"), redirect : get("/topics")


###SINGLE TOPIC / VOTING / COMMENTING PAGE  :  get("/topics/:ID")
---
  * Body of the single topic
  * "Vote for This Topic" button : put("/topics/:ID")
  * Form field for "Comment" & Submit button : post("/topics/:ID"), redirect gt("/topics:ID")
  * List of all other users' comments listed in order of most to least recent
