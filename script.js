/* ==================================================
   31Contents — common scripts
   ================================================== */
(function () {
  "use strict";

  // --- Hamburger Menu ------------------------------
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".header-nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("is-open");
      nav.classList.toggle("is-open");
      const expanded = hamburger.classList.contains("is-open");
      hamburger.setAttribute("aria-expanded", expanded ? "true" : "false");
    });

    // Close menu when nav link clicked (SP)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          hamburger.classList.remove("is-open");
          nav.classList.remove("is-open");
          hamburger.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // --- Async Form Submit (Formspree) ---------------
  const forms = document.querySelectorAll("form[data-async]");
  forms.forEach(function (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector(".form-submit");
      const thanksBox = form.parentElement.querySelector(".form-thanks");
      const originalText = submitBtn ? submitBtn.textContent : "";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "送信中...";
      }

      try {
        const data = new FormData(form);
        const response = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          form.style.display = "none";
          if (thanksBox) thanksBox.classList.add("is-show");
        } else {
          const json = await response.json().catch(function () { return {}; });
          const msg = (json && json.errors && json.errors.map(function (er) { return er.message; }).join(", ")) ||
            "送信に失敗しました。時間をおいて再度お試しください。";
          alert(msg);
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        }
      } catch (err) {
        alert("通信エラーが発生しました。時間をおいて再度お試しください。");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });
  });

  // --- Current Year in Footer ----------------------
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
