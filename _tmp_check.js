
    const revealEls = document.querySelectorAll('.reveal');
    const animatedBarGroups = document.querySelectorAll('[data-bars]');
    const panels = document.querySelectorAll('.panel');
    const opsNodes = document.querySelectorAll('.ops-node');
    const opsDetailContent = document.querySelector('.ops-detail-content');
    const opsSteps = [
      {
        step: 'Step 1',
        headline: 'Every customer begins with a first purchase.',
        body: 'At the point of entry, the business has very little information about long-term value. A first purchase alone does not justify strong retention spend.',
        actions: [
          'record the first order',
          'begin tracking early behavior immediately',
          'avoid giving away large discounts before any signal of repeat value appears'
        ],
        why: 'Not every customer is equally likely to become valuable.'
      },
      {
        step: 'Step 2',
        headline: 'Early behavior reveals whether a customer is worth additional investment.',
        body: 'The most useful early signals are not total spend alone. The business should track how quickly a customer returns, how large their baskets are, and how broadly they engage with the catalog.',
        actions: [
          'track order frequency',
          'track basket size',
          'track product breadth / assortment engagement'
        ],
        why: 'These behaviors are stronger indicators of long-term value than a single high-spend transaction.'
      },
      {
        step: 'Step 3',
        headline: 'Customers should be split into high-potential and low-potential paths.',
        body: 'Once early signals begin to appear, the business should classify customers based on their likelihood of becoming repeat, high-value buyers.',
        actions: [
          'classify customers showing repeat behavior, larger baskets, and broader engagement as high-potential',
          'classify one-time or narrow, low-engagement buyers as low-potential',
          'use this classification to decide how much promotional effort is justified'
        ],
        why: 'The business should not spend the same amount trying to retain every customer.'
      },
      {
        step: 'Step 4',
        headline: 'Promotions should be targeted, delayed to the next order, and time-sensitive.',
        body: 'For high-potential customers, promotions should be used to drive the next purchase, not reduce margin on the current one. The strongest incentives should appear early and expire quickly enough to create urgency.',
        actions: [
          'issue promotions for the next purchase, not the current one',
          'keep those offers time-sensitive',
          'use stronger offers in the first few purchases',
          'avoid heavy discounting for low-potential customers'
        ],
        why: 'The goal is to create repeat behavior, not just subsidize isolated transactions.'
      },
      {
        step: 'Step 5',
        headline: 'Retention should reinforce behavior early, then taper as loyalty stabilizes.',
        body: 'Once a customer begins repeating, the business should maintain engagement through follow-up emails, point systems, or targeted promotions. Reward intensity should diminish over time because stable customers need less inducement to stay active.',
        actions: [
          'reinforce repeat behavior with email or promotional follow-up',
          'use a points system or structured reward loop',
          'make rewards easier to earn early',
          'taper rewards as customers become more established'
        ],
        why: 'The business should invest most heavily when behavior is still fragile, not after loyalty is already formed.'
      }
    ];

    function renderOpsStep(index) {
      if (!opsDetailContent || !opsSteps[index]) return;

      const step = opsSteps[index];
      const actionsMarkup = step.actions.map(action => `<li>${action}</li>`).join('');

      opsNodes.forEach((node, nodeIndex) => {
        const isActive = nodeIndex === index;
        node.classList.toggle('is-active', isActive);
        node.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      opsDetailContent.classList.add('is-switching');

      window.setTimeout(() => {
        opsDetailContent.innerHTML = `
          <p class="ops-step-label">${step.step}</p>
          <h4 class="ops-subheadline">${step.headline}</h4>
          <p class="ops-body">${step.body}</p>
          <div class="ops-does">
            <p class="ops-does-title">What the business does</p>
            <ul class="ops-does-list">${actionsMarkup}</ul>
          </div>
          <p class="ops-why"><strong>Why this matters:</strong> ${step.why}</p>
        `;
        opsDetailContent.classList.remove('is-switching');
      }, 180);
    }

    function setBars(group, expanded) {
      const fills = group.querySelectorAll('.bar-fill, .compare-fill');
      fills.forEach((fill, index) => {
        fill.style.transitionDelay = expanded ? `${index * 90}ms` : '0ms';
        fill.style.width = expanded ? fill.dataset.width + '%' : '0';
      });
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('active', entry.isIntersecting);
      });
    }, { threshold: 0.32 });

    revealEls.forEach(el => {
      if (!el.classList.contains('active')) revealObserver.observe(el);
    });

    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setBars(entry.target, entry.isIntersecting);
      });
    }, { threshold: 0.4 });

    animatedBarGroups.forEach(group => barObserver.observe(group));

    const panelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('active', entry.isIntersecting);
      });
    }, { threshold: 0.5 });

    panels.forEach(panel => panelObserver.observe(panel));

    opsNodes.forEach((node, index) => {
      node.addEventListener('click', () => renderOpsStep(index));
    });
  
