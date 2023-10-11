document.addEventListener("DOMContentLoaded", function () {

  const nuvBar = document.querySelector('.nuv-bar');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const imgElement = document.querySelector('.nuv-bar img');
  
  nuvBar.addEventListener('click', function() {
      dropdownMenu.classList.toggle('show');
      let dot = document.location.pathname.includes("ua")? "../" : "./";
      if (dropdownMenu.classList.contains('show')) {
          imgElement.src = `${dot}img/nuv-bar-closed.svg`;
      } else {
          imgElement.src = `${dot}img/nuv-bar.svg`;
      }
  });


  const prevButton = document.getElementById('prevBtn'),
  nextButton = document.getElementById('nextBtn'),

  innerContainer = document.querySelector('.carousel-inner'),
  [...slides] = document.querySelectorAll('.carousel-slide');

  let currentIndex = slides.length,
  slideWidth = slides[0].offsetWidth;
  slideWidth += 30;

  

  
  // adaptiv
  setSlideCount();
  window.addEventListener('resize', setSlideCount);


  // Function to play the current slide / Функція для відображення поточного слайду
  function showSlide(index) {
    const newPosition = -index * slideWidth;
    innerContainer.style.left = newPosition + 'px';
    currentIndex = index;
  }

  // Switch to the next slide / Перемикання наступного слайду
  function nextSlide() {
    currentIndex++;
    // If we have reached the last cloned slide, switch to the first / Якщо ми дійшли до останнього клонованого слайду, перемикаємо на перший
    if (currentIndex >= slides.length * 2.5) {
      currentIndex = 0;
    }
    showSlide(currentIndex);
  }

  // Switch to the previous slide / Перемикання попереднього слайду
  function prevSlide() {
    currentIndex--;
    // If we have reached the first of the cloning slides, we switch to the last / Якщо ми дійшли до першого з клоновании слайдів, перемикаємо на останній
    if (currentIndex < 0) {
      currentIndex = slides.length * 2;
    }
    showSlide(currentIndex);
  }

  // A function to clone all slides and insert them before and after the main slides / Функція для клонування всіх слайдів і вставки їх перед і після основних слайдів
  function cloneAndAppendSlides() {
    const clonedSlides = [];

    // Create copies of all slides / Створюємо копії всіх слайдів
    for (let i = 0; i < slides.length; i++) {
      const slideClone = slides[i].cloneNode(true);
      clonedSlides.push(slideClone);
    }

    // Add cloned slides before the main slides / Додаємо клоновані слайди перед основними слайдами
    for (let i = 0; i < slides.length; i++) {
      const slideClone = clonedSlides[i].cloneNode(true);
      innerContainer.insertBefore(slideClone, slides[0]);
    }

    // Add cloned slides after the main slides / Додаємо клоновані слайди після основних слайдів
    for (let i = 0; i < slides.length; i++) {
      const slideClone = clonedSlides[i].cloneNode(true);
      innerContainer.appendChild(slideClone);
    }
  }

  // Initial display of the first slide and creation of copies of slides / Початкове відображення першого слайду та створення копій слайдів
  showSlide(currentIndex);
  cloneAndAppendSlides();

  // Switch slides when pressing buttons / Перемикання слайдів при натисканні кнопок 
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // Adaptability / Адаптивність
  function setSlideCount() {
    const windowWidth = window.innerWidth;
    const slides = document.querySelectorAll('.carousel-slide');
  
    // The number of slides depends on the width of the window / Кількість слайдів в залежності від ширини вікна
    if (windowWidth <= 700) {
      slides.forEach((slide) => {
        slide.classList.remove('carousel-slide-3');
        slide.classList.add('carousel-slide-1');
        slideWidth = slides[0].offsetWidth;
        slideWidth += 30;
      });
    } else {
      slides.forEach((slide) => {
        slide.classList.remove('carousel-slide-1');
        slide.classList.add('carousel-slide-3');
      });
    }
  }

  //scroll
  const smoothLinks = document.querySelectorAll("a[href^='#']");
  for (let smoothLink of smoothLinks) {
      smoothLink.addEventListener("click", function (e) {
          e.preventDefault();
          const id = smoothLink.getAttribute("href");
  
          document.querySelector(id).scrollIntoView({
              behavior: "smooth",
              block: "start"
          });
      });
  };

});
