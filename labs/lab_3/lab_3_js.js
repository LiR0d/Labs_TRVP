document.addEventListener("DOMContentLoaded", () => {
    // Задание 1: Выделение раздела документа
    const menuLinks = document.querySelectorAll(".menu a");
    const articles = document.querySelectorAll("article");
    let activeArticle = null;

    function highlightArticle(targetId) {
        const targetArticle = document.getElementById(targetId);

        if (targetArticle) {
            if (activeArticle) {
                activeArticle.style.backgroundColor = ""; // Убираем фон у предыдущего
            }

            targetArticle.style.backgroundColor = "lightyellow"; // Подсветка нового
            activeArticle = targetArticle;

            targetArticle.scrollIntoView({ behavior: "smooth" }); // Плавный скролл
        }
    }

    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
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

    // Задание 2: Выделение столбца в таблице
    const tableHeaders = document.querySelectorAll("table th");
    let highlightedColumnIndex = null;

    tableHeaders.forEach((header, index) => {
        header.addEventListener("click", () => {
            const table = header.closest("table");
            const rows = table.querySelectorAll("tr");

            if (highlightedColumnIndex !== null) {
                rows.forEach(row => {
                    row.children[highlightedColumnIndex].style.boxShadow = ""; // Снимаем выделение
                });
            }

            if (highlightedColumnIndex === index) {
                highlightedColumnIndex = null; // Сбрасываем выделение при повторном клике
            } else {
                highlightedColumnIndex = index;
                rows.forEach(row => {
                    row.children[index].style.boxShadow = "0px 0px 10px gray"; // Выделяем тенью
                });
            }
        });
    });

    // Задание 3: Всплывающее окно для <aside>
    const asideElements = document.querySelectorAll("aside");

    asideElements.forEach(aside => {
        aside.addEventListener("click", () => {
            alert(aside.innerText || "Содержимое aside"); // Показываем содержимое
        });
    });

    // Задание 4: Обработка формы
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input, textarea");

    // Обработчик сброса
    form.addEventListener("reset", (e) => {
        e.preventDefault(); // Останавливаем стандартный сброс

        const confirmReset = confirm("Вы уверены, что хотите сбросить данные?");
        if (confirmReset) {
            // Если пользователь подтверждает сброс
            inputs.forEach(input => {
                input.value = ""; // Сбрасываем содержимое вручную
                input.style.backgroundColor = "lightcoral"; // Красный фон
                setTimeout(() => {
                    input.style.backgroundColor = ""; // Возвращаем стандартный фон через 1 секунду
                }, 1000);
            });
        } else {
            // Если пользователь отменяет сброс
            inputs.forEach(input => {
                input.style.backgroundColor = "lightgreen"; // Зелёный фон
                setTimeout(() => {
                    input.style.backgroundColor = ""; // Возвращаем стандартный фон через 1 секунду
                }, 1000);
            });
        }
    });

    // Обработчик отправки
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        inputs.forEach(input => {
            input.style.backgroundColor = "lightblue"; // Устанавливаем синий фон
        });

        setTimeout(() => {
            alert("Данные отправлены!");
            inputs.forEach(input => input.style.backgroundColor = ""); // Возвращаем фон
        }, 1000);
    });
});
