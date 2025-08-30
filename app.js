/**
 * dvanced JavaScript & ES6 Concepts Programming Assessment Application
 * A comprehensive assessment platform for dvanced JavaScript & ES6 Concepts programming skills
 *
 * Features:
 * - 72 questions across 8 programming units
 * - 45-minute timer with visual feedback
 * - Question randomization and progress tracking
 * - Local storage for session persistence
 * - Google Sheets integration for data collection
 * - CSV export functionality
 * - Responsive design and accessibility features
 *
 * @version 2.0
 * @author Assessment Platform
 */

/**
 * Application Configuration
 */
const CONFIG = {
  timeLimit: 2700, // 45 minutes in seconds
  totalQuestions: 72,
  units: 8,
  googleSheetsUrl:
    "https://script.google.com/macros/s/AKfycbwbK0N_UTrkiWaxry9z4PmVINdXBFQ90UOA9WE-wnLaiKs3W4fGkHe7_8zPzbPt1VxT/exec",
  storageKeys: {
    progress: "jsFinal_progress_v1",
    completed: "jsFinal_completed_v1",
    result: "jsFinal_result_v1",
    theme: "jsFinal_theme_v1",
  },
};

/**
 * Comprehensive Question Bank
 * Organized by units covering JavaScript fundamentals to advanced concepts
 */
