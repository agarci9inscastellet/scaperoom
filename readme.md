# . clickShows("#button", "#door");

This function means that when you click"#button"es mostra (es fa visible)#door
Remember that we initially marked"#door" withvisible = "false".
Of course, you can make it so that when you click on an object, a key or any other
element that MUST be picked up appears.

# · catchableObject("#key1","status_key1", "(1)");

Defines an object as "Catchable". That is, when clicked, a variable is
definedstatus_key1 which will take the value"(P1)". This value is important,
because it will be the symbol that will be displayed in the status bar.

When the object is picked up, the variable allows us to verify that we have it and this
will be used to open doors.

A lower status bar will appear where we will see all the status variables, so the player
knows which objects/keys they have picked up.

We can do catchableObject("#key1","status_key1", false); to remove a held object.
For example, you hold a torch with a flame. If you touch water, you lose the torch
because it gets wet.

· questionGate("#door", 1, "sala2.html");

This function makes the click on"#door" show and evaluate question 1 (zero).
If the user gets the answer right, they will be able to pass through the door by
navigating to the page. "sala2.html"

The questions are in the path assets/questions.json and have this structure

<figure>

[

{

"id": 0,
"question": "Who is the artist?",

"answer": "picasso"
} ,

{

"id": 1,
"question": "Secret code?",
"answer": "1234"
} ,

{

"id": 2,

"question": "What are you studying?",
"answer": "SMX"

</figure>

}

]

QUESTION ZERO:

We pass 0 as the question ID,NO questions will be asked. That is, it will check if you
have the necessary key, if there is one, or it will let you pass directly if we do not set
any key as a requirement.

· questionGate("#door", 1, "sala2.html", "status_key1");

It is the same function, but expanded so that the question is only asked if the user
has previously taken thecapital1

## IMPORTANT: If you want to hide any element, do it at the end of the code

· hideElement("#door");

Hides an element and makes it insensitive to clicks.

· ShowElement("#door");
shows an item that was hidden
