// CREDIT FOR ORIGINAL CODE:
// https://codepen.io/hakimel/pen/QdWpRv?utm_source=extension&utm_medium=click&utm_campaign=muzli

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const header = document.querySelector(".head");

// Future idea: add friction to the velocity to make it feel more natural
let time = 0,
  velocity = 0.1,
  velocityTarget = 0.015,
  width,
  height,
  lastX,
  lastY,
  r1;

// Spacing options
// 3, 4, 5, 6, 7, 8, 9
const MAX_OFFSET = 450;
const SPACING = 4;
const POINTS = Math.floor(MAX_OFFSET / SPACING);
const PEAK = MAX_OFFSET;
const POINTS_PER_LAP = 5;
const SHADOW_STRENGTH = 10;

const render = () => {
  let x,
    y,
    cx = width / 2,
    cy = height / 2;

  // Gradient
  grd = context.createRadialGradient(cx, cy, r1, width, height, 30);

  grd.addColorStop(0.5, "rgb(248, 108, 253");
  grd.addColorStop(0.6, "rgb(80, 102, 228");
  grd.addColorStop(0.2, "rgb(80, 102, 228");

  context.globalCompositeOperation = "lighter";
  context.strokeStyle = grd;
  context.shadowColor = grd;
  context.lineWidth = 2;
  context.beginPath();

  // 112

  for (let i = POINTS; i > 0; i--) {
    let value = i * SPACING + (time % SPACING);

    const ax = Math.sin(value / POINTS_PER_LAP) * Math.PI,
      ay = Math.cos(value / POINTS_PER_LAP) * Math.PI * 0.9;

    (x = ax * value), (y = ay * value * 0.35);

    const o = 1 - Math.floor(PEAK / PEAK);

    y -= Math.pow(o, 2) * 200;
    y += (200 * value) / MAX_OFFSET;
    y += (x / cx) * width * 0.1;

    y -= 15;

    y = Math.floor(y);

    context.globalAlpha = 1 - value / MAX_OFFSET;
    context.shadowBlur = SHADOW_STRENGTH * o;

    context.lineTo(cx + x, cy + y);
    context.stroke();

    context.beginPath();
    context.moveTo(cx + x, cy + y);
  }

  // context.lineTo(cx, cy - 500);
  // context.lineTo(cx, 0);
  // context.stroke();
};

const onMouseDown = (event) => {
  lastX = event.clientX;
  lastY = event.clientY;

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

const onMouseMove = (event) => {
  let vx = (event.clientX - lastX) / 100;
  let vy = (event.clientY - lastY) / 100;

  if (event.clientY < height / 2) vx *= -1;
  if (event.clientX > width / 2) vy *= -1;

  velocityTarget = vx + vy;

  lastX = event.clientX;
  lastY = event.clientY;
};

const onMouseUp = (e) => {
  // e.preventDefault();
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
};

const onTouchStart = (event) => {
  // event.stopPropagation();
  // event.preventDefault();

  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;

  document.addEventListener("touchmove", onTouchMove);
  document.addEventListener("touchend", onTouchEnd);
};

const onTouchMove = (event) => {
  let vx = (event.touches[0].clientX - lastX) / 100;
  let vy = (event.touches[0].clientY - lastY) / 100;

  if (event.touches[0].clientY < height / 2) vx *= -1;
  if (event.touches[0].clientX > width / 2) vy *= -1;

  velocityTarget = vx + vy;

  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;
};

const onTouchEnd = () => {
  document.removeEventListener("touchmove", onTouchMove);
  document.removeEventListener("touchend", onTouchEnd);
};

const resize = () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  if (window.innerWidth > 1500) {
    r1 = window.innerWidth * 0.5;
  } else if (window.innerWidth <= 1500 && window.innerWidth > 1000) {
    r1 = 700;
  } else if (window.innerWidth <= 1000) {
    r1 = 450;
  }
};

const clear = () => {
  context.clearRect(0, 0, width, height);
};

const step = () => {
  time += velocity;
  velocity += (velocityTarget - velocity) * 0.3;
  clear();
  render();

  requestAnimationFrame(step);
};

const setup = () => {
  resize();
  step();

  window.addEventListener("resize", resize);
  window.addEventListener("mousedown", onMouseDown);
  document.addEventListener("touchstart", onTouchStart);
};

setup();

