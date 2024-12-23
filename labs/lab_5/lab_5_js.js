document.addEventListener("DOMContentLoaded", () => {
    // Задание 1: Подсветка раздела при переходе по якорной ссылке
    const menuLinks = document.querySelectorAll(".menu a");
    let activeArticle = null;

    function highlightArticle(targetId) {
        const targetArticle = document.getElementById(targetId);

        if (targetArticle) {
            if (activeArticle) {
                activeArticle.style.backgroundColor = "";
                const prevHeading = activeArticle.querySelector("h1, h2, h3, h4, h5, h6");
                if (prevHeading) prevHeading.style.fontSize = "";
            }

            targetArticle.style.backgroundColor = "lightyellow";
            const heading = targetArticle.querySelector("h1, h2, h3, h4, h5, h6");
            if (heading) heading.style.fontSize = "1.5em";
            activeArticle = targetArticle;

            targetArticle.scrollIntoView({ behavior: "smooth" });

            setTimeout(() => {
                targetArticle.style.backgroundColor = "";
            }, 3000);
        }
    }

    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            menuLinks.forEach(menuLink => menuLink.classList.remove("active"));
            link.classList.add("active");

            const targetId = link.getAttribute("href").substring(1);
            highlightArticle(targetId);
            history.pushState(null, null, `#${targetId}`);
        });
    });

    window.addEventListener("hashchange", () => {
        const targetId = window.location.hash.substring(1);
        highlightArticle(targetId);
    });

    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        highlightArticle(targetId);
    }

    // Задание 2: Анимация выделения столбца таблицы
    const tableHeaders = document.querySelectorAll("table th");
    let highlightedColumnIndex = null;

    tableHeaders.forEach((header, index) => {
        header.addEventListener("click", () => {
            const table = header.closest("table");
            const rows = table.querySelectorAll("tr");

            if (highlightedColumnIndex !== null) {
                rows.forEach(row => {
                    row.children[highlightedColumnIndex].classList.remove("highlighted");
                    row.children[highlightedColumnIndex].style.boxShadow = "none";
                });
            }

            if (highlightedColumnIndex === index) {
                highlightedColumnIndex = null;
            } else {
                highlightedColumnIndex = index;
                rows.forEach(row => {
                    row.children[index].classList.add("highlighted");
                    row.children[index].style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
                });
            }
        });
    });

    // Задание 3: Подсказки (tooltip) при наведении на поля формы
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach(input => {
        input.addEventListener("mouseover", () => {
            const tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.innerText = "Введите данные в это поле";
            tooltip.style.position = "absolute";
            tooltip.style.backgroundColor = "lightblue";
            tooltip.style.padding = "5px";
            tooltip.style.borderRadius = "5px";
            tooltip.style.top = `${input.offsetTop - 30}px`;
            tooltip.style.left = `${input.offsetLeft}px`;
            document.body.appendChild(tooltip);
            input.tooltip = tooltip;
        });

        input.addEventListener("mouseout", () => {
            if (input.tooltip) {
                document.body.removeChild(input.tooltip);
                input.tooltip = null;
            }
        });
    });

    // Задание 4: Обработка сброса формы с подтверждением
    form.addEventListener("reset", (e) => {
        e.preventDefault();

        const confirmReset = confirm("Вы уверены, что хотите сбросить данные?");
        if (confirmReset) {
            inputs.forEach(input => {
                input.value = "";
                input.style.backgroundColor = "lightcoral";
                setTimeout(() => {
                    input.style.backgroundColor = "";
                }, 1000);
            });
        } else {
            inputs.forEach(input => {
                input.style.backgroundColor = "lightgreen";
                setTimeout(() => {
                    input.style.backgroundColor = "";
                }, 1000);
            });
        }
    });

    // Обработчик отправки формы
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        inputs.forEach(input => {
            input.style.backgroundColor = "lightblue";
        });

        setTimeout(() => {
            alert("Данные отправлены!");
            inputs.forEach(input => input.style.backgroundColor = "");
        }, 1000);
    });

    // Задание 5: Анимация логотипа при наведении
    const logo = document.getElementById("logo");

    logo.addEventListener("mouseenter", () => {
        let isFadingOut = true;
        const intervalId = setInterval(() => {
            logo.style.opacity = isFadingOut ? "0.5" : "1";
            isFadingOut = !isFadingOut;
        }, 500);

        logo.addEventListener("mouseleave", () => {
            clearInterval(intervalId);
            logo.style.opacity = "1"; // Сбрасываем прозрачность
        });
    });

    // Задание 6: Анимация aside
    const asides = document.querySelectorAll("aside");
    asides.forEach(aside => {
        let isExpanded = false;
        const originalFontSize = getComputedStyle(aside).fontSize;
        const originalPosition = aside.getBoundingClientRect();

        aside.addEventListener("click", () => {
            if (isExpanded) {
                aside.style.position = "";
                aside.style.fontSize = originalFontSize;
                aside.style.transform = "";
                aside.style.top = "";
                aside.style.left = "";
                isExpanded = false;
            } else {
                const centerX = (window.innerWidth - aside.offsetWidth) / 2;
                const centerY = (window.innerHeight - aside.offsetHeight) / 2;
                aside.style.position = "fixed";
                aside.style.fontSize = "2em";
                aside.style.transform = "scale(1.5)";
                aside.style.top = `${centerY}px`;
                aside.style.left = `${centerX}px`;
                isExpanded = true;
            }
        });
    });
});
