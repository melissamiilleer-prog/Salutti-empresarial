(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Header scroll shadow ---------------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ---------------- Contact form -> WhatsApp deep link (no backend) ---------------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = document.getElementById("cf-nome").value.trim();
      var empresa = document.getElementById("cf-empresa").value.trim();
      var email = document.getElementById("cf-email").value.trim();
      var mensagem = document.getElementById("cf-mensagem").value.trim();

      if (!nome) {
        document.getElementById("cf-nome").focus();
        return;
      }

      var lines = ["Olá, meu nome é " + nome + "."];
      if (empresa) lines.push("Empresa: " + empresa + ".");
      if (email) lines.push("E-mail: " + email + ".");
      if (mensagem) lines.push("Mensagem: " + mensagem);
      else lines.push("Quero saber mais sobre a consultoria em licitações.");

      var text = encodeURIComponent(lines.join(" "));
      window.open("https://wa.me/5511988554434?text=" + text, "_blank", "noopener");
    });
  }

  /* ---------------- Serviços: "Quero um consultor" -> WhatsApp deep link ---------------- */
  var svcForm = document.getElementById("svcConsultorForm");
  if (svcForm) {
    svcForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = document.getElementById("svc-nome").value.trim();
      var telefone = document.getElementById("svc-telefone").value.trim();
      var email = document.getElementById("svc-email").value.trim();
      var cnpj = document.getElementById("svc-cnpj").value.trim();
      var frequencia = document.getElementById("svc-frequencia").value;
      var consent = document.getElementById("svc-consent").checked;

      if (!nome) { document.getElementById("svc-nome").focus(); return; }
      if (!consent) { document.getElementById("svc-consent").focus(); return; }

      var lines = ["Olá, meu nome é " + nome + " e quero falar com um consultor sobre licitações."];
      if (telefone) lines.push("Telefone: " + telefone + ".");
      if (email) lines.push("E-mail: " + email + ".");
      if (cnpj) lines.push("CNPJ: " + cnpj + ".");
      if (frequencia) lines.push("Frequência em licitações: " + frequencia + ".");

      var text = encodeURIComponent(lines.join(" "));
      window.open("https://wa.me/5511988554434?text=" + text, "_blank", "noopener");
    });
  }

  /* ---------------- Flip cards (Mercado Público infográfico) — toggle on click for touch ---------------- */
  var flipCards = document.querySelectorAll(".flip-card");
  flipCards.forEach(function (card) {
    card.addEventListener("click", function () {
      card.classList.toggle("is-flipped");
    });
  });

  /* ---------------- Diff cards (Diagnóstico/Análise/Estratégia) — shadow effect on tap for touch ---------------- */
  var diffCards = document.querySelectorAll(".diff-card");
  diffCards.forEach(function (card) {
    card.addEventListener("touchstart", function () {
      diffCards.forEach(function (c) { if (c !== card) c.classList.remove("is-touched"); });
      card.classList.add("is-touched");
    }, { passive: true });
  });
  document.addEventListener("touchstart", function (e) {
    diffCards.forEach(function (c) {
      if (!c.contains(e.target)) c.classList.remove("is-touched");
    });
  }, { passive: true });
})();
