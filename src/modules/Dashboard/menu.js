export default [
  {
    label: 'Presentation',
    sublabel: '',
    icon: 'home',
    path: '/dashboard'
  },
  {
    label: 'Doc',
    sublabel: '',
    icon: 'school',
    path: '/dashboard/docs'
  },
  {
    label: 'Examples',
    sublabel: '',
    icon: 'code',
    children: [
      {
        label: 'Simple Test',
        sublabel: 'Just a simple test ; )',
        icon: 'code',
        path: '/dashboard/test'
      },
      {
        label: 'Test With Hooks',
        sublabel: 'Demo to show declare hooks',
        icon: 'code',
        path: '/dashboard/test-with-hooks'
      },
      {
        label: 'Test Template Form',
        sublabel: 'Using form control with template',
        icon: 'code',
        path: '/dashboard/test-with-template/form'
      },
      {
        label: 'Test Template Table',
        sublabel: 'Using table control with template',
        icon: 'code',
        path: '/dashboard/test-with-template/table'
      }
    ]
  }
]
