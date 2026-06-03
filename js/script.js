// =============================================
// MiauBuau Pet Shop - JavaScript
// Aluna: Manu
// =============================================

console.log("Site MiauBuau carregado com sucesso!");

document.addEventListener("DOMContentLoaded", function () {

    // ---- Ativar link da navbar conforme a página atual ----
    const paginaAtual = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {
        const href = link.getAttribute("href");
        if (href === paginaAtual) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // ---- Validação do formulário de contato ----
    const form = document.getElementById("formContato");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            // Verificar campos obrigatórios
            if (nome === "" || email === "" || mensagem === "") {
                mostrarAlerta("Por favor, preencha todos os campos obrigatórios!", "danger");
                return;
            }

            // Verificar se o nome tem pelo menos 3 caracteres
            if (nome.length < 3) {
                mostrarAlerta("O nome deve ter pelo menos 3 caracteres.", "warning");
                return;
            }

            // Verificar formato do e-mail
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                mostrarAlerta("Por favor, insira um e-mail válido!", "warning");
                return;
            }

            // Se passou por tudo, mostrar sucesso
            mostrarAlerta("Mensagem enviada com sucesso! Entraremos em contato em breve. 🐾", "success");
            form.reset();
        });
    }

    // ---- Função auxiliar para mostrar alertas ----
    function mostrarAlerta(texto, tipo) {
        const alertaExistente = document.getElementById("alerta-form");
        if (alertaExistente) {
            alertaExistente.remove();
        }

        const alerta = document.createElement("div");
        alerta.id = "alerta-form";
        alerta.className = "alert alert-" + tipo + " alert-dismissible fade show mt-3";
        alerta.innerHTML = texto + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';

        const form = document.getElementById("formContato");
        if (form) {
            form.parentNode.insertBefore(alerta, form.nextSibling);

            // Esconder depois de 5 segundos
            setTimeout(function () {
                if (alerta.parentNode) {
                    alerta.remove();
                }
            }, 5000);
        }
    }

    // ---- Animação simples ao entrar na viewport ----
    const cards = document.querySelectorAll(".card");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(function (card) {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            observer.observe(card);
        });
    }

    // ---- Máscara simples para o campo de telefone ----
    const campoTelefone = document.getElementById("telefone");
    if (campoTelefone) {
        campoTelefone.addEventListener("input", function () {
            let valor = this.value.replace(/\D/g, "");
            if (valor.length <= 10) {
                valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
            } else {
                valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
            }
            this.value = valor;
        });
    }

});
