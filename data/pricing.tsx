export default {
  title: 'Pricing for Every Power Level',
  description:
    'Choose the plan that matches your command. Start for free, upgrade when you want more control.',
  plans: [
    {
      tier: 'Free',
      features: [
        '1',
        'Basic (URL, Forwarded)',
        'Delete, Kick, Ban',
        '7 Days',
        '–',
        '3-Day Trial',
        'Basic Metrics',
        'Telegram Channel',
        'Free',
      ],
      action: 'Get Started'
    },
    {
      tier: 'Premium',
      features: [
        '5 (expandable)',
        'Advanced (Promotions, Explicit, Custom)',
        'Delete, Kick, Ban',
        '30 Days',
        '✔',
        'Usage Tracked (Monthly Quota)',
        'Full Dashboard',
        'Email Support',
        '$9.99',
      ],
    },
    {
      tier: 'Enterprise',
      features: [
        'Unlimited',
        'Fully Custom Ruleset',
        'Delete, Kick, Ban + Escalation Hooks',
        '90+ Days',
        '✔ + Custom Alert Routing',
        'Unlimited (Custom Quotas)',
        'Full Dashboard & API Access',
        'Priority Support',
        'Custom',
      ],
    },
  ],
  featureTitles: [
    'Groups Monitored',
    'Message Filters',
    'Violation Actions',
    'Violation History Retention',
    'Warn List Monitoring',
    'AI Spam Detection (Grok)',
    'Analytics Dashboard',
    'Support',
    'Monthly Price'
  ]
}

