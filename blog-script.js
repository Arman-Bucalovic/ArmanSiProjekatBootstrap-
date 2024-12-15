const blogContainer = document.getElementById("blog-container");

function loadArticles() {
  const savedArticles = JSON.parse(localStorage.getItem("articles")) || [];
  savedArticles.forEach((article) => {
    const newArticle = createArticleElement(
      article.title,
      article.content,
      article.date
    );
    blogContainer.appendChild(newArticle);
  });
}

function saveArticle(title, content) {
  const savedArticles = JSON.parse(localStorage.getItem("articles")) || [];
  savedArticles.unshift({
    title: title,
    content: content,
    date: new Date().toLocaleDateString(),
  });
  localStorage.setItem("articles", JSON.stringify(savedArticles));
}

function createArticleElement(title, content, date) {
  const newArticle = document.createElement("div");
  newArticle.className = "blog-article";
  newArticle.innerHTML = `
            <h2>${title}</h2>
            <p class="text-muted">Autor: Gost | Datum: ${date}</p>
            <p>${content}</p>
        `;
  return newArticle;
}

document
  .getElementById("blog-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const date = new Date().toLocaleDateString();

    const newArticle = createArticleElement(title, content, date);
    blogContainer.insertBefore(newArticle, blogContainer.firstChild);

    saveArticle(title, content);

    document.getElementById("blog-form").reset();
  });

loadArticles();
