

    // MENU RESPONSIVO
    
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

