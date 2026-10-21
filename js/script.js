
document.addEventListener("DOMContentLoaded", () => {

    // MENU RESPONSIVO
    document.querySelectorAll("header nav").forEach((nav, index) => {
        const menu = nav.querySelector(".lista-nav");

        if (!menu) return;

        const toggle = document.createElement("button");

        toggle.type = "button";
        toggle.className = "btn btn-outline-light hg-mobile-toggle";
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", `hg-menu-${index}`);

        toggle.innerHTML = `
            <span aria-hidden="true">☰</span>
            <span class="visually-hidden">Abrir menu</span>
        `;

        menu.id = `hg-menu-${index}`;

        nav.insertBefore(toggle, menu);

        toggle.addEventListener("click", () => {
            const aberto = menu.classList.toggle("hg-menu-open");

            toggle.setAttribute("aria-expanded", String(aberto));

            toggle.querySelector(".visually-hidden").textContent =
                aberto ? "Fechar menu" : "Abrir menu";
        });
    });


    // Busca do Perfil
    const formulario = document.querySelector("#steam-search-form");

    if (formulario) {
        const campo = formulario.querySelector("#steam-profile");

        if (!campo) return;

        // Feedback
        const feedback = document.createElement("p");

        feedback.className = "hg-feedback";
        feedback.setAttribute("role", "status");
        feedback.setAttribute("aria-live", "polite");
        feedback.hidden = true;

        formulario.insertAdjacentElement("afterend", feedback);

        // Validação 
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();

            const valor = campo.value.trim();

            feedback.hidden = false;

            if (valor === "") {
                feedback.className = "hg-feedback hg-feedback--error";
                feedback.textContent =
                    "Informe uma Steam ID, URL ou nome de perfil.";

                campo.focus();
                return;
            }

            feedback.className = "hg-feedback hg-feedback--info";
            feedback.textContent =
                `Perfil informado: ${valor}. ` +
                " Consultando estatísticas...";

        });

        

    }

});