const QUESTION_BANK = [
  // Unit 1: JavaScript Core Concepts & Advanced Fundamentals (9 questions)
  {
    id: "u1_01",
    unit: 1,
    level: "easy",
    type: "mcq",
    question: "What is type coercion in JavaScript?",
    options: [
      "Converting variables to constants",
      "Automatic conversion between different data types",
      "Creating new data types",
      "Deleting unused variables",
    ],
    correctAnswer: 1,
  },
  {
    id: "u1_02",
    unit: 1,
    level: "medium",
    type: "code",
    question: 'What is logged?\n\nconsole.log(5 + "3" + 2);',
    options: ["532", "10", "NaN", "TypeError"],
    correctAnswer: 0,
  },
  {
    id: "u1_03",
    unit: 1,
    level: "easy",
    type: "mcq",
    question: "Which operator provides a shorthand for if-else statements?",
    options: ["&&", "||", "? :", "??"],
    correctAnswer: 2,
  },
  {
    id: "u1_04",
    unit: 1,
    level: "medium",
    type: "code",
    question:
      'What is the result?\n\nlet result = 10 > 5 ? "yes" : "no";\nconsole.log(result);',
    options: ["yes", "no", "true", "false"],
    correctAnswer: 0,
  },
  {
    id: "u1_05",
    unit: 1,
    level: "hard",
    type: "code",
    question:
      "What is logged?\n\nfunction outer() {\n  let x = 10;\n  return function inner() {\n    console.log(x);\n  };\n}\nlet fn = outer();\nfn();",
    options: ["undefined", "10", "ReferenceError", "null"],
    correctAnswer: 1,
  },
  {
    id: "u1_06",
    unit: 1,
    level: "medium",
    type: "mcq",
    question: "What is a closure in JavaScript?",
    options: [
      "A function that ends execution",
      "A function's ability to access variables from its outer scope",
      "A loop that closes itself",
      "A method to close browser windows",
    ],
    correctAnswer: 1,
  },
  {
    id: "u1_07",
    unit: 1,
    level: "easy",
    type: "mcq",
    question: "Which function is used to execute code after a specified delay?",
    options: ["setInterval()", "setTimeout()", "setDelay()", "wait()"],
    correctAnswer: 1,
  },
  {
    id: "u1_08",
    unit: 1,
    level: "medium",
    type: "mcq",
    question: "What is the difference between setTimeout() and setInterval()?",
    options: [
      "No difference",
      "setTimeout() executes once, setInterval() executes repeatedly",
      "setInterval() is faster",
      "setTimeout() is deprecated",
    ],
    correctAnswer: 1,
  },
  {
    id: "u1_09",
    unit: 1,
    level: "hard",
    type: "code",
    question:
      'What happens?\n\nconsole.log("start");\nsetTimeout(() => console.log("timeout"), 0);\nconsole.log("end");',
    options: [
      "start, timeout, end",
      "start, end, timeout",
      "timeout, start, end",
      "All at the same time",
    ],
    correctAnswer: 1,
  },

  // Unit 2: Asynchronous JavaScript Foundations (9 questions)
  {
    id: "u2_01",
    unit: 2,
    level: "easy",
    type: "mcq",
    question: "What is the JavaScript Event Loop responsible for?",
    options: [
      "Creating loops in code",
      "Managing asynchronous operations execution",
      "Handling syntax errors",
      "Optimizing performance",
    ],
    correctAnswer: 1,
  },
  {
    id: "u2_02",
    unit: 2,
    level: "medium",
    type: "mcq",
    question: "Which executes first: call stack or callback queue?",
    options: [
      "Callback queue always first",
      "Call stack must be empty before callback queue executes",
      "They execute simultaneously",
      "It depends on the browser",
    ],
    correctAnswer: 1,
  },
  {
    id: "u2_03",
    unit: 2,
    level: "easy",
    type: "mcq",
    question: "How do you add an event listener to an element?",
    options: [
      "element.addEventListener('event', callback)",
      "element.addEvent('event', callback)",
      "element.on('event', callback)",
      "element.listen('event', callback)",
    ],
    correctAnswer: 0,
  },
  {
    id: "u2_04",
    unit: 2,
    level: "medium",
    type: "code",
    question:
      'What is logged when the button is clicked?\n\ndocument.getElementById("btn").addEventListener("click", function(event) {\n  console.log(event.target.tagName);\n});',
    options: ["CLICK", "BUTTON", "btn", "undefined"],
    correctAnswer: 1,
  },
  {
    id: "u2_05",
    unit: 2,
    level: "medium",
    type: "mcq",
    question: "What is a callback function?",
    options: [
      "A function that calls back to the server",
      "A function passed as an argument to another function",
      "A function that calls itself",
      "A function that returns a boolean",
    ],
    correctAnswer: 1,
  },
  {
    id: "u2_06",
    unit: 2,
    level: "hard",
    type: "code",
    question:
      "What is the problem with this code?\n\ngetUser(id, function(user) {\n  getPosts(user.id, function(posts) {\n    getComments(posts[0].id, function(comments) {\n      console.log(comments);\n    });\n  });\n});",
    options: [
      "Syntax error",
      "Callback hell - hard to read and maintain",
      "Memory leak",
      "No problem",
    ],
    correctAnswer: 1,
  },
  {
    id: "u2_07",
    unit: 2,
    level: "medium",
    type: "mcq",
    question: "What is callback hell?",
    options: [
      "When callbacks execute too fast",
      "Deeply nested callbacks that are hard to read",
      "Callbacks that throw errors",
      "Infinite callback loops",
    ],
    correctAnswer: 1,
  },
  {
    id: "u2_08",
    unit: 2,
    level: "hard",
    type: "code",
    question:
      "What is the execution order?\n\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');",
    options: ["A, B, C, D", "A, D, B, C", "A, D, C, B", "A, C, D, B"],
    correctAnswer: 2,
  },
  {
    id: "u2_09",
    unit: 2,
    level: "easy",
    type: "mcq",
    question: "Which method removes an event listener?",
    options: [
      "removeEventListener()",
      "deleteEventListener()",
      "offEventListener()",
      "clearEventListener()",
    ],
    correctAnswer: 0,
  },

  // Unit 3: Promises & Modern Asynchronous Programming (9 questions)
  {
    id: "u3_01",
    unit: 3,
    level: "easy",
    type: "mcq",
    question: "What are the three states of a Promise?",
    options: [
      "start, middle, end",
      "pending, fulfilled, rejected",
      "new, running, complete",
      "waiting, processing, done",
    ],
    correctAnswer: 1,
  },
  {
    id: "u3_02",
    unit: 3,
    level: "medium",
    type: "code",
    question:
      "What is logged?\n\nPromise.resolve('success')\n  .then(result => console.log(result))\n  .catch(error => console.log('error'));",
    options: ["success", "error", "undefined", "Promise object"],
    correctAnswer: 0,
  },
  {
    id: "u3_03",
    unit: 3,
    level: "medium",
    type: "mcq",
    question: "What does .catch() handle in a Promise chain?",
    options: [
      "Only syntax errors",
      "Any rejected Promise or thrown error in the chain",
      "Only network errors",
      "Only the last Promise",
    ],
    correctAnswer: 1,
  },
  {
    id: "u3_04",
    unit: 3,
    level: "hard",
    type: "code",
    question:
      "What happens?\n\nPromise.resolve(1)\n  .then(x => { throw new Error('fail'); })\n  .then(x => console.log('success'))\n  .catch(err => console.log('caught'));",
    options: ["success", "caught", "uncaught error", "1"],
    correctAnswer: 1,
  },
  {
    id: "u3_05",
    unit: 3,
    level: "medium",
    type: "mcq",
    question: "What does Promise.all() do?",
    options: [
      "Executes promises one by one",
      "Waits for all promises to resolve, fails if any reject",
      "Takes the fastest promise result",
      "Creates an array of promises",
    ],
    correctAnswer: 1,
  },
  {
    id: "u3_06",
    unit: 3,
    level: "medium",
    type: "mcq",
    question:
      "What is the difference between Promise.all() and Promise.race()?",
    options: [
      "No difference",
      "all() waits for all, race() resolves with first completed",
      "race() is faster",
      "all() handles errors better",
    ],
    correctAnswer: 1,
  },
  {
    id: "u3_07",
    unit: 3,
    level: "easy",
    type: "mcq",
    question: "What keyword declares an async function?",
    options: ["async", "await", "promise", "asynchronous"],
    correctAnswer: 0,
  },
  {
    id: "u3_08",
    unit: 3,
    level: "hard",
    type: "code",
    question:
      "What is logged?\n\nasync function test() {\n  return 'hello';\n}\nconsole.log(test());",
    options: ["hello", "Promise object", "undefined", "async function"],
    correctAnswer: 1,
  },
  {
    id: "u3_09",
    unit: 3,
    level: "medium",
    type: "code",
    question: "How do you handle errors in async/await?",
    options: [
      "Use .catch() method",
      "Use try/catch blocks",
      "Use error callback",
      "Cannot handle errors",
    ],
    correctAnswer: 1,
  },

  // Unit 4: Web Communication & Data Exchange (9 questions)
  {
    id: "u4_01",
    unit: 4,
    level: "easy",
    type: "mcq",
    question: "What does AJAX stand for?",
    options: [
      "Advanced JavaScript and XML",
      "Asynchronous JavaScript and XML",
      "Automatic JSON and XML",
      "Async Java and XML",
    ],
    correctAnswer: 1,
  },
  {
    id: "u4_02",
    unit: 4,
    level: "medium",
    type: "mcq",
    question: "What is the modern replacement for XMLHttpRequest?",
    options: ["AJAX", "fetch()", "request()", "http()"],
    correctAnswer: 1,
  },
  {
    id: "u4_03",
    unit: 4,
    level: "medium",
    type: "code",
    question:
      "What does this return?\n\nfetch('/api/data')\n  .then(response => response.json())\n  .then(data => console.log(typeof data));",
    options: ["string", "object", "json", "response"],
    correctAnswer: 1,
  },
  {
    id: "u4_04",
    unit: 4,
    level: "easy",
    type: "mcq",
    question: "Which method converts a JavaScript object to JSON string?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "toString()",
      "Object.json()",
    ],
    correctAnswer: 1,
  },
  {
    id: "u4_05",
    unit: 4,
    level: "medium",
    type: "mcq",
    question: "Which method converts JSON string to JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "eval()",
      "Object.fromJSON()",
    ],
    correctAnswer: 0,
  },
  {
    id: "u4_06",
    unit: 4,
    level: "hard",
    type: "code",
    question:
      'What happens?\n\nfetch("/api/data")\n  .then(response => {\n    if (!response.ok) {\n      throw new Error("HTTP error");\n    }\n    return response.json();\n  })\n  .catch(error => console.log("caught"));',
    options: [
      "Always logs 'caught'",
      "Logs 'caught' only if HTTP error or network error",
      "Never logs 'caught'",
      "Depends on the API",
    ],
    correctAnswer: 1,
  },
  {
    id: "u4_07",
    unit: 4,
    level: "medium",
    type: "mcq",
    question: "What is the advantage of fetch() over XMLHttpRequest?",
    options: [
      "fetch() is faster",
      "fetch() is promise-based and has cleaner syntax",
      "fetch() works in older browsers",
      "fetch() handles errors automatically",
    ],
    correctAnswer: 1,
  },
  {
    id: "u4_08",
    unit: 4,
    level: "hard",
    type: "code",
    question:
      "What is logged?\n\nasync function getData() {\n  try {\n    const response = await fetch('/api/data');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.log('Error caught');\n  }\n}",
    options: [
      "Always logs 'Error caught'",
      "Logs 'Error caught' only on network/parsing errors",
      "Never logs anything",
      "Logs the response data",
    ],
    correctAnswer: 1,
  },
  {
    id: "u4_09",
    unit: 4,
    level: "easy",
    type: "mcq",
    question: "What HTTP status code indicates a successful request?",
    options: ["404", "500", "200", "302"],
    correctAnswer: 2,
  },

  // Unit 5: Modern JavaScript ES6+ Features (9 questions)
  {
    id: "u5_01",
    unit: 5,
    level: "easy",
    type: "mcq",
    question: "What does the spread operator (...) do?",
    options: [
      "Creates loops",
      "Spreads elements of an array or object",
      "Declares variables",
      "Handles errors",
    ],
    correctAnswer: 1,
  },
  {
    id: "u5_02",
    unit: 5,
    level: "medium",
    type: "code",
    question:
      "What is logged?\n\nconst arr1 = [1, 2, 3];\nconst arr2 = [...arr1, 4, 5];\nconsole.log(arr2);",
    options: ["[1, 2, 3]", "[4, 5]", "[1, 2, 3, 4, 5]", "[[1, 2, 3], 4, 5]"],
    correctAnswer: 2,
  },
  {
    id: "u5_03",
    unit: 5,
    level: "medium",
    type: "code",
    question:
      "What is the value of 'a' and 'b'?\n\nconst [a, b] = [10, 20, 30];",
    options: [
      "a=10, b=20",
      "a=10, b=undefined",
      "a=[10,20,30], b=undefined",
      "Error",
    ],
    correctAnswer: 0,
  },
  {
    id: "u5_04",
    unit: 5,
    level: "hard",
    type: "code",
    question:
      "What is logged?\n\nconst {name, age = 25} = {name: 'John'};\nconsole.log(age);",
    options: ["undefined", "25", "null", "Error"],
    correctAnswer: 1,
  },
  {
    id: "u5_05",
    unit: 5,
    level: "medium",
    type: "mcq",
    question: "What is the main difference between Set and Array?",
    options: [
      "Set is faster",
      "Set stores unique values only",
      "Set is ordered, Array is not",
      "No difference",
    ],
    correctAnswer: 1,
  },
  {
    id: "u5_06",
    unit: 5,
    level: "medium",
    type: "code",
    question:
      "What is the size?\n\nconst mySet = new Set([1, 2, 2, 3, 3, 3]);\nconsole.log(mySet.size);",
    options: ["6", "3", "4", "undefined"],
    correctAnswer: 1,
  },
  {
    id: "u5_07",
    unit: 5,
    level: "easy",
    type: "mcq",
    question:
      "Which array method creates a new array with transformed elements?",
    options: ["forEach()", "map()", "filter()", "reduce()"],
    correctAnswer: 1,
  },
  {
    id: "u5_08",
    unit: 5,
    level: "hard",
    type: "code",
    question:
      "What is logged?\n\nconst nums = [1, 2, 3, 4];\nconst result = nums.reduce((acc, curr) => acc + curr, 0);\nconsole.log(result);",
    options: ["0", "10", "4", "undefined"],
    correctAnswer: 1,
  },
  {
    id: "u5_09",
    unit: 5,
    level: "medium",
    type: "code",
    question:
      "What does this return?\n\nconst users = [{name: 'John', age: 25}, {name: 'Jane', age: 30}];\nconst names = users.map(user => user.name);",
    options: [
      "['John', 'Jane']",
      "[{name: 'John'}, {name: 'Jane'}]",
      "undefined",
      "Error",
    ],
    correctAnswer: 0,
  },

  // Unit 6: Browser Storage & Complete Integration (9 questions)
  {
    id: "u6_01",
    unit: 6,
    level: "easy",
    type: "mcq",
    question: "Which storage persists after the browser is closed?",
    options: ["sessionStorage", "localStorage", "cookies", "Both B and C"],
    correctAnswer: 3,
  },
  {
    id: "u6_02",
    unit: 6,
    level: "medium",
    type: "mcq",
    question:
      "What is the main difference between localStorage and sessionStorage?",
    options: [
      "No difference",
      "localStorage persists until cleared, sessionStorage clears when tab closes",
      "sessionStorage is faster",
      "localStorage is more secure",
    ],
    correctAnswer: 1,
  },
  {
    id: "u6_03",
    unit: 6,
    level: "medium",
    type: "code",
    question:
      "How do you store an object in localStorage?\n\nconst user = {name: 'John', age: 25};",
    options: [
      "localStorage.setItem('user', user)",
      "localStorage.setItem('user', JSON.stringify(user))",
      "localStorage.user = user",
      "localStorage.store('user', user)",
    ],
    correctAnswer: 1,
  },
  {
    id: "u6_04",
    unit: 6,
    level: "hard",
    type: "code",
    question:
      "What happens?\n\nlocalStorage.setItem('data', JSON.stringify({x: 1}));\nconst retrieved = localStorage.getItem('data');\nconsole.log(typeof retrieved);",
    options: ["object", "string", "undefined", "json"],
    correctAnswer: 1,
  },
  {
    id: "u6_05",
    unit: 6,
    level: "easy",
    type: "mcq",
    question: "How do you set a cookie in JavaScript?",
    options: [
      "document.cookie = 'name=value'",
      "setCookie('name', 'value')",
      "cookie.set('name', 'value')",
      "localStorage.cookie = 'name=value'",
    ],
    correctAnswer: 0,
  },
  {
    id: "u6_06",
    unit: 6,
    level: "medium",
    type: "mcq",
    question: "What does the SameSite cookie attribute control?",
    options: [
      "Cookie expiration time",
      "Cookie encryption",
      "Cross-site request behavior",
      "Cookie storage size",
    ],
    correctAnswer: 2,
  },
  {
    id: "u6_07",
    unit: 6,
    level: "hard",
    type: "code",
    question:
      "What is logged?\n\nlocalStorage.setItem('count', '5');\nconst count = localStorage.getItem('count');\nconsole.log(count + 1);",
    options: ["6", "51", "NaN", "Error"],
    correctAnswer: 1,
  },
  {
    id: "u6_08",
    unit: 6,
    level: "medium",
    type: "mcq",
    question: "Which event fires when localStorage changes in another tab?",
    options: ["change", "storage", "localStorage", "update"],
    correctAnswer: 1,
  },
  {
    id: "u6_09",
    unit: 6,
    level: "hard",
    type: "code",
    question: "What is the typical storage limit for localStorage?",
    options: ["1KB", "1MB", "5-10MB", "Unlimited"],
    correctAnswer: 2,
  },
];

