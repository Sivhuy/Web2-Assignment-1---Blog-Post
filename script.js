// Initial data
let posts = [
    {
        title: "Welcome to My Blog",
        content: "This is my first blog post. I'm excited to share my thoughts and experiences with you all!"
    },
    {
        title: "Learning JavaScript",
        content: "JavaScript is a powerful programming language that enables interactive web development. Today I learned about event listeners and DOM manipulation."
    },
    {
        title: "Web Development Tips",
        content: "Always write clean and maintainable code. Use meaningful variable names and comment your code when necessary."
    }
];

const addPostBtn = document.getElementById("add-post-btn");
const container = document.getElementById("blog-posts-container");

function createButton(label, className) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = className;
    return btn;
}

// Render all posts
function renderPosts() {
    container.innerHTML = "";

    if (posts.length === 0) {
        const empty = document.createElement("p");
        empty.className = "empty";
        empty.textContent = 'No blog posts yet. Click "Add Blog Post" to create one.';
        container.appendChild(empty);
        return;
    }

    posts.forEach(function (post) {
        const card = document.createElement("div");
        card.className = "post";

        const header = document.createElement("div");
        header.className = "post-header";

        const title = document.createElement("h3");
        title.textContent = post.title;
        header.appendChild(title);
        header.appendChild(createButton("Edit Title", "edit-title"));

        const content = document.createElement("p");
        content.textContent = post.content;

        const actions = document.createElement("div");
        actions.className = "post-actions";
        actions.appendChild(createButton("Edit Content", "edit-content"));
        actions.appendChild(createButton("Delete Post", "delete-post"));

        card.appendChild(header);
        card.appendChild(content);
        card.appendChild(actions);
        container.appendChild(card);
    });
}

// Add
function addPost() {
    const title = prompt("Enter the blog post title:");
    if (title === null) return;
    if (title.trim() === "") {
        alert("Title cannot be empty.");
        return;
    }

    const content = prompt("Enter the blog post content:");
    if (content === null) return;
    if (content.trim() === "") {
        alert("Content cannot be empty.");
        return;
    }

    posts.push({ title: title.trim(), content: content.trim() });
    renderPosts();
}

// Event delegation: one listener on the container handles all post buttons
container.addEventListener("click", function (event) {
    const clicked = event.target;               // the element that triggered the event
    const card = clicked.closest(".post");      // the post card around it

    if (clicked.tagName !== "BUTTON" || card === null) return;

    // event.currentTarget is the container (where the listener is attached)
    const index = Array.from(event.currentTarget.children).indexOf(card);
    const post = posts[index];

    if (clicked.classList.contains("edit-title")) {
        const newTitle = prompt("Edit title:", post.title);
        if (newTitle === null) return;
        if (newTitle.trim() === "") {
            alert("Title cannot be empty.");
            return;
        }
        post.title = newTitle.trim();
    } else if (clicked.classList.contains("edit-content")) {
        const newContent = prompt("Edit content:", post.content);
        if (newContent === null) return;
        if (newContent.trim() === "") {
            alert("Content cannot be empty.");
            return;
        }
        post.content = newContent.trim();
    } else if (clicked.classList.contains("delete-post")) {
        if (!confirm("Delete this blog post?")) return;
        posts.splice(index, 1);
    }

    renderPosts();
});

addPostBtn.addEventListener("click", addPost);

renderPosts();