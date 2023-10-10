# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

import { useState } from "react";

 const [counter, setCounter] = useState(0);

         <div className="mb-[41.5px] flex gap-[10px]">
         <i className=' bx bx-plus'   onClick={() => setCounter((counter) => counter + 1)}></i>
              
              <h2 className="w-[49px] flex justify-center ">{counter}</h2>

               <i className=' bx bx-minus'   onClick={() => setCounter((counter) => counter + 1)}></i>
            </div>