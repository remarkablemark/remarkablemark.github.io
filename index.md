---
layout: default
---
<img class="headshot" src="assets/img/headshot-sm.png" alt="A remarkable headshot of Mark's face" title="Peekaboo!" />

<div class="container" id="content">
    <h3><span>Hi, my name is Mark and I'm pretty <em><strong>remarkable</strong></em>.</span></h3>
    <h3><span>Although I code for a living, I consider myself a <strong>philosopher</strong> <em>first</em>, <strong>designer</strong> <em>second</em>, and <strong>programmer</strong> <em>third</em>.</span></h3>
    <h3><span>But in the end, my <em>greatest asset</em> is my ability to <strong>learn</strong>. Why? Because <strong>education</strong> is my <em>passion</em>.</span></h3>
    <h3><span>Here, I want to share with you my projects, experiences, and what's on my mind! &#9786;</span></h3>
</div>

<!-- headshot animation script -->
<script type="text/javascript">
    // hide the headshot image and slide it up when it has loaded
    var headshot = document.getElementsByClassName("headshot")[0];
    headshot.style.bottom = "-100%";
    // load higher quality image for larger screen sizes
    if (window.innerWidth > 1080) {
        headshot.src = "assets/img/headshot-lg.png";
    }
    else if (window.innerWidth > 720) {
        headshot.src = "assets/img/headshot-md.png";
    }
    var checkHeadshotLoaded = setInterval(function() {
        if (headshot.complete) {
            headshot.style.bottom = 0;
            clearInterval(checkHeadshotLoaded);
        }
    }, 100);
</script>

<!-- include VisualNarrator plugin -->
<script type="text/javascript" src="assets/js/VisualNarrator.js"></script>

<!-- VisualNarration script -->
<script type="text/javascript">
    var contentContainer = document.getElementById("content");

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
</script>
