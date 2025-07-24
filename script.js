// ========================
// 📱 Toggle Mobile Menu
// ========================
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons(); // render icons after DOM ready

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });

    // Close on link click
    document.querySelectorAll("#mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      });
    });
  }
});


  // ========================
  // 🔄 Scroll to Top on Refresh
  // ========================
  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
  });

  // ========================
  // ⌨️ Typewriting Effect
  // ========================
  const typedText = document.getElementById("typed-text");
  const titles = ["Front-end Developer", "UI/UX Designer"];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentTitle = titles[titleIndex];
    let currentText = currentTitle.substring(0, charIndex);
    typedText.textContent = currentText;

    if (!isDeleting && charIndex < currentTitle.length) {
      charIndex++;
      setTimeout(typeEffect, 100);
    } else if (charIndex === currentTitle.length && !isDeleting) {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 800);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 50);
    } else if (charIndex === 0 && isDeleting) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(typeEffect, 300);
    }
  }
  document.addEventListener("DOMContentLoaded", typeEffect);

  // ========================
  // ✨ Trigger Section Animations
  // ========================

  // Generic animator
  function animateSection(selector, className) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.remove('fade-in-up');
      void el.offsetWidth;
      setTimeout(() => {
        el.classList.add('fade-in-up');
      }, i * 80);
    });
  }

  // Home animation on scroll/view
  const homeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSection('.home-animate', 'fade-in-up');
      }
    });
  }, { threshold: 0.6 });

  homeObserver.observe(document.getElementById('home'));
  // About animation on scroll/view
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSection('.about-animate', 'fade-in-up');
      }
    });
  }, { threshold: 0.5 });

  aboutObserver.observe(document.getElementById('about'));

  // Animate on nav click (About)
  // document.querySelectorAll('a[href="#about"]').forEach(link => {
  //   link.addEventListener('click', () => {
  //     setTimeout(() => animateSection('.about-animate', 'fade-in-up'), 400);
  //   });
  // });
  document.querySelectorAll('a[href="#about"]').forEach(link => {
    link.addEventListener('click', () => {
      animateSection('.about-animate', 'fade-in-up'); // Remove delay
    });
  });



  // Project animation on scroll/view
  const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSection('.project-animate', 'fade-in-up');
      }
    });
  }, { threshold: 0.3 });

  projectObserver.observe(document.getElementById('projects'));

  // Animate on nav click (projects)
  document.querySelectorAll('a[href="#projects"]').forEach(link => {
    link.addEventListener('click', () => {
      animateSection('.project-animate', 'fade-in-up'); // Remove delay
    });
  });


  // Animate on nav click (home)
  // document.querySelectorAll('a[href="#home"]').forEach(link => {
  //   link.addEventListener('click', () => {
  //     setTimeout(() => animateSection('.home-animate', 'fade-in-up'), 400);
  //   });
  // });
  document.querySelectorAll('a[href="#home"]').forEach(link => {
    link.addEventListener('click', () => {
      animateSection('.home-animate', 'fade-in-up'); // Remove delay
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function () {
      setTimeout(() => {
        AOS.refresh(); // force refresh after scroll completes
      }, 600); // match your scroll smooth delay
    });
  });

  // Contact form submit (simulate notification)
  // document.getElementById("contact-form").addEventListener("submit", function (e) {
  //   // alert("✅ Message sent successfully! You'll be notified soon.");
  //   this.reset();
  // });

  // Re-trigger Contact section animations on scroll
  // const contactObserver = new IntersectionObserver((entries) => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       document.querySelectorAll('#contact [data-aos]').forEach(el => {
  //         el.classList.remove('aos-animate');
  //         void el.offsetWidth; // trigger reflow
  //         el.classList.add('aos-animate');
  //       });
  //     }
  //   });
  // }, { threshold: 0.5 });

  contactObserver.observe(document.getElementById("contact"));

  const contactForm = document.getElementById("contact-form");
  const successMsg = document.getElementById("form-success");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })
      .then(response => {
        if (response.ok) {
          successMsg.classList.remove("hidden");
          contactForm.reset();
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch(error => {
        alert("Network error. Please try again later.");
      });
  });
  AOS.init({
    once: false,
    duration: 1000,
  });

