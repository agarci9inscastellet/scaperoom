    let questions = [];    
    function loadToastify() {
        // Load CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css';
        document.head.appendChild(cssLink);

        // Load JS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/toastify-js';
        //script.onload = initScaperomm;
        script.onerror = function() {
            console.error('Failed to load Toastify.js');
            // Fallback to native notifications or console logs
            //initScaperomm();
        };
        document.head.appendChild(script);
    }
    loadToastify();
    // Function to load questions from a JSON file
    async function loadQuestions(fileName) {
      try {
        const response = await fetch(fileName);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error loading questions:', error);
        return [];
      }
    }



 // Function to make target visible when trigger is clicked
  function clickShows(triggerSelector, targetSelector) {
    trigger = document.querySelector(triggerSelector);
    target = document.querySelector(targetSelector);
    trigger.addEventListener("click", () => {
      target.setAttribute('visible', true);
    });
  }

  // Function to check a question and redirect if correct
  function checkQuestion(questionId, location) {
    if (questions.length === 0) {
     // alert("Questions not loaded yet. Try again.");
      Toastify({text: t,duration: 3000}).showToast();
      return;
    }

    let answer = prompt(questions[questionId].question);
    if (answer && answer.toLocaleLowerCase() == questions[questionId].answer) {
      document.location = location;
    }
  }


  function resetStatus(){
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const val = localStorage.getItem(key);
          if (key.startsWith("status")){
            localStorage.removeItem(key);

          }
         // updateStatusBar();
    }
  }
  
  
  // Function to update status bar
  function updateStatusBar() {
    // Create style if it doesn't exist
    if (!document.getElementById('status-bar-style')) {
      const style = document.createElement('style');
      style.id = 'status-bar-style';
      style.innerHTML = `
        #status-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          text-align: right;
          padding-right: 50px;
          font-size: 18px;
        }
      `;
      document.head.appendChild(style);
    }

    // Create HTML element if it doesn't exist
    let statusBar = document.getElementById('status-bar');
    if (!statusBar) {
      statusBar = document.createElement('div');
      statusBar.id = 'status-bar';
      document.body.appendChild(statusBar);
    }
    
    let statusContent = 'Status: ';

    for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const val = localStorage.getItem(key);
          if (key.startsWith("status") && val != "false"){
              statusContent += val;
          }

    }

    statusBar.innerText = statusContent;
  }


  function questionGate(gateSelector, questionId, destination, required) {
  gate = document.querySelector(gateSelector);
    gate.addEventListener("click", () => {
  if (gate.getAttribute('visible') === false) return; // Don't respond if invisible

  // Check if the required localStorage variable exists and is not false
  if (required && (localStorage.getItem(required) === 'false' || localStorage.getItem(required) === null)) {
    let t = `Access denied: ${required} requirement not met`;
    console.log(t);
    
    //alert(t);
    Toastify({text: t,duration: 3000, backgroundColor: "darkred"}).showToast();

    return false;
  }

  // Find the question in the data

  const questionObj = questions[questionId];

  if (!questionObj) {
    console.error(`Question with ID ${questionId} not found`);
    return false;
  }

  // Prompt the user with the question
  const userAnswer = prompt(questionObj.question);

  // Check if answer is correct (case-insensitive, trimmed)
  if (userAnswer &&
      userAnswer.trim().toLowerCase() === questionObj.answer.toLowerCase()) {

    // Mark this question as answered in localStorage (optional)
    localStorage.setItem(`question_${questionId}_answered`, 'true');

    // Navigate to destination
    if (destination) {
      window.location.href = destination;
    }

    // Optionally hide or disable the gate in A-Frame
    if (gate && gate.setAttribute) {
      gate.setAttribute('visible', false);
      gate.setAttribute('collider', 'enabled', false);
    }

    return true;
  } else {
    let t="Incorrect answer! Access denied.";
    // Wrong answer - show message and block passage
    //alert("Incorrect answer! Access denied.");
    Toastify({text: t,duration: 3000,  backgroundColor: "darkred"}).showToast();

    // Optionally add visual feedback to the gate
    if (gate && gate.setAttribute) {
      // Flash red or show denial effect
      gate.setAttribute('material', 'color', '#ff0000');
      setTimeout(() => {
        gate.setAttribute('material', 'color', '#ffffff');
      }, 500);
    }

    return false;
  }
});
}


function catchableObject(targetSelector, varName, varValue = varName) {
  // If varValue is not provided, use varName as the value
  // Note: Default parameter varValue = varName handles this

  // Find the target element(s)
  const targets = document.querySelectorAll(targetSelector);

  // If no elements found, log error
  if (targets.length === 0) {
    console.error(`No elements found for selector: ${targetSelector}`);
    return;
  }

  // Add click event listener to each target element
  targets.forEach(target => {
    target.addEventListener('click', function(event) {
      const clickedElement = event.target;

      if (clickedElement.getAttribute('visible') === false) return; // Don't respond if invisible

      // Set the localStorage variable
      localStorage.setItem(varName, varValue);

      // Optional: Log confirmation
      console.log(`Clicked ${targetSelector}: Set localStorage.${varName} = "${varValue}"`);
      if (varValue.startsWith("status ")) varValue = varValue.subsring(7);
      let t="Has agafat "+ varValue;
      //alert(t);
      Toastify({text: t,duration: 3000,  backgroundColor: "green"}).showToast();
      // Optional: Add visual feedback
      this.style.opacity = '0.7';
      setTimeout(() => {
        this.style.opacity = '1';
        clickedElement.setAttribute('visible', false);
      }, 200);


      updateStatusBar();

      // Optional: Prevent event bubbling if needed
      // event.stopPropagation();
    });
  });
}

  window.addEventListener('load', () => {

    loadQuestions('assets/questions.json').then(data => {
      questions = data;
    }); 

    updateStatusBar();
  });

  alert("aaa");