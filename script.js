
// THE BOOK OF ZEE
// Interactive website functions

console.log("THE BOOK OF ZEE is online!");

document.addEventListener("DOMContentLoaded", function () {
    const books = document.querySelectorAll(".book");
    const collection = document.querySelector("#books");

    if (!collection || books.length === 0) {
        console.log("No book collection found.");
        return;
    }

    // Create the search box
    const search = document.createElement("input");

    search.type = "search";
    search.placeholder = "Search for a book...";
    search.setAttribute("aria-label", "Search books");
    
    search.style.width = "100%";
    search.style.maxWidth = "500px";
    search.style.padding = "15px";
    search.style.margin = "20px auto";
    search.style.display = "block";
    search.style.borderRadius = "8px";
    search.style.border = "1px solid #b9975b";
    search.style.background = "#151515";
    search.style.color = "#ffffff";
    search.style.fontSize = "16px";

    collection.insertBefore(search, collection.querySelector("h2").nextSibling);

    // Search books as visitors type
    search.addEventListener("input", function () {
        const query = search.value.toLowerCase().trim();
        let visibleBooks = 0;

        books.forEach(function (book) {
            const title = book.querySelector("h3").textContent.toLowerCase();
            const description = book.querySelector("p").textContent.toLowerCase();

            const matches = title.includes(query) || description.includes(query);

            book.style.display = matches ? "" : "none";

            if (matches) visibleBooks++;
        });

        let message = collection.querySelector("#no-results");

        if (visibleBooks === 0) {
            if (!message) {
                message = document.createElement("p");
                message.id = "no-results";
                message.textContent = "No books found. Try another search.";
                message.style.textAlign = "center";
                message.style.color = "#b9975b";
                collection.appendChild(message);
            }
        } else if (message) {
            message.remove();
        }
    });

    console.log("Book search is ready!");
});