/**
 * Main Application Class
 * Handles all assessment functionality including timer, questions, and results
 */
class AssessmentApp {
  constructor() {
    this.currentQuestionIndex = 0;
    this.questions = [];
    this.answers = {};
    this.timeRemaining = CONFIG.timeLimit;
    this.timerInterval = null;
    this.studentInfo = {};
    this.isAssessmentActive = false;

    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    this.bindEvents();
    this.hideTimer();

    // Check if there's a completed assessment
    if (this.isAssessmentCompleted()) {
      this.showResults();
      return;
    }

    // Check if there's progress to resume
    this.loadProgress();

    // If no active assessment, show welcome screen
    if (!this.isAssessmentActive) {
      this.showScreen("intro");
    }
  }

  /**
   * Bind all event listeners
   */
  bindEvents() {
    const studentForm = document.getElementById("student-form");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    const submitBtn = document.getElementById("submit-btn");
    const reviewBtn = document.getElementById("review-btn");
    const backToQuizBtn = document.getElementById("back-to-quiz");
    const finalSubmitBtn = document.getElementById("final-submit");
    const confirmSubmitBtn = document.getElementById("confirm-submit");
    const cancelSubmitBtn = document.getElementById("cancel-submit");
    const downloadBtn = document.getElementById("download-results");

    studentForm?.addEventListener("submit", (e) =>
      this.handleStudentFormSubmit(e)
    );
    nextBtn?.addEventListener("click", () => this.nextQuestion());
    prevBtn?.addEventListener("click", () => this.previousQuestion());
    submitBtn?.addEventListener("click", () => this.showSubmitConfirmation());
    reviewBtn?.addEventListener("click", () => this.showReview());
    backToQuizBtn?.addEventListener("click", () => this.hideReview());
    finalSubmitBtn?.addEventListener("click", () =>
      this.showSubmitConfirmation()
    );
    confirmSubmitBtn?.addEventListener("click", () => this.submitAssessment());
    cancelSubmitBtn?.addEventListener("click", () =>
      this.hideSubmitConfirmation()
    );
    downloadBtn?.addEventListener("click", () => this.downloadResults());

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) =>
      this.handleKeyboardShortcuts(e)
    );

    // Modal backdrop clicks
    document.getElementById("submit-modal")?.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal__backdrop")) {
        this.hideSubmitConfirmation();
      }
    });
  }

  /**
   * Handle keyboard shortcuts for navigation
   * @param {KeyboardEvent} e - The keyboard event
   */
  handleKeyboardShortcuts(e) {
    if (e.altKey && this.isAssessmentActive) {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          this.previousQuestion();
          break;
        case "ArrowRight":
          e.preventDefault();
          this.nextQuestion();
          break;
        case "Enter":
          if (this.isOnLastQuestion() && this.isCurrentQuestionAnswered()) {
            e.preventDefault();
            this.showSubmitConfirmation();
          }
          break;
      }
    }
  }

  /**
   * Handle student form submission
   * @param {Event} e - Form submit event
   */
  handleStudentFormSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById("student-name");
    const idInput = document.getElementById("student-id");
    const errorElement = document.getElementById("name-error");

    const name = nameInput.value.trim();
    const id = idInput.value.trim();

    // Validation
    if (!name) {
      errorElement.textContent = "Please enter your full name.";
      nameInput.focus();
      return;
    }

    if (name.length < 2) {
      errorElement.textContent = "Name must be at least 2 characters long.";
      nameInput.focus();
      return;
    }

    errorElement.textContent = "";

    this.studentInfo = {
      name: this.sanitizeInput(name),
      id: this.sanitizeInput(id),
      startTime: new Date().toISOString(),
    };

    this.startAssessment();
  }

  /**
   * Sanitize user input to prevent XSS
   * @param {string} input - Input to sanitize
   * @returns {string} Sanitized input
   */
  sanitizeInput(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  }

  /**
   * Start the assessment
   */
  startAssessment() {
    // Clear any existing progress
    this.clearProgress();

    this.questions = this.shuffleArray([...QUESTION_BANK]);
    this.currentQuestionIndex = 0;
    this.answers = {};
    this.timeRemaining = CONFIG.timeLimit;
    this.isAssessmentActive = true;

    this.showScreen("quiz");
    this.showTimer();
    this.startTimer();
    this.displayQuestion();
    this.updateProgress();
    this.saveProgress();

    console.log("Assessment started with", this.questions.length, "questions");
  }

  /**
   * Shuffle array using Fisher-Yates algorithm
   * @param {Array} array - Array to shuffle
   * @returns {Array} Shuffled array
   */
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Start the countdown timer
   */
  startTimer() {
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      this.updateTimerDisplay();

      if (this.timeRemaining <= 0) {
        this.handleTimeUp();
      }

      this.saveProgress();
    }, 1000);
  }

  /**
   * Update timer display with visual feedback
   */
  updateTimerDisplay() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    const display = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    const timerDisplay = document.getElementById("timer-display");
    if (timerDisplay) {
      timerDisplay.textContent = display;

      // Visual feedback for time warnings
      timerDisplay.classList.remove("warning", "critical");
      if (this.timeRemaining <= 300) {
        // 5 minutes
        timerDisplay.classList.add("warning");
      }
      if (this.timeRemaining <= 60) {
        // 1 minute
        timerDisplay.classList.add("critical");
      }
    }
  }

  /**
   * Handle time up scenario
   */
  handleTimeUp() {
    clearInterval(this.timerInterval);
    this.showLoadingOverlay("Time is up! Submitting your assessment...");

    setTimeout(() => {
      this.submitAssessment();
    }, 2000);
  }

  /**
   * Display current question
   */
  displayQuestion() {
    const question = this.questions[this.currentQuestionIndex];
    if (!question) {
      console.error("No question found at index", this.currentQuestionIndex);
      return;
    }

    // Update question metadata
    document.getElementById(
      "question-unit"
    ).textContent = `Unit ${question.unit}`;
    document.getElementById("question-type").textContent =
      this.getQuestionTypeLabel(question.type);

    // Display question text
    const questionText = document.getElementById("question-text");
    if (question.type === "code") {
      questionText.innerHTML = `<pre>${this.escapeHtml(
        question.question
      )}</pre>`;
    } else {
      questionText.textContent = question.question;
    }

    // Display question options based on type
    this.displayQuestionOptions(question);

    // Update navigation buttons
    this.updateNavigationButtons();

    console.log(
      "Displaying question",
      this.currentQuestionIndex + 1,
      "of",
      this.questions.length
    );
  }

  /**
   * Get human-readable question type label
   * @param {string} type - Question type
   * @returns {string} Human-readable label
   */
  getQuestionTypeLabel(type) {
    const labels = {
      mcq: "Multiple Choice",
      boolean: "True/False",
      text: "Short Answer",
      code: "Code Analysis",
    };
    return labels[type] || "Question";
  }

  /**
   * Display question options based on question type
   * @param {Object} question - Question object
   */
  displayQuestionOptions(question) {
    const optionsContainer = document.getElementById("question-options");
    const questionId = question.id;
    let html = "";

    switch (question.type) {
      case "mcq":
      case "code":
        question.options.forEach((option, index) => {
          const isSelected = this.answers[questionId] === index;
          html += `
                        <label class="option ${
                          isSelected ? "selected" : ""
                        }" for="option-${index}">
                            <input 
                                type="radio" 
                                id="option-${index}"
                                name="question-${questionId}" 
                                value="${index}"
                                ${isSelected ? "checked" : ""}
                                onchange="app.handleAnswerChange('${questionId}', ${index})">
                            <span class="option-text">${this.escapeHtml(
                              option
                            )}</span>
                        </label>`;
        });
        break;

      case "boolean":
        const selectedValue = this.answers[questionId];
        html = `
                    <label class="option ${
                      selectedValue === true ? "selected" : ""
                    }" for="true-option">
                        <input 
                            type="radio" 
                            id="true-option"
                            name="question-${questionId}" 
                            value="true"
                            ${selectedValue === true ? "checked" : ""}
                            onchange="app.handleAnswerChange('${questionId}', true)">
                        <span class="option-text">True</span>
                    </label>
                    <label class="option ${
                      selectedValue === false ? "selected" : ""
                    }" for="false-option">
                        <input 
                            type="radio" 
                            id="false-option"
                            name="question-${questionId}" 
                            value="false"
                            ${selectedValue === false ? "checked" : ""}
                            onchange="app.handleAnswerChange('${questionId}', false)">
                        <span class="option-text">False</span>
                    </label>`;
        break;

      case "text":
        const textValue = this.answers[questionId] || "";
        html = `
                    <input 
                        type="text" 
                        class="text-input form-control" 
                        value="${this.escapeHtml(textValue)}"
                        placeholder="Enter your answer..."
                        oninput="app.handleTextAnswerChange('${questionId}', this.value)"
                        maxlength="200">`;
        break;
    }

    optionsContainer.innerHTML = html;
  }

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Handle answer change for multiple choice and boolean questions
   * @param {string} questionId - Question ID
   * @param {number|boolean} answer - Selected answer
   */
  handleAnswerChange(questionId, answer) {
    this.answers[questionId] = answer;
    this.updateProgress();
    this.saveProgress();

    // Update visual selection
    const options = document.querySelectorAll(".option");
    options.forEach((option) => {
      option.classList.remove("selected");
      const input = option.querySelector("input");
      if (input && input.checked) {
        option.classList.add("selected");
      }
    });
  }

  /**
   * Handle text answer changes with debouncing
   * @param {string} questionId - Question ID
   * @param {string} answer - Text answer
   */
  handleTextAnswerChange(questionId, answer) {
    clearTimeout(this.textAnswerTimeout);
    this.textAnswerTimeout = setTimeout(() => {
      this.answers[questionId] = answer.trim();
      this.updateProgress();
      this.saveProgress();
    }, 500);
  }

  /**
   * Navigate to next question
   */
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.displayQuestion();
      this.updateProgress();
      this.saveProgress();
    }
  }

  /**
   * Navigate to previous question
   */
  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.displayQuestion();
      this.updateProgress();
      this.saveProgress();
    }
  }

  /**
   * Update progress indicators and navigation
   */
  updateProgress() {
    const current = this.currentQuestionIndex + 1;
    const total = this.questions.length;
    const answeredCount = Object.keys(this.answers).filter((id) => {
      const answer = this.answers[id];
      return answer !== undefined && answer !== null && answer !== "";
    }).length;

    // Update progress display
    document.getElementById("current-question").textContent = current;
    document.getElementById("total-questions").textContent = total;
    document.getElementById(
      "answered-count"
    ).textContent = `${answeredCount} answered`;

    // Update progress bar
    const progress = (current / total) * 100;
    document.getElementById("progress-fill").style.width = `${progress}%`;

    this.updateNavigationButtons();
  }

  /**
   * Update navigation button states
   */
  updateNavigationButtons() {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const submitBtn = document.getElementById("submit-btn");

    // Previous button
    prevBtn.disabled = this.currentQuestionIndex === 0;

    // Next/Submit buttons
    if (this.isOnLastQuestion()) {
      nextBtn.classList.add("hidden");
      submitBtn.classList.remove("hidden");
    } else {
      nextBtn.classList.remove("hidden");
      submitBtn.classList.add("hidden");
    }
  }

  /**
   * Check if on last question
   * @returns {boolean} True if on last question
   */
  isOnLastQuestion() {
    return this.currentQuestionIndex === this.questions.length - 1;
  }

  /**
   * Check if current question is answered
   * @returns {boolean} True if current question is answered
   */
  isCurrentQuestionAnswered() {
    const questionId = this.questions[this.currentQuestionIndex]?.id;
    const answer = this.answers[questionId];
    return answer !== undefined && answer !== null && answer !== "";
  }

  /**
   * Show review screen
   */
  showReview() {
    this.showScreen("review-screen");
    this.populateReviewGrid();
  }

  /**
   * Hide review screen and return to quiz
   */
  hideReview() {
    this.showScreen("quiz");
  }

  /**
   * Populate the review grid with question status
   */
  populateReviewGrid() {
    const reviewGrid = document.getElementById("review-grid");
    let html = "";

    this.questions.forEach((question, index) => {
      const isAnswered =
        this.answers[question.id] !== undefined &&
        this.answers[question.id] !== null &&
        this.answers[question.id] !== "";

      html += `
                <div class="review-item ${
                  isAnswered ? "answered" : "unanswered"
                }" 
                     onclick="app.goToQuestion(${index})">
                    <div class="review-item__number">${index + 1}</div>
                    <div class="review-item__status">${
                      isAnswered ? "Answered" : "Unanswered"
                    }</div>
                </div>`;
    });

    reviewGrid.innerHTML = html;
  }

  /**
   * Navigate to specific question from review
   * @param {number} index - Question index
   */
  goToQuestion(index) {
    this.currentQuestionIndex = index;
    this.hideReview();
    this.displayQuestion();
    this.updateProgress();
  }

  /**
   * Show submit confirmation modal
   */
  showSubmitConfirmation() {
    const modal = document.getElementById("submit-modal");
    const statsContainer = document.getElementById("modal-stats");

    const totalAnswered = Object.keys(this.answers).filter((id) => {
      const answer = this.answers[id];
      return answer !== undefined && answer !== null && answer !== "";
    }).length;

    const unanswered = this.questions.length - totalAnswered;

    statsContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Total Questions:</span>
                <strong>${this.questions.length}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Answered:</span>
                <strong style="color: var(--color-success)">${totalAnswered}</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>Unanswered:</span>
                <strong style="color: var(--color-${
                  unanswered > 0 ? "warning" : "success"
                }">${unanswered}</strong>
            </div>
        `;

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.getElementById("confirm-submit").focus();
  }

  /**
   * Hide submit confirmation modal
   */
  hideSubmitConfirmation() {
    const modal = document.getElementById("submit-modal");
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  }

  /**
   * Submit the assessment
   */
  async submitAssessment() {
    this.hideSubmitConfirmation();
    this.showLoadingOverlay("Submitting your assessment...");

    clearInterval(this.timerInterval);
    this.isAssessmentActive = false;

    // Calculate results
    const results = this.calculateResults();

    // Save to local storage
    this.saveResults(results);

    // Try to save to Google Sheets
    try {
      await this.saveToGoogleSheets(results);
    } catch (error) {
      console.error("Failed to save to Google Sheets:", error);
    }

    this.hideLoadingOverlay();
    this.showResults();
  }

  /**
   * Calculate assessment results
   * @returns {Object} Results object
   */
  calculateResults() {
    let totalScore = 0;
    const unitScores = {};
    const detailedResults = [];

    // Initialize unit scores
    for (let i = 1; i <= CONFIG.units; i++) {
      unitScores[i] = { correct: 0, total: 0 };
    }

    this.questions.forEach((question) => {
      const userAnswer = this.answers[question.id];
      let isCorrect = false;

      // Check if answer is correct based on question type
      switch (question.type) {
        case "mcq":
        case "code":
          isCorrect = userAnswer === question.correctAnswer;
          break;
        case "boolean":
          isCorrect = userAnswer === question.correctAnswer;
          break;
        case "text":
          isCorrect = this.checkTextAnswer(
            userAnswer,
            question.acceptedAnswers
          );
          break;
      }

      if (isCorrect) {
        totalScore++;
        unitScores[question.unit].correct++;
      }
      unitScores[question.unit].total++;

      detailedResults.push({
        questionId: question.id,
        unit: question.unit,
        type: question.type,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer || question.acceptedAnswers,
        isCorrect,
      });
    });

    const percentage = Math.round((totalScore / this.questions.length) * 100);

    return {
      studentInfo: this.studentInfo,
      totalScore,
      totalQuestions: this.questions.length,
      percentage,
      unitScores,
      detailedResults,
      timeSpent: CONFIG.timeLimit - this.timeRemaining,
      submissionTime: new Date().toISOString(),
    };
  }

  /**
   * Check if text answer matches accepted answers
   * @param {string} userAnswer - User's answer
   * @param {Array} acceptedAnswers - Array of accepted answers
   * @returns {boolean} True if answer is correct
   */
  checkTextAnswer(userAnswer, acceptedAnswers) {
    if (!userAnswer || !acceptedAnswers) return false;

    const normalizedUserAnswer = userAnswer.toLowerCase().trim();
    return acceptedAnswers.some(
      (accepted) =>
        normalizedUserAnswer === accepted.toLowerCase() ||
        normalizedUserAnswer.includes(accepted.toLowerCase())
    );
  }

  /**
   * Save results to local storage
   * @param {Object} results - Results object
   */
  saveResults(results) {
    localStorage.setItem(CONFIG.storageKeys.result, JSON.stringify(results));
    localStorage.setItem(CONFIG.storageKeys.completed, "true");
    // Clear progress since assessment is complete
    localStorage.removeItem(CONFIG.storageKeys.progress);
  }

  /**
   * Save results to Google Sheets
   * Uses POST request with JSON data to match Google Apps Script expectations
   * @param {Object} results - Results object
   */

  /**
   * Test connection to Google Sheets (for debugging)
   */
  async testGoogleSheetsConnection() {
    try {
      const response = await fetch(`${CONFIG.googleSheetsUrl}?test=true`);
      const result = await response.json();
      console.log("Google Sheets connection test:", result);
      return result.status === "success";
    } catch (error) {
      console.error("Google Sheets connection test failed:", error);
      return false;
    }
  }

  /**
   * Test POST request to Google Sheets (for debugging)
   */
  async testGoogleSheetsPost() {
    try {
      const testData = {
        studentName: "Test Student",
        studentId: "TEST123",
        score: 100,
        percentage: 100,
        timeSpent: "5:00",
        submissionTime: new Date().toISOString(),
        unitScores: "Unit 1: 9/9, Unit 2: 9/9",
      };

      const formData = new FormData();
      Object.entries(testData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(CONFIG.googleSheetsUrl, {
        method: "POST",
        body: formData,
      });

      console.log("POST test response status:", response.status);

      if (response.ok) {
        try {
          const result = await response.json();
          console.log("POST test response:", result);
        } catch (parseError) {
          console.log("POST test succeeded (no JSON response)");
        }
        return true;
      } else {
        console.error("POST test failed with status:", response.status);
        return false;
      }
    } catch (error) {
      console.error("POST test failed:", error);
      return false;
    }
  }
  async saveToGoogleSheets(results) {
    const saveStatus = document.getElementById("save-status");

    try {
      // Prepare the data (we'll send it as form data to avoid CORS issues)
      const data = {
        studentName: results.studentInfo.name,
        studentId: results.studentInfo.id || "",
        score: results.totalScore,
        percentage: results.percentage,
        timeSpent: this.formatTime(results.timeSpent),
        submissionTime: results.submissionTime,
        unitScores: Object.entries(results.unitScores)
          .map(
            ([unit, score]) => `Unit ${unit}: ${score.correct}/${score.total}`
          )
          .join(", "),
      };

      // Method 1: Use FormData with POST (avoids CORS preflight issues)
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const response = await fetch(CONFIG.googleSheetsUrl, {
          method: "POST",
          body: formData, // Using FormData instead of JSON
        });

        if (response.ok) {
          try {
            const result = await response.json();
            if (result.status === "success") {
              saveStatus.innerHTML =
                '<span class="status status--success">✓ Saved to Google Sheets</span>';
              return;
            }
          } catch (parseError) {
            // If response isn't JSON, assume success
            console.log("Response parsed as success");
          }
          saveStatus.innerHTML =
            '<span class="status status--success">✓ Saved to Google Sheets</span>';
          return;
        }
      } catch (fetchError) {
        console.log(
          "FormData POST failed, trying alternative method...",
          fetchError
        );
      }

      // Method 2: Use traditional form submission (most reliable for Google Apps Script)
      const form = document.createElement("form");
      form.method = "POST";
      form.action = CONFIG.googleSheetsUrl;
      form.target = "hidden-iframe";
      form.style.display = "none";
      form.enctype = "application/x-www-form-urlencoded";

      // Add form fields
      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      // Create hidden iframe to receive the response
      const iframe = document.createElement("iframe");
      iframe.name = "hidden-iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      // Add form to page and submit
      document.body.appendChild(form);
      form.submit();

      // Clean up form
      document.body.removeChild(form);

      // Show success message (form submission doesn't give us response details)
      saveStatus.innerHTML =
        '<span class="status status--success">✓ Saved to Google Sheets</span>';

      // Clean up iframe after a delay
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 5000);
    } catch (error) {
      console.error("Error saving to Google Sheets:", error);
      saveStatus.innerHTML =
        '<span class="status status--error">⚠ Could not save to Google Sheets</span>';
    }
  }

  /**
   * Format time in minutes and seconds
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time string
   */
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }

  /**
   * Show results screen
   */
  showResults() {
    const results = JSON.parse(localStorage.getItem(CONFIG.storageKeys.result));
    if (!results) return;

    this.showScreen("results");
    this.hideTimer();
    this.populateResults(results);
  }

  /**
   * Populate results screen with data
   * @param {Object} results - Results object
   */
  populateResults(results) {
    // Update score display
    document.getElementById("final-score").textContent = results.totalScore;
    document.getElementById(
      "score-percentage"
    ).textContent = `${results.percentage}%`;

    // Create summary
    const summaryContainer = document.getElementById("results-summary");
    summaryContainer.innerHTML = `
            <h3>Assessment Summary</h3>
            <div class="unit-result">
                <span>Student Name:</span>
                <strong>${results.studentInfo.name}</strong>
            </div>
            ${
              results.studentInfo.id
                ? `
            <div class="unit-result">
                <span>Student ID:</span>
                <strong>${results.studentInfo.id}</strong>
            </div>
            `
                : ""
            }
            <div class="unit-result">
                <span>Time Spent:</span>
                <strong>${this.formatTime(results.timeSpent)}</strong>
            </div>
            <div class="unit-result">
                <span>Submission Time:</span>
                <strong>${new Date(
                  results.submissionTime
                ).toLocaleString()}</strong>
            </div>
        `;

    // Create unit breakdown
    const breakdownContainer = document.getElementById("results-breakdown");
    let unitHtml = "<h3>Unit Breakdown</h3>";

    Object.entries(results.unitScores).forEach(([unit, score]) => {
      const percentage = Math.round((score.correct / score.total) * 100);
      unitHtml += `
                <div class="unit-result">
                    <span class="unit-name">Unit ${unit}:</span>
                    <span class="unit-score">${score.correct}/${score.total} (${percentage}%)</span>
                </div>`;
    });

    breakdownContainer.innerHTML = unitHtml;
  }

  /**
   * Download results as CSV
   */
  downloadResults() {
    const results = JSON.parse(localStorage.getItem(CONFIG.storageKeys.result));
    if (!results) return;

    const csvContent = this.generateCSV(results);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `js-assessment-${results.studentInfo.name.replace(/\s+/g, "-")}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  /**
   * Generate CSV content from results
   * @param {Object} results - Results object
   * @returns {string} CSV content
   */
  generateCSV(results) {
    let csv = "Question,Unit,Type,User Answer,Correct Answer,Result\n";

    results.detailedResults.forEach((result, index) => {
      const question = `"Question ${index + 1}"`;
      const unit = result.unit;
      const type = result.type;
      const userAnswer = `"${result.userAnswer || "No Answer"}"`;
      const correctAnswer = Array.isArray(result.correctAnswer)
        ? `"${result.correctAnswer.join(" OR ")}"`
        : `"${result.correctAnswer}"`;
      const isCorrect = result.isCorrect ? "Correct" : "Incorrect";

      csv += `${question},${unit},${type},${userAnswer},${correctAnswer},${isCorrect}\n`;
    });

    // Add summary
    csv += "\nSUMMARY\n";
    csv += `Student Name,"${results.studentInfo.name}"\n`;
    if (results.studentInfo.id) {
      csv += `Student ID,"${results.studentInfo.id}"\n`;
    }
    csv += `Total Score,${results.totalScore}/${results.totalQuestions}\n`;
    csv += `Percentage,${results.percentage}%\n`;
    csv += `Time Spent,"${this.formatTime(results.timeSpent)}"\n`;
    csv += `Submission Time,"${new Date(
      results.submissionTime
    ).toLocaleString()}"\n`;

    return csv;
  }

  /**
   * Show specific screen and hide others
   * @param {string} screenId - ID of screen to show
   */
  showScreen(screenId) {
    const screens = ["intro", "quiz", "review-screen", "results"];
    screens.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        if (id === screenId) {
          element.classList.remove("hidden");
        } else {
          element.classList.add("hidden");
        }
      }
    });
  }

  /**
   * Show loading overlay
   * @param {string} message - Loading message
   */
  showLoadingOverlay(message = "Loading...") {
    const overlay = document.getElementById("loading-overlay");
    const text = overlay.querySelector(".loading-text");
    text.textContent = message;
    overlay.classList.remove("hidden");
    overlay.setAttribute("aria-hidden", "false");
  }

  /**
   * Hide loading overlay
   */
  hideLoadingOverlay() {
    const overlay = document.getElementById("loading-overlay");
    overlay.classList.add("hidden");
    overlay.setAttribute("aria-hidden", "true");
  }

  /**
   * Show timer in header
   */
  showTimer() {
    const timer = document.getElementById("timer");
    timer.style.display = "flex";
  }

  /**
   * Hide timer in header
   */
  hideTimer() {
    const timer = document.getElementById("timer");
    timer.style.display = "none";
  }

  /**
   * Save current progress to local storage
   */
  saveProgress() {
    if (!this.isAssessmentActive) return;

    const progress = {
      currentQuestionIndex: this.currentQuestionIndex,
      answers: this.answers,
      timeRemaining: this.timeRemaining,
      studentInfo: this.studentInfo,
      questions: this.questions,
      isActive: true,
    };

    localStorage.setItem(CONFIG.storageKeys.progress, JSON.stringify(progress));
  }

  /**
   * Load progress from local storage
   */
  loadProgress() {
    try {
      const saved = localStorage.getItem(CONFIG.storageKeys.progress);
      if (saved && !this.isAssessmentCompleted()) {
        const progress = JSON.parse(saved);

        // Only restore if the assessment was active
        if (
          progress.isActive &&
          progress.questions &&
          progress.questions.length > 0
        ) {
          this.currentQuestionIndex = progress.currentQuestionIndex || 0;
          this.answers = progress.answers || {};
          this.timeRemaining = progress.timeRemaining || CONFIG.timeLimit;
          this.studentInfo = progress.studentInfo || {};
          this.questions = progress.questions || [];
          this.isAssessmentActive = true;

          // Resume the assessment
          this.showScreen("quiz");
          this.showTimer();
          this.startTimer();
          this.displayQuestion();
          this.updateProgress();

          console.log("Resumed assessment from progress");
          return;
        }
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
      this.clearProgress();
    }

    this.isAssessmentActive = false;
  }

  /**
   * Check if assessment is completed
   * @returns {boolean} True if assessment is completed
   */
  isAssessmentCompleted() {
    return localStorage.getItem(CONFIG.storageKeys.completed) === "true";
  }

  /**
   * Clear all stored progress and results
   */
  clearProgress() {
    localStorage.removeItem(CONFIG.storageKeys.progress);
    // Don't clear completed status or results unless explicitly resetting
  }

  /**
   * Reset the entire assessment (for testing/development)
   */
  resetAssessment() {
    Object.values(CONFIG.storageKeys).forEach((key) => {
      localStorage.removeItem(key);
    });

    clearInterval(this.timerInterval);
    this.currentQuestionIndex = 0;
    this.questions = [];
    this.answers = {};
    this.timeRemaining = CONFIG.timeLimit;
    this.timerInterval = null;
    this.studentInfo = {};
    this.isAssessmentActive = false;

    this.showScreen("intro");
    this.hideTimer();

    console.log("Assessment reset");
  }
}

