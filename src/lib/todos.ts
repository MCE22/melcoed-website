// TODO boxes are for the owner, never for buyers. They render in `astro dev`, or in a build
// with PUBLIC_SHOW_TODOS=true (e.g. a review preview). Production builds hide them; every
// item stays on the content checklist (`npm run checklist` → docs/CONTENT-CHECKLIST.md).
export const showTodos = import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_TODOS === 'true';