const parentList = document.querySelector(".nav-list");
const parentWrapper = document.querySelector(".nav-wrapper");
let open = [];
let openEffects = [];
// let openDropdown = [];
let dropdown, lastModal, playTransition;

const getElementDimensions = (el, parent) => {
  el.style.visibility = "hidden";
  parent.appendChild(el);
  const height = el.offsetHeight;
  const width = el.offsetWidth;
  parent.removeChild(el);
  el.style.visibility = "visible";
  return { height: height, width: width };
};

const testLastModal = (targetClass, relatedTargetClass) => {
  if (relatedTargetClass === "page-nav" && targetClass === "social-nav") {
    return true;
  }

  if (relatedTargetClass === "social-nav" && targetClass === "page-nav") {
    return true;
  }
};

const removeNavModal = (lastModalOpen) => {
  open.forEach((el) => {
    el.removeChild(el.querySelector(".nav-dropdown"));
  });
  open = [];
  lastModalOpen ? (playTransition = true) : (playTransition = false);
  lastModal = dropdown;
  dropdown = null;
  parentWrapper.removeEventListener("mouseout", handleNavBar);
};

const handleNavBar = (e) => {
  if (e.relatedTarget) {
    // e.stopPropagation();
    // e.preventDefault();
    // if wrapper protects against page exit errors
    if (!e.relatedTarget.classList.contains("nav-dropdown")) {
      if (
        e.target.classList.contains("nav-wrapper") ||
        e.relatedTarget.classList.contains("list-item")
      ) {
        if (
          e.relatedTarget.classList[1] !== dropdown.classList[1] &&
          !dropdown.contains(e.relatedTarget)
        ) {
          const lastModalOpen = testLastModal(
            e.relatedTarget.classList[1],
            dropdown.classList[1]
          );
          removeNavModal(lastModalOpen);
        }
      }
    }
  } else {
    removeNavModal(false);
  }
};

const handleModalExit = (e) => {
  if (e.relatedTarget) {
    if (!e.relatedTarget.classList.contains("nav-wrapper")) {
      const lastModalOpen = testLastModal(
        e.relatedTarget.classList[1],
        dropdown.classList[1]
      );
      removeNavModal(lastModalOpen);
    }
  } else {
    removeNavModal(false);
  }
};

const createNavModal = () => {
  const navModal = document.createElement("div");
  navModal.classList.add("nav-dropdown", "page-nav");
  navModal.setAttribute("id", "nav-modal");

  const navItems = [
    { name: "Landing Page", href: "landing" },
    { name: "About Me", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "My Projects", href: "projects" },
    { name: "Contact Me", href: "contact" },
  ];

  const ul = document.createElement("ul");

  navItems.forEach((el) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerHTML = el.name;
    a.setAttribute("href", `#${el.href}`);
    li.classList.add("nav-dropdown-li");
    li.appendChild(a);
    ul.appendChild(li);
  });

  ul.classList.add("nav-dropdown-ul");

  navModal.appendChild(ul);

  return navModal;
};

const createSocialModal = () => {
  const socialModal = document.createElement("div");
  socialModal.classList.add("nav-dropdown", "social-nav");
  socialModal.setAttribute("id", "social-modal");

  socialItems = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/yasaman-ayazi/",
      image: "./resources/icons/linkedin-logo.svg",
    },
    {
      name: "GitHub",
      href: "https://github.com/yasi-ayazi",
      image: "./resources/icons/github-logo.svg",
    }
  ];

  const ul = document.createElement("ul");
  ul.classList.add("nav-dropdown-ul");

  socialItems.forEach((el) => {
    const a = document.createElement("a");
    const img = document.createElement("img");
    const li = document.createElement("li");
    const p = document.createElement("p");

    li.classList.add("nav-dropdown-li");

    img.setAttribute("src", el.image);
    img.setAttribute("alt", el.name);
    img.style.marginRight = "0.5rem";
    a.setAttribute("href", el.href);
    a.setAttribute("target", "_blank");
    a.style.display = "flex";
    p.innerText = el.name;

    a.appendChild(img);
    a.appendChild(p);
    li.appendChild(a);
    ul.appendChild(li);
  });

  socialModal.appendChild(ul);

  return socialModal;
};

