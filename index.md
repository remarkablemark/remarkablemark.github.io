---
layout: default
title: Home
---
<div class="container" id="content">
  <h3><span>Hi, my name is Mark and I'm pretty <em><strong>remarkable</strong></em>.</span></h3>
  <h3><span>Although I code for a living, I consider myself a <strong>philosopher</strong> <em>first</em>, <strong>designer</strong> <em>second</em>, and <strong>programmer</strong> <em>third</em>.</span></h3>
  <h3><span>But in the end, my <em>greatest asset</em> is my ability to <strong>learn</strong>. Why? Because <strong>education</strong> is my <em>passion</em>.</span></h3>
  <h3><span>Here, I want to share with you my projects, experiences, and what's on my mind! &#9786;</span></h3>
</div>

<script type="text/javascript" src="//remarkablemark.org/VisualNarrator.js/VisualNarrator.js"></script>
<script type="text/javascript">
  (function(VisualNarrator) {
    var contentContainer = document.getElementById('content');
    // clear content if JS works
    contentContainer.innerHTML = "";
    // introduction message using VisualNarrator
    var message = (
      "<h3><span>Hi, my name is Mark and I'm pretty <em><strong>remarkable</strong></em>.</span></h3><delay>100</delay>" +
      "<h3><span>Although I code for a living, I consider myself a <strong>philosopher</strong> <em>first</em>,<delay>200</delay> <strong>designer</strong> <em>second</em>,<delay>200</delay> and <strong>programmer</strong> <em>third</em>.</span></h3><delay>100</delay>" +
      "<h3><span>But in the end,<delay>100</delay> my <em>greatest asset</em> is my ability to <strong>learn</strong>. <delay>200</delay>Why?<delay>200</delay> Because <strong>education</strong> is my <em>passion</em>.</span></h3><delay>100</delay>" +
      "<h3><span>Here, I want to share with you my projects, experiences, and what's on my mind! &#9786;</span></h3>"
    );

    visualNarrator({
      message: message,
      container: contentContainer
    });
  })(window.VisualNarrator);
</script>

{% include headshot.html %}
