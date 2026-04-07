// Uplift AI Blog Integration
var UPLIFT_API_BASE = 'https://seotoolstaging.site/api/public/v1/blogs';
var UPLIFT_TOKEN = 'uai_CigmQj6wB90POS1eOoQpa9rRHNYLPB2I03lXr6XR18g';

function formatDate(dateStr) {
    if (!dateStr) return '';
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    var parts = dateStr.split('-');
    var monthNum = parseInt(parts[1], 10);
    var day = parseInt(parts[2], 10);
    var year = parts[0];
    return months[monthNum - 1] + ' ' + day + ', ' + year;
}

function createBlogCard(blog) {
    var card = document.createElement('a');
    card.href = 'blog-post.html?slug=' + encodeURIComponent(blog.slug);
    card.className = 'blog-card';

    var imageUrl = blog.featuredImage || 'https://cdn.abacus.ai/images/1ef142bd-7ba7-4aca-99a2-b0c41c11d124.png';
    var category = (blog.categories && blog.categories[0]) || 'Insights';
    var readingTime = (blog.customFields && blog.customFields.readingTime) || '';

    card.innerHTML =
        '<div class="blog-card-image">' +
        '  <img src="' + imageUrl + '" alt="' + blog.title.replace(/"/g, '&quot;') + '" loading="lazy">' +
        '  <span class="blog-card-category">' + category + '</span>' +
        '</div>' +
        '<div class="blog-card-content">' +
        '  <div class="blog-card-meta">' +
        '    <span class="blog-card-date">' + formatDate(blog.publishDate) + '</span>' +
        (readingTime ? '    <span class="blog-card-reading-time">' + readingTime + '</span>' : '') +
        '  </div>' +
        '  <h3 class="blog-card-title">' + blog.title + '</h3>' +
        '  <p class="blog-card-excerpt">' + (blog.excerpt || '') + '</p>' +
        '  <span class="blog-card-link">Read more <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12,5 19,12 12,19"></polyline></svg></span>' +
        '</div>';

    return card;
}

function loadBlogListing() {
    var grid = document.getElementById('blog-grid');
    var loading = document.getElementById('blog-loading');
    var empty = document.getElementById('blog-empty');

    if (!grid) return;

    fetch(UPLIFT_API_BASE + '/' + UPLIFT_TOKEN + '?status=published&limit=50')
        .then(function (res) { return res.json(); })
        .then(function (json) {
            loading.style.display = 'none';

            if (!json.success || !json.data.blogs || json.data.blogs.length === 0) {
                empty.style.display = 'block';
                return;
            }

            var blogs = json.data.blogs;
            blogs.forEach(function (blog) {
                grid.appendChild(createBlogCard(blog));
            });
        })
        .catch(function () {
            loading.style.display = 'none';
            empty.style.display = 'block';
        });
}

function loadBlogPost() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('slug');

    var loadingEl = document.getElementById('post-loading');
    var notFoundEl = document.getElementById('post-not-found');
    var contentEl = document.getElementById('post-content');

    if (!slug) {
        loadingEl.style.display = 'none';
        notFoundEl.style.display = 'block';
        return;
    }

    fetch(UPLIFT_API_BASE + '/' + UPLIFT_TOKEN + '/' + encodeURIComponent(slug))
        .then(function (res) { return res.json(); })
        .then(function (json) {
            loadingEl.style.display = 'none';

            if (!json.success || !json.data || !json.data.blog) {
                notFoundEl.style.display = 'block';
                return;
            }

            var blog = json.data.blog;
            var meta = blog.meta || {};

            // Update page SEO
            document.getElementById('page-title').textContent = (meta.seoTitle || blog.title) + ' - Ashima Empowers';
            document.getElementById('meta-description').setAttribute('content', meta.seoDescription || blog.excerpt || '');
            document.getElementById('meta-keywords').setAttribute('content', (meta.keywords || blog.tags || []).join(', '));
            document.getElementById('og-title').setAttribute('content', meta.seoTitle || blog.title);
            document.getElementById('og-description').setAttribute('content', meta.seoDescription || blog.excerpt || '');
            if (blog.featuredImage) {
                document.getElementById('og-image').setAttribute('content', blog.featuredImage);
            }

            // Populate content
            var heroImg = document.getElementById('post-hero-image');
            if (blog.featuredImage) {
                heroImg.src = blog.featuredImage;
                heroImg.alt = blog.title;
            } else {
                heroImg.parentElement.style.display = 'none';
            }

            var category = (blog.categories && blog.categories[0]) || 'Insights';
            document.getElementById('post-category').textContent = category;
            document.getElementById('post-date').textContent = formatDate(blog.publishDate);

            var readingTime = (blog.customFields && blog.customFields.readingTime) || '';
            var readingTimeEl = document.getElementById('post-reading-time');
            if (readingTime) {
                readingTimeEl.textContent = readingTime;
            } else {
                readingTimeEl.style.display = 'none';
            }

            document.getElementById('post-title').textContent = blog.title;
            document.getElementById('post-body').innerHTML = blog.content;

            // Tags
            var tagsContainer = document.getElementById('post-tags');
            if (blog.tags && blog.tags.length > 0) {
                blog.tags.forEach(function (tag) {
                    var tagEl = document.createElement('span');
                    tagEl.className = 'blog-post-tag';
                    tagEl.textContent = tag;
                    tagsContainer.appendChild(tagEl);
                });
            }

            contentEl.style.display = 'block';

            // Scroll to top
            window.scrollTo(0, 0);
        })
        .catch(function () {
            loadingEl.style.display = 'none';
            notFoundEl.style.display = 'block';
        });
}

// Homepage blog section loader (loads latest 3 posts)
function loadHomepageBlogPreview() {
    var grid = document.getElementById('homepage-blog-grid');
    if (!grid) return;

    fetch(UPLIFT_API_BASE + '/' + UPLIFT_TOKEN + '?status=published&limit=3')
        .then(function (res) { return res.json(); })
        .then(function (json) {
            if (!json.success || !json.data.blogs || json.data.blogs.length === 0) {
                var section = document.getElementById('blog-preview');
                if (section) section.style.display = 'none';
                return;
            }

            json.data.blogs.forEach(function (blog) {
                grid.appendChild(createBlogCard(blog));
            });
        })
        .catch(function () {
            var section = document.getElementById('blog-preview');
            if (section) section.style.display = 'none';
        });
}