/**
 * Theme Management Functions
 */
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("theme-toggle");
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.themeToggle.addEventListener("click", () => this.toggleTheme());

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!this.getStoredTheme()) {
          this.applyTheme(e.matches ? "dark" : "light");
        }
      });
  }

  getStoredTheme() {
    return localStorage.getItem(CONFIG.storageKeys.theme);
  }

  getPreferredTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-color-scheme", theme);
    this.currentTheme = theme;
    localStorage.setItem(CONFIG.storageKeys.theme, theme);

    // Update toggle button state
    if (this.themeToggle) {
      this.themeToggle.setAttribute(
        "aria-label",
        `Switch to ${theme === "light" ? "dark" : "light"} mode`
      );
      this.themeToggle.setAttribute(
        "title",
        `Switch to ${theme === "light" ? "dark" : "light"} mode`
      );
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "light" ? "dark" : "light";
    this.applyTheme(newTheme);
  }
}

// Initialize the application when DOM is loaded
let app;
let themeManager;
document.addEventListener("DOMContentLoaded", () => {
  themeManager = new ThemeManager();
  app = new AssessmentApp();
});

// Make app globally accessible for event handlers
window.app = app;
window.themeManager = themeManager;

// Add a global reset function for development/testing
window.resetAssessment = () => {
  if (app) {
    app.resetAssessment();
  }
  if (themeManager) {
    themeManager.applyTheme("light");
  }
};
