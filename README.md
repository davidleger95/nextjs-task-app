# Next + Redux Task App

Initially cloned from the [Next.js `with-redux` example](https://github.com/vercel/next.js/tree/canary/examples/with-redux)

## Running the app locally

Install dependencies:

```sh
npm i
```

Run locally:

```sh
npm run dev
```

_The app will be available on `localhost:3000`._

Run Tests:

```sh
npm test
```

## Development Plan

- [x] Deploy app to Vercel
- [x] Add custom configs/tooling that I like to use for better DX
- [x] Add Vitest for unit testing
- [x] Remove boilerplate code from the example
- [x] Add Radix UI
- [x] Setup redux store with persisted state in localstorage
- [x] Build Task List UI
- [x] Build Add Task UI
- [x] Build Edit Task UI
- [x] Build View Task UI
- [x] Update README with instructions and added context for decisions

## Notes

### [Deployed App](https://nextjs-task-app-opal.vercel.app/)

<div style="position: relative; padding-bottom: 77.75377969762418%; height: 0;"><iframe src="https://www.loom.com/embed/bd6d2db4de0a4273a73ddd86c8286bef?sid=4486645e-46a8-4f51-8406-8cad2b18f854" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Successes

I wanted to get the workflow for the project optimized a bit at the start so I'd have helpful guardrails in place from the beginning. This included setting up linting, testing, and CI workflows. I also deployed the app to Vercel from the start and continuously pushed changes throughout working on it. This was important to ensure all incremental changes worked properly when the app was deployed.

The app works and covers all listed requirements + bonus features.

### Struggles

Diving back into Next.js and Redux after some time away was a bit disorienting. I expected to take some time to remember how things worked, but the biggest challenge was adjusting to new patterns.

The new Next.js APIs with relatively easy to adjust to. I thought App Routing was going to cause more problems than it did.

`@reduxjs/toolkit` caused me a lot of headaches though. Last time I'd worked with Redux was 4 years ago, and a lot has changed particularly in the latest version where the Redux authors suggest using `@reduxjs/toolkit`. The concepts are the same, but with different patterns from what I'm used to, it took a lot of time to unlearn and relearn how to do certain things. Building this project got me more comfortable with the new APIs.

I thought I'd git Radix a try without knowing much about it. The dropdown, input, button, icon, badge components were all nice to use, but in hindsight I should have stayed away from the layout components and just used custom styles and markup for layout. While the layout components are helpful in some cases, I find that they clutter the markup with deep nesting and make it tough to use semantic elements in a clean way (the `asChild` prop was helpful, but still felt cluttered). The layout components were not worth the tradeoffs for me and I could have built cleaner layouts faster without them.

There's a lot of places where the code could be cleaned up more and tests added, but I think this is a good place to stop. The app is fully functional and I added and has some minimal testing in place.