const appendModal = (modal, event) => {
  let lastModalDims;
  let dropdownDims;

  modal === "nav"
    ? (dropdown = createNavModal())
    : (dropdown = createSocialModal());

  if (lastModal && playTransition) {
    lastModalDims = getElementDimensions(lastModal, event.target);
    dropdownDims = getElementDimensions(dropdown, event.target);
    dropdown.style.height = `${lastModalDims.height}px`;
    dropdown.style.width = `${lastModalDims.width}px`;
  }

  open.push(event.target);
  event.target.appendChild(dropdown);
  dropdown.style.transform = "scale(0.9)";
  if (lastModal && playTransition) {
    modal === "nav"
      ? (dropdown.style.transform = `translateX(+67%)`)
      : (dropdown.style.transform = `translateX(-58%)`);

    dropdown.style.opacity = 1;
  }

  setTimeout(() => {
    dropdown.style.opacity = 1;
    dropdown.style.transform = "translateX(0) scale(1)";
    if (lastModal && playTransition) {
      dropdown.style.height = `${dropdownDims.height}px`;
      dropdown.style.width = `${dropdownDims.width}px`;
    }
  }, 10);
};

parentWrapper.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("list-item")) {
    if (event.target.innerHTML === "Navigation" && !dropdown) {
      appendModal("nav", event);
    } else if (event.target.innerHTML === "Social" && !dropdown) {
      appendModal("social", event);
    }

    parentWrapper.addEventListener("mouseout", handleNavBar);
    dropdown.addEventListener("mouseleave", handleModalExit);
  }
});

const nav = document.querySelector(".nav-wrapper");
const navTouchExit = (e) => {
  if (
    !e.target.classList.contains("nav-wrapper") &&
    open.length &&
    !nav.contains(e.target)
  ) {
    removeNavModal(false);
  }
};
document.addEventListener("touchstart", navTouchExit);

const projectArr = [
  {
    languages: "FCC Survey Form",
    name: "Survy form for collect data from users",
    description:
      "The first website I built during my program with HYF. just a simple HTML/CSS site.",
    imgName: "surveyform",
    alt: "Survy form for collect data from users",
    githubLink: "https://github.com/yasi-ayazi/freecodecamp/blob/main/SurveyForm.html ",
    deployedLink: "https://github.com/yasi-ayazi/freecodecamp/blob/main/SurveyForm.html",
  }
];

const projectsContainer = document.querySelector(".projects-container");

// Mouse enter func
const mouseEnter = (e) => {
  // Gets closest project and sets the image to 15% opacity
  // sets the buttons to 100% opacity
  // e.stopPropagation();
  // e.preventDefault();
  const el = e.target.closest(".project-format");
  const children = el.firstChild.children;
  for (const child of children) {
    if (child.className === "project-button-wrapper") {
      child.style.opacity = "100%";
      child.style.visibility = "visible";
      child.style.transition = "all 0.4s";
      // child.style.display = "flex";
      openEffects.push(child);
    } else {
      child.style.opacity = "12%";
      child.style.transition = "all 0.4s";
      openEffects.push(child);
    }
  }
};

// Mouse exit func
const mouseLeave = (e) => {
  // Gets closest project and sets the image to 100% opacity
  // sets the buttons to 0% opacity
  // const el = e.target.closest(".project-format");
  // const children = el.firstChild.children;
  // for (const child of children) {
  //   if (child.className === "project-button-wrapper") {
  //     child.style.opacity = "0%";
  //     child.style.transition = "all 0.4s";
  //   } else {
  //     child.style.opacity = "100%";
  //     child.style.transition = "all 0.4s";
  //   }
  // }

  // Replacement logic using memory
  // e.stopPropagation();
  // e.preventDefault();
  openEffects.forEach((el) => {
    if (el.className === "project-button-wrapper") {
      el.style.opacity = "0%";
      el.style.visibility = "hidden";
      el.style.transition = "all 0.4s";
    } else {
      el.style.opacity = "100%";
      el.style.transition = "all 0.4s";
    }
  });
};

const touchLeave = (e) => {
  // Gets closest project and sets the image to 100% opacity
  // sets the buttons to 0% opacity
  // e.stopPropagation();
  // e.preventDefault();
  let closest = e.target.closest(".project-format");
  if (openEffects.length && closest && !closest.contains(e.target)) {
    console.log("fired");
    openEffects.forEach((el) => {
      if (el.className === "project-button-wrapper") {
        el.style.opacity = "0%";
        el.style.visibility = "hidden";
        el.style.transition = "all 0.4s";
      } else {
        el.style.opacity = "100%";
        el.style.transition = "all 0.4s";
      }
    });
  }
};

document.addEventListener("touchstart", touchLeave);

