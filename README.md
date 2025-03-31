# React + TypeScript + Vite

Cozey: Frontend Developer Carousel Component Challenge Part 2

# optimized my carousel component

1. rendered only a window of videos around the current index (windowing)
2. used useMemo to avoid recomputing the visible video set
3. no DOM layout thrashing
4. lazy-load only the current video and its neighbors.

-Virtual rendering of only 3 and 5 visible videos (current, prev, next)
-Memoized video list for performance
-Smooth scroll animation using scrollTo
-Autoplay/mute managed only for current video
-No scrollIntoView, refs arrays, or DOM-heavy updates
-Used SCSS (proper nesting, media queries for responsive working across all devices, partials ) for maintainability, readiblity, quality 

*Removed all mp3 video assets so I could push to github, will need to add those back in to see the development server

By: Harmit Sidhu

# npm run dev to start develpment server
