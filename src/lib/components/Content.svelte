<div class="content">
  <slot></slot>
</div>

<style global>
  .content {
    display: grid;
    gap: 20px;
  }
  .content h1 {
    font-size: 24px;
    font-weight: bold;
  }
  .content h2 {
    font-size: 20px;
    font-weight: bold;
  }
  .content p {
    line-height: 1.5;
  }
  .content a {
    color: var(--primary);
  }
  .content em {
    font-weight: bold;
  }
  .content ol {
    line-height: 1.5;
    list-style: decimal;
    list-style-position: inside;
  }
</style>