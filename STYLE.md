# Style Guide for 200ok

## 1.html
1. case & attr:\
Good ✅:\
```<button class="submit-btn">submit</button>``` \
Bad ❌:\
```<BUTTON class = "btn1"  >submit</BUTTON>```
2. Indentation\
   Good ✅:
   ```html
    <div>
      <p>Hello</p>
    </div>
   ``` 
   Bad ❌:
   ```html
   <div><p>Hello
   </p></div>
   ```
3. Image must have an alt attribute!
   ```html
    <img src="https://picsum.photos/200" alt="Team of people discussing" />
    ```
4. id attribute must be unique and reasonable for single element, do not assign id to multiple elements

## 2.CSS
1. Since [Tailwind CSS](https://tailwindcss.com/) is used as the main CSS approach, only use `page.module.css` when 
it is unavoidable.
2. Do <b>NOT</b> use inline styling, make sure to check no inline style exists after testing completed.
3. Since NextJS relies on [SSR(Server Side Rendering)](https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering) 
heavily, do <b>NOT</b> use styled components though it is a common approach in React. No styled node module 
like `emotion` should be installed.
4. Use kebab-casing when writing css in `page.module.css`, indentation also needs to be taken care of.
    ```css
    .linear-rotation {
      animation: rotate-animation 1s linear infinite;
    }
    
    .public-title {
      background-color: rgb(50,205,50);
      text-transform: capitalize;
      font-family: "Arial", sans-serif;
    }
    
    @keyframes rotate-animation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    ```
5. For responsive layout(multimedia adaptation), it should primarily rely on Tailwind CSS. Use media queries only when it
is necessary.
6. Do <b>NOT</b> use `!important` only when it is necessary.

## 3.JavaScript
1. Use CamelCase with reasonable naming, do not use `var` as a keyword, add clear comments in your code, indentation should make sense.\
   Good ✅:
   ```javascript
   /**
    * update dude's info
    */
   const dudeHandler = () => { 
      // construct dude's object
      const dude = {
        age: 20
      };
      dude.age++;
   }
   ```
   Bad ❌:
   ```javascript
   var age_info_handle = () => {
   var dude = {
   age: 20};
   dude.age++; // increament by 1
   }
   ```
2. Use function when necessary, de-coupling should be considered. Use arrow function format.\
   Good ✅:
   ```javascript
   // Using arrow functions eliminates the function keyword and the return functions through implicit return
   const calcAvg = (arr) => {
      if (arr.length === 0) return 0;
   
      return arr.reduce((accumulator, currVal) => (accumulator + currVal), 0) / arr.length;
   }
   ```
   Bad ❌:
   ```javascript
   // The function passed into reduce is anonymous as it does not have a name.
   // While it still works, it looks very verbose as it needs the return statement and the function keyword.
   function calcAvg(arr) {
   if (arr.length === 0) return 0;
   
     return arr.reduce(function (accumulator, currVal) {
     return accumulator + currVal
     }, 0) / arr.length;
   }
   ```
3. use strictly equal
   Good ✅:
   ```javascript
   console.log(0 === false); // Will print false, which is correct since 0 and false are not the same.
   console.log(1 === '1');   // false
   console.log(0 === '');    // false
   console.log(42 === [42]); // false
   ```
   Bad ❌:
   ```javascript
   console.log(0 == false);  // Will print true, which might not be what you need
   console.log(1 == '1');    // true
   console.log(0 == '');     // true
   console.log(42 == [42]);  // true
   ```
## NextJS
1. Try to limit the use of client-side rendering, decouple a webpage into several reusable components.
Only apply `'use client'` to render client-side component when necessary.
2. limit the use of `useEffect and useState`, rely on NextJS data fetching and loading UI.
3. use `Link` from `'next/link'` as much as possible. `useRouter` should only be used for client-side routing.
4. do <b>NOT</b> manipulate DOM element using `document` unless no ui component or built-in attribute could be utilized.
5. use `import styles from "page.module.css"`, then `className=styles.Dashboard` to apply CSS class and id.