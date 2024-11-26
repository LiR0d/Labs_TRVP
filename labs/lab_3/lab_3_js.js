document.addEventListener("DOMContentLoaded", () => {
    // Задание 1: Выделение раздела документа
    const menuLinks = document.querySelectorAll(".menu a");
    const articles = document.querySelectorAll("article");
    let activeArticle = null;

    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Отключаем переход по ссылке

            // Получаем ID целевого раздела из атрибута href
            const targetId = link.getAttribute("href").substring(1);
            const targetArticle = document.getElementById(targetId);

            // Если такой раздел найден
            if (targetArticle) {
                // Убираем выделение у предыдущего выделенного раздела
                if (activeArticle) {
                    activeArticle.style.backgroundColor = ""; // Возвращаем стандартный фон
                }

                // Выделяем текущий раздел
                targetArticle.style.backgroundColor = "lightyellow";
                activeArticle = targetArticle; // Запоминаем текущий активный раздел
            }
        });
    });


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
            alert(aside.innerText || "Содержимое aside"); // Показываем содержимое в окне
        });
    });

    // Задание 4: Обработка формы
    const form = document.querySelector("form");
    const inputs = form.querySelectorAll("input, textarea");

    // Обработчик сброса
    form.addEventListener("reset", (e) => {
        const confirmReset = confirm("Вы уверены, что хотите сбросить данные?");
        if (!confirmReset) {
            e.preventDefault();
            inputs.forEach(input => {
                input.style.backgroundColor = "lightgreen"; // Устанавливаем зелёный фон
                setTimeout(() => input.style.backgroundColor = "", 1000); // Возвращаем через 1 секунду
            });
        } else {
            inputs.forEach(input => {
                input.style.backgroundColor = "lightcoral"; // Устанавливаем красный фон
                setTimeout(() => input.style.backgroundColor = "", 1000); // Возвращаем через 1 секунду
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
