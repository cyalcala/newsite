// Single public configuration for website inquiry and Google Forms integration.
module.exports = {
  url: '#contact',
  label: "Let's talk",
  action: 'https://docs.google.com/forms/d/e/1FAIpQLSenJuHOxItC77bmI8-NOXxlWSe9aqQRHDt6HlMerQXPgHKB8A/formResponse',
  fallbackUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSenJuHOxItC77bmI8-NOXxlWSe9aqQRHDt6HlMerQXPgHKB8A/viewform',
  entries: {
    name: 'entry.25383299',
    email: 'entry.668403667',
    service: 'entry.1640468941',
    details: 'entry.923088650',
    channel: 'entry.377038454'
  },
  services: [
    'Websites',
    'AI video',
    'Social media',
    'AI systems and automation',
    'Hiring opportunity',
    'Something else'
  ],
  channels: [
    'Email',
    'Messenger'
  ]
};