const createProject = (props) => {
  const {
    languages,
    name,
    description,
    imgName,
    githubLink,
    deployedLink,
    alt,
  } = props;

  const articleWrapper = document.createElement("article");
  const imageWrapper = document.createElement("div");
  const buttonWrapper = document.createElement("div");
  const githubButton = document.createElement("a");
  const deployedButton = document.createElement("a");
  const projectImage = document.createElement("img");

  const projectTextWrapper = document.createElement("div");
  const projectLanguages = document.createElement("h3");
  const projectName = document.createElement("h2");
  const projectDescription = document.createElement("p");

  const eyeIcon = document.createElement("span");
  const githubIcon = document.createElement("span");

  const githubButtonText = document.createElement("p");
  const deployedButtonText = document.createElement("p");

  articleWrapper.classList.add("project-format");
  imageWrapper.classList.add("project-image");
  buttonWrapper.classList.add("project-button-wrapper");
  githubButton.classList.add("project-button");
  deployedButton.classList.add("project-button");
  projectImage.classList.add("project-img-format");
  projectTextWrapper.classList.add("project-text");

  eyeIcon.style.display = "flex";
  githubIcon.style.display = "flex";

  eyeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  githubIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;

  projectLanguages.innerHTML = languages;
  projectName.innerHTML = name;
  projectDescription.innerHTML = description;

  githubButtonText.innerText = "GitHub";
  deployedButtonText.innerText = "View Preview";

  githubButton.appendChild(githubIcon);
  githubButton.appendChild(githubButtonText);
  githubButton.setAttribute("href", githubLink);
  githubButton.setAttribute("target", "_blank");

  deployedButton.appendChild(eyeIcon);
  deployedButton.appendChild(deployedButtonText);
  deployedButton.setAttribute("href", deployedLink);
  deployedButton.setAttribute("target", "_blank");

  projectImage.setAttribute("alt", alt);
  projectImage.setAttribute("src", `./resources/images/${imgName}.webp`);

  buttonWrapper.appendChild(githubButton);
  buttonWrapper.appendChild(deployedButton);
  imageWrapper.appendChild(buttonWrapper);
  imageWrapper.appendChild(projectImage);

  projectTextWrapper.appendChild(projectLanguages);
  projectTextWrapper.appendChild(projectName);
  projectTextWrapper.appendChild(projectDescription);

  articleWrapper.appendChild(imageWrapper);
  articleWrapper.appendChild(projectTextWrapper);

  imageWrapper.addEventListener("mouseover", mouseEnter);
  imageWrapper.addEventListener("mouseout", mouseLeave);

  return articleWrapper;
};

projectArr.forEach((el) => {
  projectsContainer.appendChild(createProject(el));
});

const formInputs = document.querySelectorAll(".form-input");
const submitButton = document.querySelector(".form-button");

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateInputs = () => {
  formInputs.forEach((el) => {
    validateInput(el);
  });
};

const validateInput = (el) => {
  if (el.value === "") {
    el.style.outline = "1px solid red";
  } else {
    el.style.outline = "transparent";
  }

  if (el.id === "email") {
    if (!validateEmail(el.value)) {
      el.style.outline = "1px solid red";
    } else {
      el.style.outline = "transparent";
    }
  }
};

formInputs.forEach((el) => {
  el.addEventListener("focus", (e) => {
    console.log(e.target);
    el.style.outline = "1px solid #9e88cc";
  });

  el.addEventListener("blur", (e) => {
    // el.style.outline = "transparent";
    validateInput(e.target);
  });
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  validateInputs();
});

const sidebars = document.querySelector(".sidebars");

let observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.target.classList.contains("main")) {
        if (entry.isIntersecting) {
          sidebars.style.opacity = 1;
        } else {
          sidebars.style.opacity = 0;
        }
      }
    });
  },
  {
    threshold: 0.15,
  }
);

let observer2 = new IntersectionObserver(
  (entries, observer) => {
    entries.filter((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.6,
  }
);

let observer3 = new IntersectionObserver(
  (entries, observer) => {
    entries.filter((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
  }
);

document.querySelectorAll(".main").forEach((el) => {
  observer.observe(el);
});

document.querySelectorAll(".fade-in").forEach((el) => {
  observer2.observe(el);
});

document.querySelectorAll(".fade-in-proj").forEach((el) => {
  observer3.observe(el);
});

// resize logic for skills section
// Future: Add typing icon on main header